"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const Cryptr = require('cryptr');
const Config_1 = require("../helpers/Config");
const encryptionService = new Cryptr(Config_1.default.cookiesKey);
class CookieService extends base_1.default {
    /**
     * Encrypt a cookie string
     * @param cookieString
     */
    encrypt(cookieString) {
        return encryptionService.encrypt(cookieString);
    }
    /**
     * Decrypt a cookie string
     * @param cookieString
     */
    decrypt(cookieString) {
        return encryptionService.decrypt(cookieString);
    }
}
exports.default = CookieService;
//# sourceMappingURL=Cookie.js.map