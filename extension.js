const vscode = require('vscode');
const path = require('path');
const { generateFiles } = require('./utils');

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'react-component-generator.helloWorld',
    function () {
      try {
        let activeEditor = vscode.window.activeTextEditor;
        let activeFilePath = activeEditor
          ? activeEditor.document.uri.fsPath
          : vscode.workspace.rootPath;
        let activeFolderUri = vscode.Uri.file(path.dirname(activeFilePath));
        let activeFolder = vscode.workspace.getWorkspaceFolder(activeFolderUri);
        if (!activeFolder) {
          vscode.window.showWarningMessage('No workspace folder found.');
          return;
        }
        let directoryPath = activeFolder.uri.fsPath;
        vscode.window
          .showInputBox({ prompt: 'Enter component name' })
          .then(function (componentName) {
            let kebabCaseName = componentName
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase();
            let componentFolderPath = path.join(directoryPath, kebabCaseName);
            generateFiles({
              componentFolderPath,
              componentName,
              kebabCaseName,
            });
            // vscode.workspace.updateWorkspaceFolders(activeFolder.index, null, {
            //   uri: vscode.Uri.file(componentFolderPath),
            // });
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

