"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
/**
 * WWW Service, for legacy/misc APIs and web-scraping
 */
class WwwService extends base_1.default {
    /**
     * Info for the website banner
     */
    getAlertInfo() {
        return this.get('https://api.roblox.com/alerts/alert-info');
    }
}
exports.default = WwwService;
//# sourceMappingURL=www.js.map