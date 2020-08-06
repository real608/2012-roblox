"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class AdsService extends base_1.default {
    /**
     * Get roblox user sponsorship html
     * @param type
     */
    getSponsorshipHtml(type) {
        return this.get('https://www.roblox.com/user-sponsorship/' + type);
    }
    /**
     * Get the {redirectUrl} for an ad
     * @param data
     */
    getRedirectUrl(data) {
        return this.axios.get('https://www.roblox.com/userads/redirect?data=' + encodeURIComponent(data), {
            validateStatus: (num) => {
                return num === 302;
            },
            maxRedirects: 0,
        }).then(d => {
            const head = d.headers['location'];
            if (!head) {
                throw new Error('No 302 redirect location specified');
            }
            console.log('location', head);
            return head;
        });
    }
}
exports.default = AdsService;
//# sourceMappingURL=Ads.js.map