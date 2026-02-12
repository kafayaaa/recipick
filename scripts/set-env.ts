const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envDir = path.join(__dirname, '../src/environments');
const targetPath = path.join(envDir, 'environment.ts');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

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
    process.exit(1);
  } else {
    console.log(`environment.ts generated successfully!`);
  }
});
