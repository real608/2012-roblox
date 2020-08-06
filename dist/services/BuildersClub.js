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
const model = require("../models");
class BuildersClubService extends base_1.default {
    /**
     * Get the builders club type of the {userId}
     * @param userId
     */
    getType(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (userId === 1) {
                return 'OBC';
            }
            let cached = yield this.redis.get('is_premium_' + userId);
            if (typeof cached !== 'string') {
                cached = (yield this.get('https://premiumfeatures.roblox.com/v1/users/' + userId + '/validate-membership')) === true ? 'true' : 'false';
                yield this.redis.setex('is_premium_' + userId, 60 * 5, cached);
            }
            if (cached === 'true') {
                const cachedBcStatus = yield this.redis.get('bc_type_' + userId);
                if (cachedBcStatus) {
                    return cachedBcStatus;
                }
                else {
                    return 'BC';
                }
            }
            return 'NBC';
        });
    }
    /**
     * Subscription info can only be retreived by the authenticated user
     * @param userId
     */
    getSubscription(userId) {
        return this.get('https://premiumfeatures.roblox.com/v1/users/' + userId + '/subscriptions').then(d => {
            if (!d.subscriptionProductModel) {
                return {
                    // @ts-ignore
                    type: 'NBC',
                };
            }
            let m = d.subscriptionProductModel;
            const newM = {
                // @ts-ignore
                type: model.BuildersClub.PremiumToBC[m.subscriptionTypeName],
                isLifetime: m.isLifetime,
                expiration: m.expiration,
                renewal: m.renewal,
            };
            return newM;
        }).catch(err => {
            if (err.response && err.response.status === 404) {
                return {
                    type: 'NBC',
                };
            }
            throw err;
        });
    }
    getMembershipTypes() {
        return this.get('https://premiumfeatures.roblox.com/v1/products?typeName=Premium').then(d => {
            const newModel = [];
            d.products.forEach((item) => {
                if (item.premiumFeatureTypeName !== 'Subscription') {
                    return;
                }
                // @ts-ignore
                let name = model.BuildersClub.PremiumToBC[item.subscriptionTypeName] || 'Unknown';
                newModel.push({
                    name: name,
                    productId: item.productId,
                    premiumFeatureId: item.premiumFeatureId,
                    robuxAmount: item.robuxAmount,
                    price: item.price.usdAmount,
                });
            });
            return newModel;
        });
    }
}
__decorate([
    base_1.default.AddCookie(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], BuildersClubService.prototype, "getType", null);
exports.default = BuildersClubService;
//# sourceMappingURL=BuildersClub.js.map