#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Files to migrate (excluding asset-rewriter.ts which is the source)
const filesToMigrate = [
  'src/pages/resources/[slug].tsx',
  'src/pages/courses/[slug].tsx',
  'src/pages/api/v3/related-articles.ts',
  'src/pages/api/v3/course-articles.ts',
  'src/pages/academic-pathways.tsx',
  'src/components/course/DiplomaEnhancedSEO.tsx',
  'src/components/course/CertificateEnhancedSEO.tsx',
  'src/components/shared/StructuredData.tsx',
  'src/services/contentful/studentExperience.ts',
  'src/pages/watch/[slug].tsx',
  'src/components/course/DynamicCourseContent.tsx',
  'src/app/video-sitemap.xml/route.ts',
  'src/app/resources-sitemap.xml/route.ts',
  'src/components/shared/v3/VideoPlayer.tsx',
  'src/pages/news-events/news/[slug].tsx',
  'src/components/student-support/FinancialPlanning.tsx',
  'src/components/cards/NewsItemCard.tsx',
  'src/components/cards/AnnouncementCard.tsx',
  'src/app/news-sitemap.xml/route.ts',
  'src/pages/news/[slug].tsx',
  'src/components/course/Students.tsx',
  'src/components/course/Mentors.tsx',
  'src/components/course/Hero.tsx',
  'src/components/course/Details.tsx',
  'src/components/course/CourseHero.tsx',
  'src/components/cards/EventAnnouncementCard.tsx'
];

let totalFiles = 0;
let totalReplacements = 0;

filesToMigrate.forEach((filePath) => {
  const fullPath = path.join(__dirname, filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;

  // Check if ensureProtocol is already imported
  const hasEnsureProtocol = content.includes('ensureProtocol');
  const hasUtilsImport = /import\s+{[^}]*}\s+from\s+['"]@\/utils['"]/.test(content);
  const hasAssetRewriterImport = /import\s+{[^}]*}\s+from\s+['"]@\/utils\/asset-rewriter['"]/.test(content);

  // Replace all instances of https:${...}
  // Pattern 1: https:${variable}
  content = content.replace(/https:\$\{([^}]+)\}/g, (match, captured) => {
    fileReplacements++;
    return `ensureProtocol(${captured})`;
  });

  // Pattern 2: `https:${variable}` (in template literals)
  content = content.replace(/`https:\$\{([^}]+)\}`/g, (match, captured) => {
    fileReplacements++;
    return `ensureProtocol(${captured})`;
  });

  if (fileReplacements > 0) {
    // Add import if needed
    if (!hasEnsureProtocol) {
      if (hasUtilsImport) {
        // Add to existing @/utils import
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/utils['"]/,
          (match, imports) => {
            const cleanImports = imports.trim();
            const newImports = cleanImports ? `${cleanImports}, ensureProtocol` : 'ensureProtocol';
            return `import { ${newImports} } from '@/utils'`;
          }
        );
      } else if (hasAssetRewriterImport) {
        // Add to existing @/utils/asset-rewriter import
        content = content.replace(
          /import\s+{([^}]*)}\s+from\s+['"]@\/utils\/asset-rewriter['"]/,
          (match, imports) => {
            const cleanImports = imports.trim();
            const newImports = cleanImports ? `${cleanImports}, ensureProtocol` : 'ensureProtocol';
            return `import { ${newImports} } from '@/utils/asset-rewriter'`;
          }
        );
      } else {
        // Add new import at the top (after first import or at top of file)
        const firstImportMatch = content.match(/^import\s+.*$/m);
        if (firstImportMatch) {
          const firstImport = firstImportMatch[0];
          content = content.replace(
            firstImport,
            `${firstImport}\nimport { ensureProtocol } from '@/utils'`
          );
        } else {
          content = `import { ensureProtocol } from '@/utils'\n\n${content}`;
        }
      }
    }

    // Only write if content changed
    if (content !== originalContent) {
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`✅ ${filePath} - ${fileReplacements} replacements`);
      totalFiles++;
      totalReplacements += fileReplacements;
    }
  }
});

console.log(`\n📊 Migration Summary:`);
console.log(`   Files updated: ${totalFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);
