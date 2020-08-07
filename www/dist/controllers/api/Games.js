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
exports.GamesController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
let GamesController = class GamesController extends base_1.default {
    getGamesByUser(userId, accessFilter, cursor) {
        if (!cursor) {
            cursor = '';
        }
        if (accessFilter !== 'Public') {
            accessFilter = 'Public';
        }
        return this.Games.getGamesByUser(userId, accessFilter, cursor).then(games => {
            if (games.data.length === 0) {
                return [];
            }
            return this.Games.multiGetGameInfo(games.data.map(val => { return val.id; }));
        });
    }
    searchGames(body) {
        let str = '';
        for (const key of Object.getOwnPropertyNames(body)) {
            str += encodeURIComponent('model.' + key) + '=' + encodeURIComponent(body[key]) + '&';
        }
        str = str.slice(0, str.length - 1);
        return this.Games.search(str).then(d => {
            if (d.games.length === 0) {
                return d;
            }
            return this.Games.multiGetGameInfo(d.games.map((val) => {
                return val.universeId;
            })).then(extraInfo => {
                for (const game of extraInfo) {
                    for (const otherGame of d.games) {
                        if (otherGame.universeId === game.id) {
                            for (const key of Object.getOwnPropertyNames(game)) {
                                // @ts-ignore
                                otherGame[key] = game[key];
                            }
                            continue;
                        }
                    }
                }
                return d;
            });
        });
    }
};
__decorate([
    common_1.Get('/users/:userId/:accessFilter'),
    __param(0, common_1.PathParams('userId', Number)),
    __param(1, common_1.PathParams('accessFilter', String)),
    __param(2, common_1.QueryParams('cursor', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "getGamesByUser", null);
__decorate([
    common_1.Post('/search'),
    swagger_1.Summary('Search through games'),
    __param(0, common_1.BodyParams()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GamesController.prototype, "searchGames", null);
GamesController = __decorate([
    common_1.Controller('/games')
], GamesController);
exports.GamesController = GamesController;
//# sourceMappingURL=Games.js.map