require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY not found.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

async function listModels() {
    console.log('🔍 Listing available models...');
    try {
        // There isn't a direct "listModels" method on the GenAI instance in the node SDK readily exposed 
        // in the same way as the python SDK sometimes, but we can try to infer or use the REST API if needed.
        // Actually, the SDK *does* sometimes support it via the model manager or similar, 
        // but for now, let's try to just use a known list or check specific models.

        // Wait, the error message literally said: "Call ListModels to see the list..."
        // This implies the API supports it. 
        // In the Node SDK, it might be `genAI.getGenerativeModel({ model: ... })` is for instantiation, 
        // but listing might require a different client or just checking known IDs.

        // HOWEVER, since we're using the @google/generative-ai package, 
        // let's try a direct fetch if the SDK doesn't expose it easily.

        // Actually, let's just try to instantiate 'gemini-1.5-flash' and 'gemini-1.5-pro' 
        // and see if they work, as those represent the "Flash" and "Pro" tiers often associated with "Nano Banana".

        // But better: let's use the REST API to list models, using the key.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${GOOGLE_API_KEY}`);
        const data = await response.json();

        if (data.models) {
            console.log('✅ Available Models:');
            data.models.forEach(m => {
                console.log(`\n- Name: ${m.name}`);
                console.log(`  Description: ${m.description}`);
                console.log(`  Supported Methods: ${m.supportedGenerationMethods.join(', ')}`);
            });
        } else {
            console.error('❌ Could not list models:', data);
        }

    } catch (error) {
        console.error('❌ Error listing models:', error);
    }
}

listModels();
