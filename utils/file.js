const fs = require('fs');

exports.createFolder = (componentFolderPath, window) => {
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

exports.createFile = (path, content, window) => {
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
