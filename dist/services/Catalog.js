"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    getSimilar(assetId, typeId = 8, limit = 5) {
        return this.get(`https://catalog.roblox.com/v1/recommendations/asset/${typeId}?contextAssetId=${assetId || ''}&numItems=${limit}`).then(d => {
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
__decorate([
    base_1.default.AddCookie(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CatalogService.prototype, "getSimilar", null);
exports.default = CatalogService;
//# sourceMappingURL=Catalog.js.map