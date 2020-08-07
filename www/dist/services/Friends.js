"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class FriendsService extends base_1.default {
    countAuthenticatedUserFriendRequests() {
        return this.get('https://friends.roblox.com/v1/user/friend-requests/count');
    }
    getFriends(userId) {
        return this.get('https://friends.roblox.com/v1/users/' + userId + '/friends').then(data => {
            return data.data;
        });
    }
}
exports.default = FriendsService;
//# sourceMappingURL=Friends.js.map