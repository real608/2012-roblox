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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryController = void 0;
const common_1 = require("@tsed/common");
const base_1 = require("../base");
const _ = require("lodash");
let InventoryController = class InventoryController extends base_1.default {
    getInventory(userId, assetType, cursor, mode) {
        if (!cursor) {
            cursor = '';
        }
        if (!assetType) {
            assetType = 8;
        }
        if (assetType === 21) {
            return this.Badges.getUserBadges(userId, cursor).then(d => {
                d.data.forEach(val => {
                    // @ts-ignore
                    val.assetName = val.name;
                    // @ts-ignore
                    val.assetId = val.displayIconImageId;
                });
                if (mode === 'profile') {
                    // @ts-ignore
                    d.data = _.chunk(d.data, 5);
                }
                return d;
            });
        }
        return this.Inventory.getUserInventory(userId, assetType, cursor).then(d => {
            let multiGetIds = d.data.map(val => {
                return { id: val.assetId, itemType: 'Asset' };
            });
            return this.Catalog.batchGetItemDetails(multiGetIds).then(res => {
                for (const item of res.data) {
                    for (const otherItem of d.data) {
                        if (item.id === otherItem.assetId) {
                            for (const key of Object.getOwnPropertyNames(item)) {
                                // @ts-ignore
                                otherItem[key] = item[key];
                            }
                            continue;
                        }
                    }
                }
                if (mode === 'profile') {
                    // @ts-ignore
                    d.data = _.chunk(d.data, 5);
                }
                return d;
            });
        });
    }
};
__decorate([
    common_1.Get('/users/:userId/:assetTypeId'),
    __param(0, common_1.PathParams('userId', Number)),
    __param(1, common_1.PathParams('assetTypeId', Number)),
    __param(2, common_1.QueryParams('cursor', String)),
    __param(3, common_1.QueryParams('mode', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", void 0)
], InventoryController.prototype, "getInventory", null);
InventoryController = __decorate([
    common_1.Controller('/inventory')
], InventoryController);
exports.InventoryController = InventoryController;
//# sourceMappingURL=Inventory.js.map