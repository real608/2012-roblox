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
exports.BuildersClubController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const middleware = require("../../middleware");
let BuildersClubController = class BuildersClubController extends base_1.default {
    metadata() {
        return {
            isEnabled: false,
            isBcEnabled: false,
            isTbcEnabled: false,
            isObcEnabled: false,
        };
    }
    redirectToIcon(userId, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = yield this.BuildersClub.getType(userId);
            if (status === 'BC') {
                res.redirect(302, '/img/overlay_bcOnly.png');
            }
            else if (status === 'TBC') {
                res.redirect(302, '/img/overlay_tbcOnly.png');
            }
            else if (status === 'OBC') {
                res.redirect(302, '/img/overlay_obcOnly.png');
            }
            else {
                res.redirect(302, '/img/empty.png');
            }
        });
    }
    getMembership(cookie, userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = new base_1.default({ cookie });
            return s.BuildersClub.getSubscription(userInfo.userId);
        });
    }
};
__decorate([
    common_1.Get('/metadata'),
    swagger_1.Summary('Get builders club metadata'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BuildersClubController.prototype, "metadata", null);
__decorate([
    common_1.Get('/users/:userId/redirect-to-icon'),
    swagger_1.Summary('Redirect to the bc image icon for the {userId}'),
    __param(0, common_1.PathParams('userId', Number)),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], BuildersClubController.prototype, "redirectToIcon", null);
__decorate([
    common_1.Get('/membership'),
    swagger_1.Summary('Get current membership info for the authenticated user'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth),
    __param(0, common_1.Locals('cookie')),
    __param(1, common_1.Locals('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BuildersClubController.prototype, "getMembership", null);
BuildersClubController = __decorate([
    common_1.Controller('/builders-club')
], BuildersClubController);
exports.BuildersClubController = BuildersClubController;
//# sourceMappingURL=BuildersClub.js.map