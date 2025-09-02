const vscode = require('vscode');

function activate(context) {
    const layoutJopestpe = {
        'workbench.preferredHighContrastColorTheme': 'Jopestpe Tema',
        'workbench.statusBar.visible': false,
        'workbench.activityBar.location': 'bottom',
        'editor.fontFamily': "'Iosevka'",
        'editor.fontSize': 20,
        'files.autoSave': 'afterDelay',
        'files.autoSaveDelay': 1,
        'security.workspace.trust.untrustedFiles': 'open',
        'explorer.confirmDelete': false,
        'explorer.confirmDragAndDrop': false,
        'window.confirmSaveUntitledWorkspace': false,
        'window.menuBarVisibility': 'visible',
        'window.titleBarStyle': 'custom',
        'editor.scrollbar.vertical': 'hidden',
        'editor.scrollbar.horizontal': 'hidden',
        'explorer.compactFolders': false,
        'breadcrumbs.enabled': false,
        'editor.minimap.enabled': false,
        'window.commandCenter': false,
        'workbench.layoutControl.enabled': false,
        'workbench.editor.enablePreview': false,
        'terminal.integrated.fontSize': 20,
        'terminal.integrated.fontFamily': "'Iosevka'"
    };

    const layoutPadrao = {
        'workbench.preferredHighContrastColorTheme': 'Default High Contrast',
        'workbench.statusBar.visible': true,
        'workbench.activityBar.location': 'default',
        'editor.fontFamily': 'Consolas, \'Courier New\', monospace',
        'editor.fontSize': 14,
        'files.autoSave': 'off',
        'files.autoSaveDelay': 1000,
        'security.workspace.trust.untrustedFiles': 'prompt',
        'explorer.confirmDelete': true,
        'explorer.confirmDragAndDrop': true,
        'window.confirmSaveUntitledWorkspace': true,
        'window.menuBarVisibility': 'classic',
        'window.titleBarStyle': 'native',
        'editor.scrollbar.vertical': 'auto',
        'editor.scrollbar.horizontal': 'auto',
        'explorer.compactFolders': true,
        'breadcrumbs.enabled': true,
        'editor.minimap.enabled': true,
        'window.commandCenter': true,
        'workbench.layoutControl.enabled': true,
        'workbench.editor.enablePreview': true,
        'terminal.integrated.fontSize': 14,
        'terminal.integrated.fontFamily': 'Consolas, \'Courier New\', monospace'
    };

    function aplicarLayoutJopestpe() {
        const config = vscode.workspace.getConfiguration();
        
        Object.keys(layoutJopestpe).forEach(key => {
            config.update(key, layoutJopestpe[key], vscode.ConfigurationTarget.Global);
        });
        
        vscode.window.showInformationMessage('Layout Jopestpe ativado com todas as configurações!');
    }

    function restaurarLayoutPadrao() {
        const config = vscode.workspace.getConfiguration();
        
        Object.keys(layoutPadrao).forEach(key => {
            config.update(key, layoutPadrao[key], vscode.ConfigurationTarget.Global);
        });
        
        vscode.window.showInformationMessage('Layout padrão restaurado');
    }

    function verificarTemaAtual() {
        const config = vscode.workspace.getConfiguration();
        const temaAtual = config.get('workbench.colorTheme');
        
        if (temaAtual === 'Jopestpe Tema') {
            aplicarLayoutJopestpe();
        }
    }

    let ativarLayoutCommand = vscode.commands.registerCommand('AtivarLayoutJopestpe', () => {
        aplicarLayoutJopestpe();
    });

    let desativarLayoutCommand = vscode.commands.registerCommand('DesativarLayoutJopestpe', () => {
        restaurarLayoutPadrao();
    });
    
    let configListener = vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('workbench.colorTheme')) {
            const config = vscode.workspace.getConfiguration();
            const novoTema = config.get('workbench.colorTheme');
            
            if (novoTema === 'Jopestpe Tema') {
                aplicarLayoutJopestpe();
            } else {
                restaurarLayoutPadrao();
            }
        }
    });

    verificarTemaAtual();
    
    context.subscriptions.push(ativarLayoutCommand);
    context.subscriptions.push(desativarLayoutCommand);
    context.subscriptions.push(configListener);
}

function deactivate() {
}

module.exports = {
    activate,
    deactivate
};
