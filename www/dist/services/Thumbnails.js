"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class ThumbnailsService extends base_1.default {
    getGroupIcon(groupId) {
        return this.get('https://thumbnails.roblox.com/v1/groups/icons?groupIds=' + groupId + '&size=420x420&format=Png&isCircular=false').then(d => {
            return {
                url: d.imageUrl,
            };
        });
    }
}
exports.default = ThumbnailsService;
//# sourceMappingURL=Thumbnails.js.map