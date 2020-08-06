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
/**
 * Roblox catalog service
 */
class CatalogService extends base_1.default {
    /**
     * Get the catalog
     * @param queryParams
     */
    getCatalog(queryParams) {
        let queryStr = '';
        const keys = Object.getOwnPropertyNames(queryParams);
        for (const key of keys) {
            // @ts-ignore
            let val = queryParams[key];
            queryStr += encodeURIComponent(key) + '=' + encodeURIComponent(val) + '&';
        }
        queryStr = queryStr.slice(0, queryStr.length - 1);
        return this.get('https://catalog.roblox.com/v1/search/items/details?' + queryStr);
    }
    /**
     * Get product info by the {assetId}
     * @param assetId
     */
    getProductInfo(assetId) {
        return this.get('https://api.roblox.com/marketplace/productinfo?assetId=' + assetId);
    }
    countFavorites(assetId) {
        return this.get(`https://catalog.roblox.com/v1/favorites/assets/${assetId}/count`);
    }
    getSimilar(assetId, limit = 5) {
        return this.get(`https://catalog.roblox.com/v1/recommendations/asset/8?contextAssetId=${assetId}&numItems=${limit}`).then(d => {
            return d.data;
        });
    }
    batchGetItemDetails(items) {
        for (const item of items) {
            if (!item.key) {
                item.key = item.itemType + '_' + item.id;
            }
            item.thumbnailType = 'assetThumbnail';
        }
        return this.axios.post(`https://catalog.roblox.com/v1/catalog/items/details`, {
            items,
        }).then(d => {
            return d.data;
        });
    }
    getAssetDetails(assetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.batchGetItemDetails([
                {
                    itemType: 'Asset',
                    id: assetId,
                }
            ]).then(data => {
                return data.data[0];
            });
        });
    }
}
exports.default = CatalogService;
//# sourceMappingURL=Catalog.js.map