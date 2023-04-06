const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const createFolder = (componentFolderPath, window) => {
  try {
    if (fs.existsSync(componentFolderPath)) {
      window.showErrorMessage(
        `Component ${componentFolderPath} already exists`
      );
    } else {
      fs.mkdirSync(componentFolderPath);
    }
  } catch (error) {
    window.showErrorMessage(
      `Something went wrong creating ${componentFolderPath} folder`
    );
  }
};

const createFile = (path, content, window) => {
  try {
    if (fs.existsSync(path)) {
      window.showErrorMessage(`File ${path} already exists`);
    } else {
      fs.writeFileSync(path, content);
    }
  } catch (error) {
    window.showErrorMessage(`Something went wrong creating ${path} file`);
  }
};

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
