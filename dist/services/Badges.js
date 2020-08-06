"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class BadgesService extends base_1.default {
    getUserBadges(userId, cursor = '') {
        return this.get('https://badges.roblox.com/v1/users/' + userId + '/badges?limit=25&sortOrder=Asc&cursor=' + encodeURIComponent(cursor));
    }
}
exports.default = BadgesService;
//# sourceMappingURL=Badges.js.map