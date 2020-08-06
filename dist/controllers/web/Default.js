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
exports.DefaultController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const vm = require("../../viewmodels");
const _ = require("lodash");
const middleware = require("../../middleware");
const model = require("../../models");
let DefaultController = class DefaultController extends base_1.default {
    homepage() {
        const featuredGame = {
            universeId: 1234,
            placeId: 4068198,
            name: 'Jet Wars: Advanced Battle',
            creatorName: 'Carbon131',
            creatorId: '813527',
            creatorUrl: '/User.aspx?ID=813527',
            updated: '1 month ago',
            favorites: 397481,
            visits: 318591185,
        };
        return new vm.Default({
            featuredGame,
        });
    }
    signup() {
        return new vm.Default({
            currentYear: new Date().getFullYear(),
        });
    }
    newNameAndPassword(day, month, year, gender) {
        return new vm.Default({
            day,
            month,
            year,
            gender,
        });
    }
    login() {
        return new vm.Default({
            currentYear: new Date().getFullYear(),
        }, {
            title: 'Login - ROBLOX'
        });
    }
    resetPasswordRequest() {
        return new vm.Default({});
    }
    CatalogPage(m, keyword, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            let header = 'Featured';
            let queryParams = {
                limit: 28,
            };
            // parse cursor
            let currentPage = 1;
            if (cursor && typeof cursor === 'string') {
                queryParams['cursor'] = cursor;
                if (cursor.indexOf('_') !== -1) {
                    let pageNum = cursor.slice(0, cursor.indexOf('_')).match(/\d+/g);
                    if (pageNum) {
                        currentPage = parseInt(pageNum[0], 10);
                    }
                }
            }
            // parse keyword
            if (keyword) {
                queryParams['Keyword'] = keyword;
            }
            else {
                keyword = '';
            }
            if (!m) {
                m = 'Featured';
            }
            // parse search mode
            if (m === 'Featured') {
                queryParams['Category'] = 0;
            }
            else if (m === 'TopFavorites') {
                header = 'Top Favorites';
                queryParams['SortType'] = 0;
            }
            else if (m === 'BestSelling') {
                header = 'Best Selling';
                queryParams['SortType'] = 2;
            }
            else if (m === 'RecentlyUpdated') {
                header = 'Recently Updated';
                queryParams['SortType'] = 3;
            }
            else if (m === 'ForSale') {
                queryParams['IncludeNotForSale'] = false;
            }
            else if (m === 'PublicDomain') {
                header = 'Free';
                queryParams['MaxPrice'] = 0;
                queryParams['IncludeNotForSale'] = false;
            }
            else if (m === 'Collectible') {
                header = 'Collectible';
                queryParams['Category'] = 2;
            }
            // get results and filter out bundles
            const results = yield this.Catalog.getCatalog(queryParams);
            let data = [];
            if (results.data) {
                data = _.chunk(results.data.filter(val => {
                    return val.itemType !== 'Bundle';
                }), 5);
            }
            // return viewmodel
            return new vm.Default({
                currentPage,
                header,
                cursor: {
                    next: results.nextPageCursor,
                    previous: results.previousPageCursor,
                },
                items: data,
                keyword: keyword,
                m,
            }, {
                title: 'Avatar Items, Virtual Avatars, Virtual Goods',
                description: 'Avatar Items - ROBLOX has a full virtual goods catalog with avatar items and other virtual items. Create a free account on ROBLOX and start collecting avatar items, virtual goods, virtual items, and other gear for your virtual avatars.',
                keywords: 'avatars, avatar items, virtual avatars, virtual goods, virtual items',
            });
        });
    }
    itemPage(res, assetId, backupAssetIdOne, backupAssetIdTwo, backupAssetIdThree, backupAssetIdFour, backupAssetIdFive, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            assetId = assetId || backupAssetIdOne || backupAssetIdTwo || backupAssetIdThree || backupAssetIdFour || backupAssetIdFive;
            if (!assetId) {
                throw new this.BadRequest('InvalidAssetId');
            }
            const productInfo = yield this.Catalog.getProductInfo(assetId);
            if (productInfo.AssetTypeId === 9) {
                return res.redirect(301, '/Games.aspx?id=' + assetId);
            }
            let autenticatedS;
            if (cookie) {
                autenticatedS = new base_1.default({
                    cookie,
                });
            }
            else {
                autenticatedS = this;
            }
            let resaleData;
            let sellers;
            if (productInfo.IsLimited || productInfo.IsLimitedUnique) {
                resaleData = yield this.Economy.getResaleData(assetId);
                try {
                    sellers = yield autenticatedS.Economy.getSellers(assetId);
                }
                catch (err) {
                    // probably auth erro
                }
            }
            const [favorites, similar, details] = yield Promise.all([
                this.Catalog.countFavorites(assetId),
                this.Catalog.getSimilar(assetId, 5),
                this.Catalog.getAssetDetails(assetId),
            ]);
            let dateFormat = `M[/]D[/]YYYY h:mm:ss A`;
            let updatedAtFormat = this.moment(productInfo.Updated).format(dateFormat);
            let chartsMin30 = this.moment().subtract(30, 'days').unix() * 1000;
            let chartsMin90 = this.moment().subtract(90, 'days').unix() * 1000;
            let chartsMin180 = this.moment().subtract(180, 'days').unix() * 1000;
            const data = {
                price: productInfo.PriceInRobux || 0,
                chartsMin30,
                chartsMin90,
                chartsMin180,
                updatedAtFormat: updatedAtFormat,
                sales: productInfo.Sales,
                assetId: assetId,
                name: productInfo.Name,
                itemDescription: productInfo.Description,
                createdAt: productInfo.Created,
                updatedAt: productInfo.Updated,
                creatorType: productInfo.Creator.CreatorType,
                creatorName: productInfo.Creator.Name,
                creatorId: productInfo.Creator.Id,
                favorites: favorites,
                similar: similar.map(val => {
                    return {
                        userId: val.creator.creatorId,
                        creator: val.creator.name,
                        name: val.item.name,
                        assetId: val.item.assetId,
                    };
                }),
                // @ts-ignore
                category: model.Catalog.AssetTypes[productInfo.AssetTypeId],
                genres: details.genres,
                isCollectible: false,
                isCollectibleUnique: productInfo.IsLimitedUnique,
                isForSale: productInfo.IsForSale || productInfo.IsPublicDomain,
            };
            if (sellers) {
                let newArr = [];
                for (const val of sellers.data) {
                    newArr.push({
                        userId: val.seller.id,
                        username: val.seller.name,
                        price: val.price,
                        serial: val.serialNumber,
                        userAssetId: val.userAssetId,
                    });
                }
                data.sellers = newArr;
                data.totalSellers = sellers.data.length;
            }
            if (resaleData) {
                data.isCollectible = true;
                data.sold = resaleData.sales;
                data.originalPrice = resaleData.originalPrice;
                data.rap = resaleData.recentAveragePrice;
                data.charts = {};
                data.charts.rap = resaleData.priceDataPoints.map(val => {
                    return [
                        this.moment(val.date).unix() * 1000,
                        val.value,
                    ];
                });
                data.charts.volume = resaleData.volumeDataPoints.map(val => {
                    return [
                        this.moment(val.date).unix() * 1000,
                        val.value,
                    ];
                });
            }
            let createdAtFormat = this.moment(data.createdAt).format(`MM/DD/YYYY`);
            data.createdAtFormat = createdAtFormat;
            data.title = `${data.name}, a ${data.category} by ${data.creatorName} - ROBLOX (updated ${updatedAtFormat})`;
            data.keywords = `virtual good ${data.name}, a ${data.category} by ${data.creatorName} - ROBLOX (updated ${updatedAtFormat}) items, ROBLOX ${data.name}, a ${data.category} by ${data.creatorName} - ROBLOX (updated ${updatedAtFormat})`;
            data.description = `${data.name}, a Hat by ${data.creatorName} - ROBLOX (updated ${updatedAtFormat}): ${data.description}`;
            data.image = false;
            const newVm = new vm.Default({});
            for (const entry of Object.getOwnPropertyNames(data)) {
                // @ts-ignore
                newVm[entry] = data[entry];
            }
            return newVm;
        });
    }
    profile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            let [robloxUserData, friends] = yield Promise.all([
                this.Users.getUserInfo(userId),
                this.Friends.getFriends(userId)
            ]);
            let username = robloxUserData.name;
            let createdGamesCount = 1;
            let favoritedGamesCount = 1;
            console.log('setup view and return');
            let data = {
                title: username + ' - ROBLOX',
                description: `View ${username}'s profile on ROBLOX.  ROBLOX is the place for free games online, where people like ROBLOX imagine, build, and share their creations with their friends in a kid-safe environment.  There are millions of free games on ROBLOX.  ${favoritedGamesCount} of them are ROBLOX's pics on ROBLOX for best free games.  ROBLOX is the creator of ${createdGamesCount} free games.  Visit ROBLOX now to play ${username}'s free games and discover thousands of others!`,
                keywords: `free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine`,
                profileDescription: robloxUserData.description || '',
                friends: friends,
                username,
                userId,
                chunkedFriends: _.chunk(friends, 3).slice(0, 2),
            };
            const v = new vm.Default({});
            // legacy moment
            for (const key of Object.getOwnPropertyNames(data)) {
                // @ts-ignore
                v[key] = data[key];
            }
            return v;
        });
    }
};
__decorate([
    common_1.Get('/'),
    common_1.Get('/Default.aspx'),
    swagger_1.Summary('Homepage'),
    common_1.Render('pages/index.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "homepage", null);
__decorate([
    common_1.Get('/login/newage.aspx'),
    swagger_1.Summary('Signup page'),
    common_1.Render('pages/login/new-age.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "signup", null);
__decorate([
    common_1.Get('/login/newnameandpassword.aspx'),
    swagger_1.Summary('Signup page'),
    common_1.Render('pages/login/new-name-and-password.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth),
    __param(0, common_1.Required()),
    __param(0, common_1.QueryParams('day', Number)),
    __param(1, common_1.Required()),
    __param(1, common_1.QueryParams('month', Number)),
    __param(2, common_1.Required()),
    __param(2, common_1.QueryParams('year', Number)),
    __param(3, common_1.Required()),
    __param(3, common_1.QueryParams('gender', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "newNameAndPassword", null);
__decorate([
    common_1.Get('/login'),
    common_1.Get('/login/default.aspx'),
    swagger_1.Summary('Login page'),
    common_1.Render('pages/login/default.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "login", null);
__decorate([
    common_1.Get('/login/ResetPasswordRequest.aspx'),
    swagger_1.Summary('Password reset request'),
    common_1.Render('pages/login/reset-password-request.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DefaultController.prototype, "resetPasswordRequest", null);
__decorate([
    common_1.Get('/Catalog.aspx'),
    common_1.Get('/Catalog'),
    common_1.Get('/Catalog/Default.aspx'),
    swagger_1.Summary('Catalog page'),
    common_1.Render('pages/catalog.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest),
    __param(0, swagger_1.Description('Mode (I think)')),
    __param(0, common_1.QueryParams('m', String)),
    __param(1, swagger_1.Description('Search keyword')),
    __param(1, common_1.QueryParams('query', String)),
    __param(2, common_1.QueryParams('cursor', String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "CatalogPage", null);
__decorate([
    common_1.Get('/Item.aspx'),
    swagger_1.Summary('Item page'),
    common_1.Render('pages/item.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest),
    __param(0, common_1.Res()),
    __param(1, common_1.QueryParams('ID', Number)),
    __param(2, common_1.QueryParams('id', Number)),
    __param(3, common_1.QueryParams('assetid', Number)),
    __param(4, common_1.QueryParams('assetId', Number)),
    __param(5, common_1.QueryParams('AssetId', Number)),
    __param(6, common_1.QueryParams('AssetID', Number)),
    __param(7, common_1.Locals('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, Number, Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "itemPage", null);
__decorate([
    common_1.Get('/User.aspx'),
    swagger_1.Summary('User profile page'),
    common_1.Render('pages/user.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest),
    __param(0, common_1.QueryParams('ID', Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DefaultController.prototype, "profile", null);
DefaultController = __decorate([
    common_1.Controller('/')
], DefaultController);
exports.DefaultController = DefaultController;
//# sourceMappingURL=Default.js.map