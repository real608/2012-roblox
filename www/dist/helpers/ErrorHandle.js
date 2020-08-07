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
exports.GlobalErrorHandlerMiddleware = void 0;
const common_1 = require("@tsed/common");
const HTTPExceptions_1 = require("./HTTPExceptions");
const vm = require("../viewmodels");
let GlobalErrorHandlerMiddleware = class GlobalErrorHandlerMiddleware extends HTTPExceptions_1.default {
    /**
     * Error handler
     * @param e Error object
     * @param req Express request object
     * @param res Express response object
     */
    use(e, req, res, next) {
        if (e.message === 'LogoutRequired') {
            return res.redirect('/My/Home.aspx');
        }
        else if (e.message === 'LoginRequired') {
            return res.redirect(302, '/Login/Default.aspx');
        }
        let code = 'InternalServerError';
        if (e.isAxiosError && e.response) {
            let s = e.response.status;
            if (s === 404) {
                code = 'NotFound';
            }
            else if (s === 403) {
                code = 'Forbidden';
            }
            else if (s === 401) {
                code = 'Unauthorized';
            }
            else if (s === 400) {
                code = 'BadRequest';
            }
            else if (s === 409) {
                code = 'Conflict';
            }
            else {
                console.error('[error]', s, e.response.statusText, e.response.data, e.config.url);
            }
            console.log('[error] ' + req.method + ' ' + req.url, s, e.response.data);
            return res.status(s || 500).json({
                success: false,
                error: {
                    code,
                }
            }).end();
        }
        if (e instanceof this.BadRequest ||
            e instanceof this.Unauthorized ||
            e instanceof this.NotFound ||
            e instanceof this.Conflict) {
            return res.status(e.status).json({
                success: false,
                error: {
                    code: e.message,
                }
            });
        }
        res.status(e.status || 500);
        res.render('pages/error.ejs', new vm.Default({
            code: 500,
            url: req.url,
            error: e,
        }), (err, html) => {
            if (err) {
                console.error(err);
                let msg = 'Internal server error';
                if (process.env.NODE_ENV !== 'production') {
                    msg = 'Render Error in ErrorHandle.ts. Original stack below:\n\n' + e.stack;
                }
                res.set('content-type', 'text/plain').send(msg).end();
            }
            else {
                res.send(html).end();
            }
        });
    }
};
__decorate([
    __param(0, common_1.Err()),
    __param(1, common_1.Req()),
    __param(2, common_1.Res()),
    __param(3, common_1.Next()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Function]),
    __metadata("design:returntype", void 0)
], GlobalErrorHandlerMiddleware.prototype, "use", null);
GlobalErrorHandlerMiddleware = __decorate([
    common_1.Middleware()
], GlobalErrorHandlerMiddleware);
exports.GlobalErrorHandlerMiddleware = GlobalErrorHandlerMiddleware;
//# sourceMappingURL=ErrorHandle.js.map