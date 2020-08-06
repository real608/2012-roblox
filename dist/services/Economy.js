"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class EconomyService extends base_1.default {
    getBalance(userId) {
        return this.get('https://economy.roblox.com/v1/users/' + userId + '/currency');
    }
    getResaleData(assetId) {
        return this.get(`https://economy.roblox.com/v1/assets/${assetId}/resale-data`);
    }
    getSellers(assetId, limit = 100, cursor = '') {
        return this.get(`https://economy.roblox.com/v1/assets/${assetId}/resellers?limit=${limit}&cursor=${cursor}`);
    }
}
exports.default = EconomyService;
//# sourceMappingURL=Economy.js.map