"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
class CookieManager {
    constructor() {
        this.cookies = [];
        this.cookieIndex = 0;
    }
    /**
     * Add cookies to the cookie manager
     * @param file The full file path to read cookies from
     * @returns Total amount of cookies added
     */
    readFromFileSync(file) {
        const data = fs_1.readFileSync(file).toString().split('\n');
        let totalAdded = 0;
        data.forEach(val => {
            if (val && val.match(/_\|WARNING:-DO-NOT-SHARE-THIS/g)) {
                val = val.replace(/\r/g, '').replace(/\n/g, '');
                if (val.slice(val.length - 1) === ';') {
                    val = val.slice(0, val.length - 1);
                }
                if (val.slice(0, '.ROBLOSECURITY='.length) === '.ROBLOSECURITY=') {
                    val = val.slice('.ROBLOSECURITY='.length);
                }
                this.cookies.push(val);
                totalAdded++;
            }
        });
        return totalAdded;
    }
    /**
     * Get a cookie
     */
    get() {
        let cookie = this.cookies[this.cookieIndex];
        if (!cookie) {
            this.cookieIndex = 0;
            return this.cookies[0];
        }
        this.cookieIndex++;
        return cookie;
    }
    /**
     * Report a cookie as bad
     * @param cookie
     */
    bad(cookie) {
        this.cookies = this.cookies.filter(val => {
            return val !== cookie;
        });
    }
}
exports.default = CookieManager;
//# sourceMappingURL=CookieManager.js.map