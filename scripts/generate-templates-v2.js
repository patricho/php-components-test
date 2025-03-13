#!/usr/bin/env node

/**
 * Script to generate clean HTML templates from Twig files
 * Renders all .twig files to .template.html files with empty placeholders
 * 
 * This improved version better handles conditional structures and creates cleaner templates
 */

const fs = require('fs');
const path = require('path');
const Twig = require('twig');

// Disable caching
Twig.cache(false);

// Path to components directory
const COMPONENTS_DIR = path.resolve(__dirname, '../src/components');

/**
 * Find all .twig files in a directory recursively
 * @param {string} dir - The directory to search
 * @returns {Array<string>} - Array of file paths
 */
function findTwigFiles(dir) {
  const files = [];
  
  function scanDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.twig')) {
        files.push(fullPath);
      }
    });
  }
  
  scanDir(dir);
  return files;
}

/**
 * Extract placeholders from a Twig template
 * This function analyzes the template to find all variables
 * @param {string} content - The template content
 * @returns {Object} - An object with placeholder names as keys
 */
function extractPlaceholders(content) {
  const placeholders = {};
  
  // Match {{ variable }} expressions
  const varRegex = /\{\{\s*([a-zA-Z0-9_]+)(?:\|[^}]*?)?\s*\}\}/g;
  let match;
  
  while ((match = varRegex.exec(content)) !== null) {
    const name = match[1];
    // Skip special variables like loop
    if (!name.startsWith('_') && name !== 'loop') {
      placeholders[name] = '';
    }
  }
  
  // Match conditionals to extract variables
  // This is a simple approach - not foolproof for all Twig syntax
  const condRegex = /{%\s*if\s+([a-zA-Z0-9_]+)(?:\s*==|\s*!=|\s*>|\s*<|\s*is|)\s*[^%]*\s*%}/g;
  
  while ((match = condRegex.exec(content)) !== null) {
    const name = match[1];
    if (!name.startsWith('_') && name !== 'loop') {
      placeholders[name] = '';
    }
  }
  
  return placeholders;
}

/**
 * Process a Twig file to create a clean HTML template
 * @param {string} filePath - Path to the Twig file
 */
function processTwigFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  // Read the Twig template
  const templateContent = fs.readFileSync(filePath, 'utf8');
  
  try {
    // Extract placeholders
    const context = extractPlaceholders(templateContent);
    console.log(`Found placeholders:`, Object.keys(context));
    
    // Add common placeholders that might not be directly in the template
    context.type = '';
    context.message = '';
    context.content = '';
    context.title = '';
    
    // Create a Twig template instance
    const template = Twig.twig({ 
      data: templateContent,
      rethrow: true 
    });
    
    // Render the template with empty placeholders
    let rendered = template.render(context);
    
    // Clean up the rendered output
    
    // Remove Twig comments
    rendered = rendered.replace(/{#[\s\S]*?#}/g, '');
    
    // Clean up any multiple consecutive empty lines and trailing whitespace
    rendered = rendered.replace(/\n{3,}/g, '\n\n');
    rendered = rendered.replace(/[ \t]+$/gm, '');
    
    // Determine the output path
    const outputPath = filePath.replace(/\.twig$/, '.template.html');
    
    // Write the cleaned template to the output file
    fs.writeFileSync(outputPath, rendered);
    console.log(`Created template: ${outputPath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

/**
 * Main function to process all Twig files
 */
function main() {
  console.log('Generating HTML templates from Twig files...');
  
  // Find all Twig files
  const twigFiles = findTwigFiles(COMPONENTS_DIR);
  console.log(`Found ${twigFiles.length} Twig files.`);
  
  // Process each file
  twigFiles.forEach(processTwigFile);
  
  console.log('Template generation complete!');
}

// Run the script
main();
