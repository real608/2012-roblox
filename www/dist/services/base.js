"use strict";
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
const HTTPExceptions_1 = require("../helpers/HTTPExceptions");
const axios_1 = require("axios");
const Redis_1 = require("../helpers/Redis");
const CookieManager_1 = require("../helpers/CookieManager");
const Cookie = new CookieManager_1.default();
const cheerio = require("cheerio");
const path_1 = require("path");
let added = Cookie.readFromFileSync(path_1.join(__dirname, '../../../cookies.txt'));
console.log('[info] using', added, 'total cookies');
const AxiosSetup_1 = require("../helpers/AxiosSetup");
let client = axios_1.default.create();
client = AxiosSetup_1.default(client);
class ServicesBase extends HTTPExceptions_1.default {
    constructor(extraData) {
        super();
        this.axios = client;
        this.redis = Redis_1.default;
        this.cheerio = cheerio;
        if (extraData) {
            if (extraData.cookie) {
                this.axios = AxiosSetup_1.default(axios_1.default.create({
                    headers: {
                        'cookie': '.ROBLOSECURITY=' + extraData.cookie,
                    }
                }));
            }
        }
    }
    /**
     * Add a cookie to the request.
     * @decorator
     */
    static AddCookie() {
        return function (target, name, descriptor) {
            const original = descriptor.value;
            if (typeof original === 'function') {
                descriptor.value = function (...args) {
                    let using = '.ROBLOSECURITY=' + Cookie.get() + ';';
                    // @ts-ignore
                    this.get = (url) => __awaiter(this, void 0, void 0, function* () {
                        const request = yield axios_1.default.get(url, {
                            headers: {
                                cookie: using,
                            }
                        });
                        return request.data;
                    });
                    // @ts-ignore
                    this.axios = AxiosSetup_1.default(axios_1.default.create({
                        headers: {
                            cookie: using,
                        }
                    }));
                    return original.apply(this, args);
                };
            }
            return descriptor;
        };
    }
    get(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.axios.get(url)).data;
        });
    }
}
exports.default = ServicesBase;
//# sourceMappingURL=base.js.map