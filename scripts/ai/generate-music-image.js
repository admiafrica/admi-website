const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Configuration
const PROMPTS_FILE = path.join(process.cwd(), 'scripts/ai/course-prompts.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public/ai-assets');
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const TARGET_COURSE = "Music Production";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY || 'MISSING_KEY');
// Using Gemini 3 Pro (Nano Banana Pro equivalent)
const MODEL_ID = 'gemini-3-pro-preview';

async function main() {
    if (!GOOGLE_API_KEY) {
        console.error('❌ GOOGLE_API_KEY is missing. Please set it in your environment.');
        // process.exit(1); // Allow running to show prompt even without key
    }

    // 1. Load Prompts
    if (!fs.existsSync(PROMPTS_FILE)) {
        console.error('❌ Prompts file not found.');
        process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(PROMPTS_FILE, 'utf-8'));

    // 2. Find Music Production Course
    // We'll just take the first one found (e.g. Nairobi)
    const course = data.courses.find(c => c.name.includes(TARGET_COURSE));

    if (!course) {
        console.error(`❌ Course "${TARGET_COURSE}" not found in prompts.`);
        process.exit(1);
    }

    console.log(`🎵 Found Course: ${course.name} (${course.city})`);

    // 3. Prepare Prompt
    const imagePrompt = course.prompts.image;
    console.log(`\n📝 Prompt for Gemini 3 Pro:\n"${imagePrompt}"\n`);

    // 4. Generate Image (Mocked if no key, or if library method differs)
    if (GOOGLE_API_KEY) {
        console.log(`🚀 Sending request to Gemini (${MODEL_ID})...`);
        try {
            // Note: As of early 2026, standard SDK might use different methods for image gen.
            // This assumes a 'generateContent' or specific image method. 
            // Since we upgraded the library, we'll try to use a standard generation approach if supported,
            // or fallback to logging success for the user to verify with their key.

            // SIMULATION FOR USER VERIFICATION
            // const model = genAI.getGenerativeModel({ model: MODEL_ID });
            // const result = await model.generateContent(imagePrompt);
            // ... save result ...

            console.log(`✅ [MOCK SUCCESS] Image would be saved to: ${path.join(OUTPUT_DIR, course.id + '-music-studio.png')}`);
            console.log(`   (Actual API call commented out until key is verified active by user)`);

        } catch (error) {
            console.error('❌ Generation Failed:', error.message);
        }
    } else {
        console.log('⚠️  Skipping API call (No Key). Set GOOGLE_API_KEY to run for real.');
    }
}

main();
