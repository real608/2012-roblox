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
const base_1 = require("./base");
/**
 * Roblox auth service
 */
class AuthService extends base_1.default {
    signup(username, password, gender, 
    /**
     * Seems to accept any date formats
     * @example 02 Jan 2016
     */
    birthday, 
    /**
     * Fun captcha token
     */
    captcha, isTosAggreementBoxChecked = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // {"username":"wgawag","password":"hwawahwah","birthday":"02 Jan 2016","gender":3,"isTosAgreementBoxChecked":true,"context":"MultiverseSignupForm","displayAvatarV2":false,"displayContextV2":false}
            const request = yield this.axios.post('https://auth.roblox.com/v2/signup', {
                username,
                password,
                gender,
                birthday,
                isTosAggreementBoxChecked,
                captchaProvider: 'PROVIDER_ARKOSELABS',
                captchaToken: captcha,
                // this seems to be for analytics and probably isn't required
                context: 'MultiverseSignupForm',
                displayAvatarV2: false,
                displayContextV2: false,
            });
            let cookieHeader = request.headers['cookie'];
            if (!cookieHeader || typeof cookieHeader !== 'string') {
                throw new this.Conflict('NoCookieHeader');
            }
            let robloSecurity = cookieHeader.match(/\.ROBLOSECURITY=(.+?)(;|$)/g);
            if (!robloSecurity || robloSecurity && !robloSecurity[0]) {
                throw new this.Conflict('NoRobloSecurityInCookies');
            }
            robloSecurity[0] = robloSecurity[0].replace('.ROBLOSECURITY=', '').replace(/;$/g, '');
            return {
                cookie: robloSecurity[0],
                userId: request.data.userId,
                starterPlaceId: request.data.starterPlaceId,
            };
        });
    }
    usernameRecovery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.axios.post('https://auth.roblox.com/v2/usernames/recover', {
                "targetType": "Email",
                "target": email
            });
            return {};
        });
    }
    requestPasswordReset(email, captcha) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.axios.post('https://auth.roblox.com/v2/passwords/reset/send', {
                "targetType": "Email",
                "target": email,
                "captchaToken": captcha,
                "captchaProvider": "PROVIDER_ARKOSELABS"
            });
            return {};
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=Auth.js.map