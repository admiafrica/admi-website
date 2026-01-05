#!/usr/bin/env node

const fs = require('fs');
const {execSync} = require('child_process');

// Find files with https:${ pattern (excluding asset-rewriter.ts)
const result = execSync(`grep -rl "https:\\\${" src/ --include="*.tsx" --include="*.ts" | grep -v asset-rewriter.ts`, {
  encoding: 'utf8',
  cwd: __dirname
});

const filesToFix = result.trim().split('\n').filter(Boolean);

console.log(`Found ${filesToFix.length} files to fix:`);

let totalReplacements = 0;

filesToFix.forEach((filePath) => {
  const fullPath = `${__dirname}/${filePath}`;
  let content = fs.readFileSync(fullPath, 'utf8');
  const originalContent = content;
  let fileReplacements = 0;

  // Pattern 1: `https:${expression}` (template literal)
  content = content.replace(/`https:\$\{([^}]+)\}`/g, (match, expr) => {
    fileReplacements++;
    return `ensureProtocol(${expr})`;
  });

  // Pattern 2: src={`https:${expression}`} (JSX template literal)
  content = content.replace(/=\{`https:\$\{([^}]+)\}`\}/g, (match, expr) => {
    fileReplacements++;
    return `={ensureProtocol(${expr})}`;
  });

  //  Pattern 3: `https:${field.url}` in any context
  content = content.replace(/`https:\$\{([^}]+)\}`/g, (match, expr) => {
    if (!fileReplacements) fileReplacements++;
    return `ensureProtocol(${expr})`;
  });

  // Check if ensureProtocol is already imported
  const hasEnsureProtocol = originalContent.includes('ensureProtocol');
  const hasUtilsImport = /import\s+{[^}]*}\s+from\s+['"]@\/utils['"]/.test(originalContent);

  if (fileReplacements > 0 && !hasEnsureProtocol) {
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
    } else {
      // Add new import at the top
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

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ ${filePath} - ${fileReplacements} replacements`);
    totalReplacements += fileReplacements;
  }
});

console.log(`\n📊 Total replacements: ${totalReplacements} across ${filesToFix.length} files`);
