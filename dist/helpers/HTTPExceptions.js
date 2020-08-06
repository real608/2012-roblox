"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_httpexceptions_1 = require("ts-httpexceptions");
class HttpExceptions {
    constructor() {
        this.NotFound = ts_httpexceptions_1.NotFound;
        this.Unauthorized = ts_httpexceptions_1.Unauthorized;
        this.Conflict = ts_httpexceptions_1.Conflict;
        this.BadRequest = ts_httpexceptions_1.BadRequest;
    }
}
exports.default = HttpExceptions;
//# sourceMappingURL=HTTPExceptions.js.map