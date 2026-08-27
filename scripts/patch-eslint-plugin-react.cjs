const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../node_modules/eslint-plugin-react/lib/util/version.js');

if (fs.existsSync(targetFile)) {
  let content = fs.readFileSync(targetFile, 'utf8');
  const target = "const filename = typeof contextOrFilename === 'string' ? contextOrFilename : contextOrFilename.getFilename();";
  const replacement = "const filename = typeof contextOrFilename === 'string' ? contextOrFilename : (contextOrFilename.filename || contextOrFilename.physicalFilename || (contextOrFilename.getPhysicalFilename && contextOrFilename.getPhysicalFilename()) || (contextOrFilename.getFilename && contextOrFilename.getFilename()) || process.cwd());";
  
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log('Successfully patched eslint-plugin-react for ESLint v9/v10 support.');
  } else {
    console.log('eslint-plugin-react patch not needed or already applied.');
  }
} else {
  console.log('eslint-plugin-react not found, skipping patch.');
}
