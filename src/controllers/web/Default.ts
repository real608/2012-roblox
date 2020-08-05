import { Controller, Get, QueryParams, Res, Render, PathParams, Required, UseBefore, Locals, Use } from '@tsed/common';
import { Summary, Description } from '@tsed/swagger'
import base from '../base';
import * as vm from '../../viewmodels';
import * as _ from 'lodash';
import * as middleware from '../../middleware';
import * as model from '../../models';
import e from 'express';

@Controller('/')
export class DefaultController extends base {

    @Get('/')
    @Get('/Default.aspx')
    @Summary('Homepage')
    @Render('pages/index.ejs')
    @Use(middleware.Auth.AuthenticateRequest)
    public homepage() {
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
        }
        return new vm.Default({
            featuredGame,
        });
    }

    @Get('/login/newage.aspx')
    @Summary('Signup page')
    @Render('pages/login/new-age.ejs')
    @Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth)
    public signup() {
        return new vm.Default({
            currentYear: new Date().getFullYear(),
        });
    }

    @Get('/login/newnameandpassword.aspx')
    @Summary('Signup page')
    @Render('pages/login/new-name-and-password.ejs')
    @Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth)
    public newNameAndPassword(
        @Required()
        @QueryParams('day', Number) day: number,
        @Required()
        @QueryParams('month', Number) month: number,
        @Required()
        @QueryParams('year', Number) year: number,
        @Required()
        @QueryParams('gender', String) gender: string,
    ) {
        return new vm.Default({
            day,
            month,
            year,
            gender,
        });
    }

    @Get('/login')
    @Get('/login/default.aspx')
    @Summary('Login page')
    @Render('pages/login/default.ejs')
    @Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth)
    public login() {
        return new vm.Default({
            currentYear: new Date().getFullYear(),
        }, {
            title: 'Login - ROBLOX'
        });
    }

    @Get('/login/ResetPasswordRequest.aspx')
    @Summary('Password reset request')
    @Render('pages/login/reset-password-request.ejs')
    @Use(middleware.Auth.AuthenticateRequest, middleware.Auth.NoAuth)
    public resetPasswordRequest() {
        return new vm.Default({});
    }

    @Get('/Catalog.aspx')
    @Get('/Catalog')
    @Get('/Catalog/Default.aspx')
    @Summary('Catalog page')
    @Render('pages/catalog.ejs')
    @Use(middleware.Auth.AuthenticateRequest)
    public async CatalogPage(
        @Description('Mode (I think)')
        @QueryParams('m', String) m?: string,
        @Description('Search keyword')
        @QueryParams('query', String) keyword?: string,
        @QueryParams('cursor', String) cursor?: string,
    ) {
        let header = 'Featured';
        let queryParams: any = {
            limit: 28,
        }
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
        } else {
            keyword = '';
        }
        if (!m) {
            m = 'Featured';
        }
        // parse search mode
        if (m === 'Featured') {
            queryParams['Category'] = 0;
        } else if (m === 'TopFavorites') {
            header = 'Top Favorites';
            queryParams['SortType'] = 0;
        } else if (m === 'BestSelling') {
            header = 'Best Selling';
            queryParams['SortType'] = 2;
        } else if (m === 'RecentlyUpdated') {
            header = 'Recently Updated';
            queryParams['SortType'] = 3;
        } else if (m === 'ForSale') {
            queryParams['IncludeNotForSale'] = false;
        } else if (m === 'PublicDomain') {
            header = 'Free';
            queryParams['MaxPrice'] = 0;
            queryParams['IncludeNotForSale'] = false;
        } else if (m === 'Collectible') {
            header = 'Collectible';
            queryParams['Category'] = 2;
        }
        // get results and filter out bundles
        const results = await this.Catalog.getCatalog(queryParams);
        let data: any[] = [];
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
    }

    @Get('/Item.aspx')
    @Summary('Item page')
    @Render('pages/item.ejs')
    @Use(middleware.Auth.AuthenticateRequest)
    public async itemPage(
        @Res() res: Res,
        @QueryParams('ID', Number) assetId: number,
        @QueryParams('id', Number) backupAssetIdOne: number,
        @QueryParams('assetid', Number) backupAssetIdTwo: number,
        @QueryParams('assetId', Number) backupAssetIdThree: number,
        @QueryParams('AssetId', Number) backupAssetIdFour: number,
        @QueryParams('AssetID', Number) backupAssetIdFive: number,
        @Locals('cookie') cookie?: string,
    ) {
        assetId = assetId || backupAssetIdOne || backupAssetIdTwo || backupAssetIdThree || backupAssetIdFour || backupAssetIdFive;
        if (!assetId) {
            throw new this.BadRequest('InvalidAssetId');
        }
        const productInfo = await this.Catalog.getProductInfo(assetId);
        if (productInfo.AssetTypeId === 9) {
            return res.redirect(301, '/Games.aspx?id=' + assetId);
        }
        let autenticatedS;
        if (cookie) {
            autenticatedS = new base({
                cookie,
            });
        } else {
            autenticatedS = this;
        }
        let resaleData;
        let sellers;
        if (productInfo.IsLimited || productInfo.IsLimitedUnique) {
            resaleData = await this.Economy.getResaleData(assetId);
            try {
                sellers = await autenticatedS.Economy.getSellers(assetId);
            } catch (err) {
                // probably auth erro
            }
        }
        const [favorites, similar, details] = await Promise.all([
            this.Catalog.countFavorites(assetId),
            this.Catalog.getSimilar(assetId, 5),
            this.Catalog.getAssetDetails(assetId),
        ]);

        let dateFormat = `M[/]D[/]YYYY h:mm:ss A`;
        let updatedAtFormat = this.moment(productInfo.Updated).format(dateFormat);
        let chartsMin30 = this.moment().subtract(30, 'days').unix() * 1000;
        let chartsMin90 = this.moment().subtract(90, 'days').unix() * 1000;
        let chartsMin180 = this.moment().subtract(180, 'days').unix() * 1000;


        const data: any = {
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
                }
            }),
            // @ts-ignore
            category: model.Catalog.AssetTypes[productInfo.AssetTypeId],
            genres: details.genres,
            isCollectible: false,
            isCollectibleUnique: productInfo.IsLimitedUnique,
            isForSale: productInfo.IsForSale || productInfo.IsPublicDomain,
        }


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
                ]
            })
            data.charts.volume = resaleData.volumeDataPoints.map(val => {
                return [
                    this.moment(val.date).unix() * 1000,
                    val.value,
                ]
            })


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
    }

    @Get('/User.aspx')
    @Summary('User profile page')
    @Render('pages/user.ejs')
    @Use(middleware.Auth.AuthenticateRequest)
    public async profile(
        @QueryParams('ID', Number) userId: number,
    ) {
        let [robloxUserData, friends] = await Promise.all([
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
    }
}