"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class UsersService extends base_1.default {
    getAuthenticatedUserInfo() {
        return this.get('https://users.roblox.com/v1/users/authenticated');
    }
    getUserInfo(userId) {
        return this.get('https://users.roblox.com/v1/users/' + userId);
    }
}
exports.default = UsersService;
//# sourceMappingURL=Users.js.map