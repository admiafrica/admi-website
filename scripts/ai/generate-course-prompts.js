const fs = require('fs');
const path = require('path');

// Configuration
const COURSES_DIR = path.join(process.cwd(), 'src/pages/courses');
const OUTPUT_FILE = path.join(process.cwd(), 'scripts/ai/course-prompts.json');

// Helper to extract content using Regex
function extractField(content, fieldName) {
    const regex = new RegExp(`${fieldName}=["']([^"']+)["']`);
    const match = content.match(regex);
    return match ? match[1] : null;
}

function extractHighlights(content) {
    const highlightRegex = /highlights=\{\[([\s\S]*?)\]\}/;
    const match = content.match(highlightRegex);
    if (!match) return [];

    return match[1]
        .split(',')
        .map(line => line.trim().replace(/['"]/g, ''))
        .filter(line => line.length > 0);
}

// Cinematic Style Prompts
// Cinematic Style Prompts
const VEO_STYLE = "Cinematic 4k, establishes shot, slow motion, professional lighting, photorealistic, 8k, highly detailed, film grain, color graded, studio black background";
const IMAGEN_STYLE = "Cinematic photo, 8k, photorealistic, studio completely black background, no windows, dark minimal aesthetic, dramatic lighting, depth of field, high quality, professional photography";

function generatePrompts(course) {
    const basePrompt = `A professional cinematic shot representing ${course.name}.`;
    const detailedPrompt = `${basePrompt} The scene features students engaged in ${course.name} activities. ${course.subtitle || ''}. Setting is a modern professional studio with black background.`;

    return {
        video: `${detailedPrompt} ${VEO_STYLE}`,
        image: `${detailedPrompt} ${IMAGEN_STYLE}`
    };
}

function scanCourses() {
    console.log('🔍 Scanning course pages...');

    const files = fs.readdirSync(COURSES_DIR).filter(file => file.endsWith('.tsx') && !file.startsWith('index') && !file.startsWith('['));
    const courses = [];

    files.forEach(file => {
        const filePath = path.join(COURSES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        const name = extractField(content, 'courseName');
        const city = extractField(content, 'city');
        const subtitle = extractField(content, 'subtitle');

        // Only process files that look like course pages (have courseName)
        if (name) {
            const courseData = {
                id: file.replace('.tsx', ''),
                file: file,
                name,
                city: city || 'Nairobi',
                subtitle,
                highlights: extractHighlights(content)
            };

            courseData.prompts = generatePrompts(courseData);
            courses.push(courseData);
            console.log(`✅ Found: ${name} (${city})`);
        }
    });

    return courses;
}

function main() {
    try {
        const courses = scanCourses();

        const output = {
            generatedAt: new Date().toISOString(),
            count: courses.length,
            courses
        };

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2));
        console.log(`\n🎉 Successfully generated prompts for ${courses.length} courses!`);
        console.log(`📂 Saved to: ${OUTPUT_FILE}`);
    } catch (error) {
        console.error('❌ Error generating prompts:', error);
        process.exit(1);
    }
}

main();
