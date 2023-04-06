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
          : vscode.workspace.workspaceFolders[0].uri.fsPath;
        let activeFolderUri = vscode.Uri.file(path.dirname(activeFilePath));
        console.log('activeFolderUri', activeFolderUri);
        let directoryPath = activeFolderUri.fsPath;
        console.log('directoryPath', directoryPath);
        vscode.window
          .showInputBox({ prompt: 'Enter component name' })
          .then(function (componentName) {
            let kebabCaseName = componentName
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase();
            let componentFolderPath = path.join(directoryPath, kebabCaseName);
            console.log('componentFolderPath', componentFolderPath);
            // generateFiles({
            //   componentFolderPath,
            //   componentName,
            //   kebabCaseName,
            // });
            // vscode.workspace
            //   .openTextDocument(
            //     path.join(componentFolderPath, `${kebabCaseName}.jsx`)
            //   )
            //   .then((doc) => vscode.window.showTextDocument(doc));
            // vscode.commands.executeCommand(
            //   'revealInExplorer',
            //   vscode.Uri.file(componentFolderPath)
            // );
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

