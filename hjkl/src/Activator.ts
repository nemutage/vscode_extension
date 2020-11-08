import * as vscode from 'vscode';
import { Mode } from './mode';

export class Activator {
    private context: vscode.ExtensionContext;

    private previousKey: string | null = null;

    private currentMode: string = 'Normal';

    /**
     * コンストラクタ
     * 
     * @param context 
     */
    constructor(context: vscode.ExtensionContext) {
        this.context = context;
    }

    /**
     * アクティベート
     */
    public activate(): void {
        this.registerCommand('type', async (args) => {
            if (!this.handleKey(args.text)) {
                vscode.commands.executeCommand("default:type", args);
            } 
            this.previousKey = args.text;
        });
    }

    /**
     * キーによってハンドリング
     * 
     * @param key 
     */
    private handleKey(key: string): boolean {
        switch (key) {
            case 'j':
                return this.switchMoveModeIfNeeded();
            case 'i':
                return this.switchNormalModeIfNeeded();
            default:
                return false;
        }
    }

    /**
     * Moveモードへ移行
     */
    private switchMoveModeIfNeeded(): boolean {

        if (
            this.currentMode === 'Normal' &&
            this.previousKey === 'j'
        ) {
            this.currentMode = 'Move';
            this.setContext('hjkl.mode', 'Move');
            vscode.commands.executeCommand('deleteLeft');
            return true;
        }
        return false;
    }

    /**
     * Normalモードへ移行
     */
    private switchNormalModeIfNeeded(): boolean {
        if (this.currentMode === 'Move') {
            this.currentMode = 'Normal';
            this.setContext('hjkl.mode', 'Normal');
            return true;
        }
        return false;
    }

    /**
     * when句のコンテキストを変更
     * 
     * @param key 
     * @param value 
     */
    private setContext(key: string, value: any) {
        vscode.commands.executeCommand('setContext', key, value);
    }

    /**
     * コマンド登録
     * 
     * @param command 
     * @param callback 
     */
    private registerCommand(
        command: string,
        callback: (...args: any[]) => any
    ) {
        const disposable = vscode.commands.registerCommand(command, callback);
        this.context.subscriptions.push(disposable);
    }
}

