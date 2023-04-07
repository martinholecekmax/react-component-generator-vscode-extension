const vscode = require('vscode');
const path = require('path');
const { generateFiles } = require('./utils/generate');
const fs = require('fs');
const { getComponentName } = require('./utils/input');

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'react-component-generator.createReactComponent',
    async (uri) => {
      try {
        // Check if file with fs module
        let directoryPath = `${uri.fsPath}/`;
        const stats = fs.statSync(directoryPath);
        if (!stats.isDirectory()) {
          let activeFolderUri = vscode.Uri.file(path.dirname(directoryPath));
          directoryPath = activeFolderUri.fsPath;
        }

        vscode.window
          .showInputBox({
            prompt: `Create component in ${uri.path}`,
            placeHolder: 'MyComponent',
          })
          .then(function (input) {
            if (input === undefined) {
              // If user cancels input box
              return;
            }
            let componentName = getComponentName(input);
            let kebabCaseName = componentName
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase();
            let componentFolderPath = path.join(directoryPath, kebabCaseName);
            generateFiles({
              componentFolderPath,
              componentName,
              kebabCaseName,
              window: vscode.window,
            });
            vscode.workspace
              .openTextDocument(
                path.join(componentFolderPath, `${kebabCaseName}.jsx`)
              )
              .then((doc) => vscode.window.showTextDocument(doc));
            vscode.commands.executeCommand(
              'revealInExplorer',
              vscode.Uri.file(componentFolderPath)
            );
            vscode.window.showInformationMessage(
              `React component ${componentName} created.`
            );
          });
      } catch (error) {
        console.log(error);
        vscode.window.showErrorMessage(
          `Something went wrong creating ${uri.path} folder`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};

