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
exports.DefaultNoAuthController = void 0;
const base_1 = require("../base");
const swagger_1 = require("@tsed/swagger");
const common_1 = require("@tsed/common");
let DefaultNoAuthController = class DefaultNoAuthController extends base_1.default {
    adPage(id) {
        return this.Ads.getSponsorshipHtml(id).then(data => {
            return data.replace('https://www.roblox.com', '');
        });
    }
    userAdsRedirect(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = yield this.Ads.getRedirectUrl(data);
            if (url.indexOf('?ID=')) {
                let assetId = url.slice(url.indexOf('?ID=')).slice('?ID='.length);
                return res.redirect(302, '/Item.aspx?ID=' + assetId);
            }
            else if (url.indexOf('/groups/')) {
                let groupId = url.slice(url.indexOf('/groups/')).slice('/groups/'.length);
                return res.redirect(302, '/Groups/Group.aspx?ID=' + groupId);
            }
            res.redirect(302, url);
        });
    }
};
__decorate([
    common_1.Get('/user-sponsorship/:id'),
    swagger_1.Summary('Roblox IFrame ads page'),
    __param(0, common_1.PathParams('id', Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DefaultNoAuthController.prototype, "adPage", null);
__decorate([
    common_1.Get('/userads/redirect'),
    swagger_1.Summary('Roblox IFrame ads page'),
    __param(0, common_1.Required()),
    __param(0, common_1.QueryParams('data', String)),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DefaultNoAuthController.prototype, "userAdsRedirect", null);
DefaultNoAuthController = __decorate([
    common_1.Controller('/')
], DefaultNoAuthController);
exports.DefaultNoAuthController = DefaultNoAuthController;
//# sourceMappingURL=DefaultNoAuth.js.map