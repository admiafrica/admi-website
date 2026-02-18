require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const OUTPUT_DIR = path.join(process.cwd(), 'public/ai-assets');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// Using the Pro model for high fidelity
const IMAGE_MODEL_ID = 'gemini-3-pro-image-preview';

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY || 'MISSING_KEY');

async function generateSingleImage() {
    console.log(`🎨 Generating SINGLE Image (${IMAGE_MODEL_ID})...`);

    // Test Prompt
    const prompt = "A professional cinematic shot representing Animation. Setting is a modern professional studio with black background. Cinematic photo, 8k, photorealistic, studio completely black background, no windows, dark minimal aesthetic, dramatic lighting, depth of field.";
    const outputPath = path.join(OUTPUT_DIR, 'test-animation-single.png');

    if (!GOOGLE_API_KEY) {
        console.warn('⚠️  No GOOGLE_API_KEY found.');
        return;
    }

    try {
        const model = genAI.getGenerativeModel({ model: IMAGE_MODEL_ID });

        console.log(`   Detailed Prompt: "${prompt}"`);
        console.log(`   Calling API...`);

        const result = await model.generateContent(prompt);
        const response = await result.response;

        console.log(`   Response received.`);

        if (response.candidates && response.candidates.length > 0) {
            const parts = response.candidates[0].content.parts;
            if (parts && parts.length > 0) {
                if (parts[0].inlineData && parts[0].inlineData.data) {
                    const buffer = Buffer.from(parts[0].inlineData.data, 'base64');
                    fs.writeFileSync(outputPath, buffer);
                    console.log(`✅  Image saved: ${outputPath}`);
                } else if (parts[0].text) {
                    console.warn(`⚠️  Model returned text: "${parts[0].text.substring(0, 100)}..."`);
                }
            }
        } else {
            console.warn("⚠️  Unexpected response structure.");
            console.log(JSON.stringify(response, null, 2));
        }

    } catch (error) {
        console.error('❌ Generation Failed:', error.message);
        if (error.response) {
            console.error('   Details:', await error.response.text());
        }
    }
}

generateSingleImage();
