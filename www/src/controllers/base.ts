import HTTPExceptions from '../helpers/HTTPExceptions';
import { IExtraData } from 'src/models/internal/base';
import * as moment from 'moment';

import Cookie from '../services/Cookie';
import Users from '../services/Users';
import Economy from '../services/Economy';
import Friends from '../services/Friends';
import PrivateMessages from '../services/PrivateMessages';
import AdsService from '../services/Ads';
import AuthService from '../services/Auth';
import CaptchaService from '../services/Captcha';
import CatalogService from '../services/Catalog';
import ThumbnailsService from '../services/Thumbnails';
import GamesService from '../services/Games';
import InventoryService from '../services/Inventory';
import BadgesService from '../services/Badges';
import AccountSettingsService from '../services/AccountSettings';
import AccountInformationService from '../services/AccountInformation';
import BuildersClubService from '../services/BuildersClub';
import PresenceService from '../services/Presence';

export default class base extends HTTPExceptions {
    public moment: typeof moment;
    public Cookie: Cookie;
    public Users: Users;
    public Economy: Economy;
    public Friends: Friends;
    public PrivateMessages: PrivateMessages;
    public Ads: AdsService;
    public Auth: AuthService;
    public Captcha: CaptchaService;
    public Catalog: CatalogService;
    public Thumbnails: ThumbnailsService;
    public Games: GamesService;
    public Inventory: InventoryService;
    public Badges: BadgesService;
    public AccountSettings: AccountSettingsService;
    public AccountInformation: AccountInformationService;
    public BuildersClub: BuildersClubService;
    public Presence: PresenceService;
    constructor(extraData?: IExtraData) {
        super();
        this.moment = moment;
        this.Cookie = new Cookie(extraData);
        this.Users = new Users(extraData);
        this.Economy = new Economy(extraData);
        this.Friends = new Friends(extraData);
        this.PrivateMessages = new PrivateMessages(extraData);
        this.Ads = new AdsService(extraData);
        this.Auth = new AuthService(extraData);
        this.Captcha = new CaptchaService(extraData);
        this.Catalog = new CatalogService(extraData);
        this.Thumbnails = new ThumbnailsService(extraData);
        this.Games = new GamesService(extraData);
        this.Inventory = new InventoryService(extraData);
        this.Badges = new BadgesService(extraData);
        this.AccountSettings = new AccountSettingsService(extraData);
        this.AccountInformation = new AccountInformationService(extraData);
        this.BuildersClub = new BuildersClubService(extraData);
        this.Presence = new PresenceService(extraData);
    }
}