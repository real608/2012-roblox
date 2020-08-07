import HTTPExceptions from '../helpers/HTTPExceptions';
import axios from 'axios';
import { IExtraData } from 'src/models/internal/base';
import redis from '../helpers/Redis';
import CookieManager from '../helpers/CookieManager';
const Cookie = new CookieManager();
import * as cheerio from 'cheerio';
import { join } from 'path';
let added = Cookie.readFromFileSync(join(__dirname, '../../../cookies.txt'));
console.log('[info] using', added, 'total cookies');

import AxiosSetup from '../helpers/AxiosSetup';
let client = axios.create();
client = AxiosSetup(client);

export default class ServicesBase extends HTTPExceptions {
    public axios = client;
    public redis = redis;
    public cheerio = cheerio;

    /**
     * Add a cookie to the request.
     * @decorator
     */
    public static AddCookie() {
        return function (target: any, name: any, descriptor: PropertyDescriptor) {
            const original = descriptor.value;
            if (typeof original === 'function') {
                descriptor.value = function (...args: any[]) {
                    let using = '.ROBLOSECURITY=' + Cookie.get() + ';';
                    // @ts-ignore
                    this.get = async (url) => {
                        const request = await axios.get(url, {
                            headers: {
                                cookie: using,
                            }
                        });
                        return request.data;
                    }
                    // @ts-ignore
                    this.axios = AxiosSetup(axios.create({
                        headers: {
                            cookie: using,
                        }
                    }));
                    return original.apply(this, args);
                }
            }
            return descriptor;
        };
    }

    public async get<T = any>(url: string): Promise<T> {
        return (await this.axios.get(url)).data;
    }

    constructor(extraData?: Partial<IExtraData>) {
        super();

        if (extraData) {
            if (extraData.cookie) {
                this.axios = AxiosSetup(axios.create({
                    headers: {
                        'cookie': '.ROBLOSECURITY=' + extraData.cookie,
                    }
                }));
            }
        }
    }
}