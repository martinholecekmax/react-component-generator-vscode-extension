const vscode = require('vscode');
const path = require('path');
const { generateFiles } = require('./utils');

function getDirectoryPath() {
  let activeEditor = vscode.window.activeTextEditor;
  let rootDirectories = vscode.workspace.workspaceFolders;
  let firstRootDirectory =
    rootDirectories && rootDirectories.length > 0
      ? rootDirectories[0].uri.fsPath
      : null;

  let activeFilePath = activeEditor ? activeEditor.document.uri.fsPath : null;

  let directoryPath = firstRootDirectory;
  if (activeFilePath) {
    let activeFolderUri = vscode.Uri.file(path.dirname(activeFilePath));
    directoryPath = activeFolderUri.fsPath;
  }

  return directoryPath;
}

function activate(context) {
  console.log('context', context);
  let disposable = vscode.commands.registerCommand(
    'react-component-generator.createReactComponent',
    // async function () {
    async (uri) => {
      try {
        // const directoryPath = getDirectoryPath();
        const directoryPath = `${uri.fsPath}/`;

        vscode.window
          .showInputBox({
            prompt: `Create component in ${uri.path}`,
            placeHolder: 'MyComponent',
          })
          .then(function (componentName) {
            let kebabCaseName = componentName
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase();
            let componentFolderPath = path.join(directoryPath, kebabCaseName);
            console.log('componentFolderPath', componentFolderPath);
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

