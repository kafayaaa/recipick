const fs = require('fs');
const path = require('path');
require('dotenv').config();

const targetPath = path.join(__dirname, '../src/environments/environment.ts');

const envConfigFile = `
export const environment = {
  production: true,
  geminiApiKey: '${process.env['GEMINI_API_KEY'] || ''}'
};
`;

console.log('Generating environment.ts...');

fs.writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) {
    console.error('Error writing environment.ts:', err);
  } else {
    console.log(`environment.ts generated at ${targetPath}`);
  }
});
