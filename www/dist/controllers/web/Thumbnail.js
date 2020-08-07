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
exports.ThumbnailController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
let ThumbnailController = class ThumbnailController extends base_1.default {
    redirectToUserThumbnail(res, req) {
        // could this be any uglier?
        let idStr = req.query['id'] || req.query['userId'] || req.query['userid'] || req.query['UserID'] || req.query['USERID'] || req.query['ID'] || req.query['Id'];
        if (!idStr || typeof idStr !== 'string') {
            throw new this.BadRequest('NoIdSpecified');
        }
        let id = parseInt(idStr, 10);
        if (!Number.isInteger(id)) {
            throw new Error('InvalidId');
        }
        if (id === 1) {
            return res.redirect('/img/Roblox.png');
        }
        return res.redirect('https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&userid=' + id);
    }
    redirectToGroupThumbnail(res, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let idStr = req.query['id'] || req.query['groupId'] || req.query['groupid'] || req.query['GroupID'] || req.query['GROUPID'] || req.query['ID'] || req.query['Id'];
            if (!idStr || typeof idStr !== 'string') {
                throw new this.BadRequest('NoIdSpecified');
            }
            let id = parseInt(idStr, 10);
            if (!Number.isInteger(id)) {
                throw new Error('InvalidId');
            }
            const url = yield this.Thumbnails.getGroupIcon(id);
            if (!url.url) {
                return res.redirect(302, '/img/pending.png');
            }
            return res.redirect(302, url.url);
        });
    }
};
__decorate([
    common_1.Get('/User.ashx'),
    swagger_1.Summary('Redirect to the user thumbnail'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ThumbnailController.prototype, "redirectToUserThumbnail", null);
__decorate([
    common_1.Get('/Group.ashx'),
    swagger_1.Summary('Redirect to the group thumbnail'),
    __param(0, common_1.Res()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ThumbnailController.prototype, "redirectToGroupThumbnail", null);
ThumbnailController = __decorate([
    common_1.Controller('/Thumbnail')
], ThumbnailController);
exports.ThumbnailController = ThumbnailController;
//# sourceMappingURL=Thumbnail.js.map