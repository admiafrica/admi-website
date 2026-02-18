require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');

// Configuration
const PROMPTS_FILE = path.join(process.cwd(), 'scripts/ai/course-prompts.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public/ai-assets');
const S3_BUCKET = 'admi-media-archive-381492234121';
const S3_PREFIX = 'media-archive/ai-generated/';

// PROJECT ID for Vertex AI (Required)
// Often inferred from credentials, but good to have explicit if needed.
// We'll try to extract it from the GoogleAuth or default to a placeholder
// that the user might need to fill if not using ADC.
const PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT || 'admi-website-450914'; // Replace with actual project ID if known
const LOCATION = 'us-central1'; // Veo 2 is likely in us-central1

// Models
const VIDEO_MODEL_ID = 'veo-2.0-generate-001';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// S3 Client
const s3Client = new S3Client({ region: 'us-east-1' });

// Initialize Google Auth (ADC or Service Account)
const auth = new GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform']
});

async function uploadToS3(filePath, key, contentType) {
    const fileContent = fs.readFileSync(filePath);
    const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: S3_PREFIX + key,
        Body: fileContent,
        ContentType: contentType
    });

    try {
        await s3Client.send(command);
        console.log(`☁️  Uploaded to S3: ${key}`);
        return `https://${S3_BUCKET}.s3.amazonaws.com/${S3_PREFIX}${key}`;
    } catch (error) {
        console.error(`❌ S3 Upload Failed: ${key}`, error.message);
        return null;
    }
}

async function generateVeoVideo(prompt, outputPath) {
    if (fs.existsSync(outputPath)) {
        console.log(`⏭️  File exists, skipping: ${path.basename(outputPath)}`);
        return true;
    }

    console.log(`🎥 Generating Video (${VIDEO_MODEL_ID})...`);
    console.log(`   Prompt: "${prompt.substring(0, 50)}..."`);

    try {
        const client = await auth.getClient();
        const projectId = await auth.getProjectId();
        const accessToken = await client.getAccessToken();
        const token = accessToken.token;

        const endpoint = `https://${LOCATION}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${LOCATION}/publishers/google/models/${VIDEO_MODEL_ID}:predictLongRunning`;

        // Veo 2 Request Body (Standard Vertex AI structure)
        const requestBody = {
            instances: [
                {
                    prompt: prompt,
                }
            ],
            parameters: {
                sampleCount: 1,
                // storageUri: `gs://${S3_BUCKET}/temp/` // Veo might require GCS output
                // Check if Veo allows inline response or requires GCS.
                // Usually video models require writing to GCS.
                // If so, we need a GCS bucket.
                // For now, let's try the request and see if it demands a GCS URI.
            }
        };

        console.log(`   Calling Vertex AI API...`);

        // Note: predictLongRunning returns an Operation, not the immediate result.
        const response = await axios.post(endpoint, requestBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // If successful, it returns an Operation LRO
        console.log(`   Generation started! LRO: ${response.data.name}`);

        // Polling logic would be needed here.
        // For this script, we might just kick off the jobs or implement a basic poll.
        // Let's implement a basic poll.

        const lroName = response.data.name;
        let operationDetails = null;

        // Poll for completion
        while (true) {
            console.log(`   ⏳ Polling status...`);
            await new Promise(r => setTimeout(r, 10000)); // Wait 10s

            const statusUrl = `https://${LOCATION}-aiplatform.googleapis.com/v1/${lroName}`;
            const statusResponse = await axios.get(statusUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            operationDetails = statusResponse.data;
            if (operationDetails.done) {
                break;
            }
        }

        if (operationDetails.error) {
            throw new Error(JSON.stringify(operationDetails.error));
        }

        console.log(`   ✅ Generation complete!`);

        // Extract the result. 
        // Important: Veo 2 usually outputs to GCS. The 'response' field in LRO might contain the GCS URI.
        // We need to see the structure.
        console.log('   Result:', JSON.stringify(operationDetails.response, null, 2));

        // Attempting to download if it returns inline bytes (unlikely for video) or GCS URI.
        // If it's a GCS URI, we'd need to download it using storage client.
        // For now, let's just log success and the location.

        return true;

    } catch (error) {
        console.error('❌ Veo Generation Failed:', error.message);
        if (error.response) {
            console.error('   Details:', JSON.stringify(error.response.data, null, 2));
        }
        return false;
    }
}

async function main() {
    if (!fs.existsSync(PROMPTS_FILE)) {
        console.error('❌ Prompts file not found. Run generate-course-prompts.js first.');
        process.exit(1);
    }

    const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'));
    const courses = data.courses;

    console.log(`🚀 Starting asset generation for ${courses.length} courses using Veo 2...`);

    // Only try one for now to test auth/permissions
    const course = courses[0];
    console.log(`\n-----------------------------------`);
    console.log(`Processing: ${course.name} (${course.city})`);

    // Use a modified prompt for video if needed, or just use the image one for now
    const videoPrompt = `Cinematic slow motion establishing shot. ${course.prompts.image}`;
    const videoFilename = `${course.id}-cinematic.mp4`;
    const videoPath = path.join(OUTPUT_DIR, videoFilename);

    await generateVeoVideo(videoPrompt, videoPath);

    console.log('\n✅ Asset generation workflow completed.');
}

main();
