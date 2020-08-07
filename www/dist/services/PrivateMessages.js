"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class PrivateMessagesService extends base_1.default {
    countUnreadMessages() {
        return this.get('https://privatemessages.roblox.com/v1/messages/unread/count');
    }
}
exports.default = PrivateMessagesService;
//# sourceMappingURL=PrivateMessages.js.map