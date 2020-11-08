"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activator = void 0;
const vscode = require("vscode");
class Activator {
    /**
     * コンストラクタ
     *
     * @param context
     */
    constructor(context) {
        this.previousKey = null;
        this.currentMode = 'Normal';
        this.context = context;
    }
    /**
     * アクティベート
     */
    activate() {
        this.registerCommand('type', (args) => __awaiter(this, void 0, void 0, function* () {
            if (!this.handleKey(args.text)) {
                vscode.commands.executeCommand("default:type", args);
            }
            this.previousKey = args.text;
        }));
    }
    /**
     * キーによってハンドリング
     *
     * @param key
     */
    handleKey(key) {
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
    switchMoveModeIfNeeded() {
        if (this.currentMode === 'Normal' &&
            this.previousKey === 'j') {
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
    switchNormalModeIfNeeded() {
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
    setContext(key, value) {
        vscode.commands.executeCommand('setContext', key, value);
    }
    /**
     * コマンド登録
     *
     * @param command
     * @param callback
     */
    registerCommand(command, callback) {
        const disposable = vscode.commands.registerCommand(command, callback);
        this.context.subscriptions.push(disposable);
    }
}
exports.Activator = Activator;
//# sourceMappingURL=Activator.js.map