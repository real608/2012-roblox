"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class InventoryService extends base_1.default {
    getUserInventory(userId, assetTypeId, cursor = '') {
        return this.get('https://inventory.roblox.com/v2/users/' + userId + '/inventory/' + assetTypeId + '?sortOrder=Asc&limit=25&cursor=' + encodeURIComponent(cursor));
    }
}
exports.default = InventoryService;
//# sourceMappingURL=Inventory.js.map