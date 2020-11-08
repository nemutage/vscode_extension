import * as vscode from 'vscode';
import { Activator } from './Activator';

export function activate(context: vscode.ExtensionContext) {
	let activator = new Activator(context);
	activator.activate();
}

export function deactivate() {}
