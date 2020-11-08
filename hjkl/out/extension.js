"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const Activator_1 = require("./Activator");
function activate(context) {
    let activator = new Activator_1.Activator(context);
    activator.activate();
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map