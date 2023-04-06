const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

function generateFiles({ componentFolderPath, componentName, kebabCaseName }) {
  fs.mkdirSync(componentFolderPath);
  fs.writeFileSync(
    path.join(componentFolderPath, `${kebabCaseName}.jsx`),
    generateJsxCode({ componentName, kebabCaseName })
  );
  fs.writeFileSync(
    path.join(componentFolderPath, `${kebabCaseName}.module.css`),
    generateCssCode()
  );
  fs.writeFileSync(
    path.join(componentFolderPath, 'index.js'),
    `export { default as ${componentName} } from "./${kebabCaseName}";`
  );
}

function generateJsxCode({ componentName, kebabCaseName }) {
  let source = fs.readFileSync(
    path.join(__dirname, 'template-react.hbs'),
    'utf8'
  );
  let template = handlebars.compile(source);
  let context = { componentName, kebabCaseName };
  return template(context);
}

function generateCssCode() {
  let source = fs.readFileSync(
    path.join(__dirname, 'template-css.hbs'),
    'utf8'
  );
  let template = handlebars.compile(source);
  return template();
}

module.exports = {
  generateFiles,
};
