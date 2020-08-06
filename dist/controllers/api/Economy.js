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
exports.EconomyController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const middleware = require("../../middleware");
let EconomyController = class EconomyController extends base_1.default {
    purchase(cookie, productId, expectedSellerId, expectedPrice, userAssetId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new base_1.default({ cookie }).Economy.purchaseItem(productId, expectedSellerId, expectedPrice, userAssetId);
        });
    }
};
__decorate([
    common_1.Post('/purchase/:productId'),
    swagger_1.Summary('Purchase the {productId}'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth, middleware.csrf),
    __param(0, common_1.Locals('cookie')),
    __param(1, common_1.Required()),
    __param(1, common_1.PathParams('productId', Number)),
    __param(2, common_1.Required()),
    __param(2, common_1.BodyParams('expectedSellerId', Number)),
    __param(3, common_1.Required()),
    __param(3, common_1.BodyParams('expectedPrice', Number)),
    __param(4, common_1.BodyParams('userAssetId', Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], EconomyController.prototype, "purchase", null);
EconomyController = __decorate([
    common_1.Controller('/economy')
], EconomyController);
exports.EconomyController = EconomyController;
//# sourceMappingURL=Economy.js.map