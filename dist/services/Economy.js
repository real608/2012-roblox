"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const model = require("../models/");
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
    /**
     * Purchase the {productId}. If error, {BadRequest} is thrown with the code in the error.message
     * @param productId
     * @param expectedSellerId
     * @param expectedCurrency
     * @param userAssetId
     * @param saleLocationType
     * @param expectedPromoId
     * @param saleLocationId
     */
    purchaseItem(productId, expectedSellerId, expectedPrice, userAssetId, 
    // this should always be 1 right?
    expectedCurrency = 1, saleLocationType = 'Website', expectedPromoId, 
    // i have no idea what this is
    saleLocationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestBody = {
                expectedSellerId,
                expectedCurrency,
                saleLocationType,
                expectedPrice,
            };
            if (expectedPromoId) {
                requestBody.expectedPromoId = expectedPromoId;
            }
            if (saleLocationId) {
                requestBody.saleLocationId = saleLocationId;
            }
            if (userAssetId) {
                requestBody.userAssetId = userAssetId;
            }
            const d = yield this.axios.post('https://economy.roblox.com/v1/purchases/products/' + productId, requestBody);
            let purchased = d.data.purchased;
            let status = d.data.reason;
            if (purchased) {
                return d.data;
            }
            else {
                let msg = status;
                if (typeof status === 'number') {
                    msg = model.Economy.PurchaseFailReasons[status];
                }
                throw new this.Conflict(msg);
            }
        });
    }
}
exports.default = EconomyService;
//# sourceMappingURL=Economy.js.map