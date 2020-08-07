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
exports.AuthController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const model = require("../../models/index");
const middleware = require("../../middleware");
let AuthController = class AuthController extends base_1.default {
    signup(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.Auth.signup(body.username, body.password, body.gender, body.birthday, body.captcha, true);
            const encrypted = this.Cookie.encrypt(results.cookie);
            res.cookie('rblxcookie', encrypted, {
                maxAge: 86400 * 30 * 12 * 10 * 1000,
                httpOnly: true,
            });
            return {
                userId: results.userId,
                username: body.username,
            };
        });
    }
    loginCookie(cookie, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cookie.indexOf('.ROBLOSECURITY=') !== -1) {
                cookie = cookie.replace('.ROBLOSECURITY=', '');
            }
            if (!cookie.match(/;$/g)) {
                cookie = cookie + ';';
            }
            const encrypted = this.Cookie.encrypt(cookie);
            res.cookie('rblxcookie', encrypted, {
                maxAge: 86400 * 30 * 12 * 10 * 1000,
                httpOnly: true,
            });
            return {};
        });
    }
    recoverUsernames(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Auth.usernameRecovery(email);
        });
    }
    sendPasswordResetEmail(email, captcha) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Auth.requestPasswordReset(email, captcha);
        });
    }
};
__decorate([
    common_1.Post('/signup'),
    swagger_1.Summary('Signup a new user and set the roblosecurity cookie'),
    common_1.Use(middleware.csrf, middleware.Auth.NoAuth),
    __param(0, common_1.BodyParams(model.Auth.SignupRequest)),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [model.Auth.SignupRequest, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    common_1.Post('/login/cookie'),
    swagger_1.Summary('Construct a cookie based off the provided {robloSecurity}'),
    common_1.Use(middleware.csrf, middleware.Auth.NoAuth),
    __param(0, common_1.Required()),
    __param(0, common_1.BodyParams('cookie', String)),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginCookie", null);
__decorate([
    common_1.Post('/usernames/recover'),
    swagger_1.Summary('Send a username reminder email'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.csrf, middleware.Auth.NoAuth),
    __param(0, common_1.Required()),
    __param(0, common_1.BodyParams('email', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "recoverUsernames", null);
__decorate([
    common_1.Post('/password/reset/send'),
    swagger_1.Summary('Send a password reset email'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.csrf, middleware.Auth.NoAuth),
    __param(0, common_1.Required()),
    __param(0, common_1.BodyParams('email', String)),
    __param(1, common_1.Required()),
    __param(1, common_1.BodyParams('captcha', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendPasswordResetEmail", null);
AuthController = __decorate([
    common_1.Controller('/auth')
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=Auth.js.map