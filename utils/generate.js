const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const { createFolder, createFile } = require('./file');

function generateFiles({
  componentFolderPath,
  componentName,
  kebabCaseName,
  window,
}) {
  createFolder(componentFolderPath, window);
  createFile(
    path.join(componentFolderPath, `${kebabCaseName}.jsx`),
    generateJsxCode({ componentName, kebabCaseName }),
    window
  );
  createFile(
    path.join(componentFolderPath, `${kebabCaseName}.module.css`),
    generateCssCode(),
    window
  );
  createFile(
    path.join(componentFolderPath, 'index.js'),
    `export { default as ${componentName} } from "./${kebabCaseName}";`,
    window
  );
}

function generateJsxCode({ componentName, kebabCaseName }) {
  let source = fs.readFileSync(
    path.join(__dirname, '../template-react.hbs'),
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
  generateFiles,
};
