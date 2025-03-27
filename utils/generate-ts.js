const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { createFolder, createFile } = require('./file');

function generateFilesTs({
  componentFolderPath,
  componentName,
  kebabCaseName,
  window,
}) {
  createFolder(componentFolderPath, window);
  createFile(
    path.join(componentFolderPath, `${kebabCaseName}.tsx`),
    generateJsxCode({ componentName, kebabCaseName }),
    window
  );
  createFile(
    path.join(componentFolderPath, `${kebabCaseName}.module.css`),
    generateCssCode(),
    window
  );
  createFile(
    path.join(componentFolderPath, 'index.ts'),
    `export { default as ${componentName} } from "./${kebabCaseName}";`,
    window
  );
}

function generateJsxCode({ componentName, kebabCaseName }) {
  let source = fs.readFileSync(
    path.join(__dirname, '../template-react-ts.hbs'),
    'utf8'
  );
  let template = handlebars.compile(source);
  let context = { componentName, kebabCaseName };
  return template(context);
}

function generateCssCode() {
  let source = fs.readFileSync(
    path.join(__dirname, '../template-css.hbs'),
    'utf8'
  );
  let template = handlebars.compile(source);
  return template();
}

module.exports = {
  generateFilesTs,
};
