"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const xss = require("xss");
let NotFoundMiddleware = class NotFoundMiddleware {
    use(req, res, next) {
        let filteredUrl = xss.filterXSS(req.url);
        // Json response
        res.status(404).send(`<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <title>Page Not Found</title>
                <style>
                    body {
                        padding: 0 10px;
                        max-width: 1000px;
                        margin:0 auto;
                        display: block;
                        font-family: sans-serif;
                    }
                </style>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <p>A route or static file could not be located for the requested URL:
                <br>
                <br>
                <span style="font-family:monospace;background:#d5d5d5;padding:3px;">${filteredUrl}</span>
                </p>
            </body>
        </html>`).end();
    }
};
__decorate([
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __param(2, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", void 0)
], NotFoundMiddleware.prototype, "use", null);
NotFoundMiddleware = __decorate([
    common_1.Middleware()
], NotFoundMiddleware);
exports.default = NotFoundMiddleware;
//# sourceMappingURL=NotFound.js.map