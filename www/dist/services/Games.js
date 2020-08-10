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
class GamesService extends base_1.default {
    getGamesByUser(userId, accessFilter, cursor = '') {
        return this.get('https://games.roblox.com/v2/users/' + userId + '/games?accessFilter=' + accessFilter + '&sortOrder=Asc&limit=100&cursor=' + encodeURIComponent(cursor));
    }
    multiGetGameInfo(universeIds) {
        return this.get('https://games.roblox.com/v1/games?universeIds=' + encodeURIComponent(universeIds.join(','))).then(d => {
            return d.data;
        });
    }
    search(params) {
        return this.get(`https://games.roblox.com/v1/games/list?${params}`);
    }
    getPlaceInfo(placeId) {
        return __awaiter(this, void 0, void 0, function* () {
            let univData = (yield this.get('https://games.roblox.com/v1/games/multiget-place-details?placeIds=' + placeId))[0];
            return univData;
        });
    }
}
__decorate([
    base_1.default.AddCookie(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GamesService.prototype, "getPlaceInfo", null);
exports.default = GamesService;
//# sourceMappingURL=Games.js.map