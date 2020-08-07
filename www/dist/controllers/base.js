"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPExceptions_1 = require("../helpers/HTTPExceptions");
const moment = require("moment");
const Cookie_1 = require("../services/Cookie");
const Users_1 = require("../services/Users");
const Economy_1 = require("../services/Economy");
const Friends_1 = require("../services/Friends");
const PrivateMessages_1 = require("../services/PrivateMessages");
const Ads_1 = require("../services/Ads");
const Auth_1 = require("../services/Auth");
const Captcha_1 = require("../services/Captcha");
const Catalog_1 = require("../services/Catalog");
const Thumbnails_1 = require("../services/Thumbnails");
const Games_1 = require("../services/Games");
const Inventory_1 = require("../services/Inventory");
const Badges_1 = require("../services/Badges");
const AccountSettings_1 = require("../services/AccountSettings");
const AccountInformation_1 = require("../services/AccountInformation");
const BuildersClub_1 = require("../services/BuildersClub");
const Presence_1 = require("../services/Presence");
class base extends HTTPExceptions_1.default {
    constructor(extraData) {
        super();
        this.moment = moment;
        this.Cookie = new Cookie_1.default(extraData);
        this.Users = new Users_1.default(extraData);
        this.Economy = new Economy_1.default(extraData);
        this.Friends = new Friends_1.default(extraData);
        this.PrivateMessages = new PrivateMessages_1.default(extraData);
        this.Ads = new Ads_1.default(extraData);
        this.Auth = new Auth_1.default(extraData);
        this.Captcha = new Captcha_1.default(extraData);
        this.Catalog = new Catalog_1.default(extraData);
        this.Thumbnails = new Thumbnails_1.default(extraData);
        this.Games = new Games_1.default(extraData);
        this.Inventory = new Inventory_1.default(extraData);
        this.Badges = new Badges_1.default(extraData);
        this.AccountSettings = new AccountSettings_1.default(extraData);
        this.AccountInformation = new AccountInformation_1.default(extraData);
        this.BuildersClub = new BuildersClub_1.default(extraData);
        this.Presence = new Presence_1.default(extraData);
    }
}
exports.default = base;
//# sourceMappingURL=base.js.map