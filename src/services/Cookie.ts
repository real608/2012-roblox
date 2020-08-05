import base from './base';
const Cryptr = require('cryptr');
import config from '../helpers/Config';
const encryptionService = new Cryptr(config.cookiesKey);

export default class CookieService extends base {
    /**
     * Encrypt a cookie string
     * @param cookieString 
     */
    public encrypt(cookieString: string): string {
        return encryptionService.encrypt(cookieString);
    }
    /**
     * Decrypt a cookie string
     * @param cookieString 
     */
    public decrypt(cookieString: string): string {
        return encryptionService.decrypt(cookieString);
    }
}