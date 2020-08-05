import HTTPExceptions from '../helpers/HTTPExceptions';
import axios from 'axios';
import { IExtraData } from 'src/models/internal/base';
import redis from '../helpers/Redis';
const client = axios.create();
import CookieManager from '../helpers/CookieManager';
const Cookie = new CookieManager();
import { join } from 'path';
let added = Cookie.readFromFileSync(join(__dirname, '../../cookies.txt'));
console.log('[info] using', added, 'total cookies');

import AxiosSetup from '../helpers/AxiosSetup';
AxiosSetup(client);

export default class ServicesBase extends HTTPExceptions {
    public axios = client;
    public redis = redis;

    /**
     * Add a cookie to the request.
     * @decorator
     */
    public static AddCookie() {
        return function (target: any, name: any, descriptor: PropertyDescriptor) {
            const original = descriptor.value;
            if (typeof original === 'function') {
                descriptor.value = function (...args: any[]) {
                    // @ts-ignore
                    this.get = async (url) => {
                        let using = '.ROBLOSECURITY=' + Cookie.get() + ';';
                        const request = await axios.get(url, {
                            headers: {
                                cookie: using,
                            }
                        });
                        return request.data;
                    }
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
                this.axios = axios.create({
                    headers: {
                        'cookie': '.ROBLOSECURITY=' + extraData.cookie,
                    }
                })
            }
        }
    }
}