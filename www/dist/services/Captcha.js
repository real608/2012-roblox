"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * Roblox captcha service
 */
class CaptchaService extends base_1.default {
    metadata() {
        return this.get('https://captcha.roblox.com/v1/captcha/metadata');
    }
}
exports.default = CaptchaService;
//# sourceMappingURL=Captcha.js.map