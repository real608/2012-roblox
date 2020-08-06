"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class AccountSettingsService extends base_1.default {
    /**
     * Get email for the authenticated user
     * @param type
     */
    getEmail() {
        return this.get('https://accountsettings.roblox.com/v1/email');
    }
}
exports.default = AccountSettingsService;
//# sourceMappingURL=AccountSettings.js.map