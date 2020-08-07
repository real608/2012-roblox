import { Middleware, HeaderParams, Cookies, Res } from "@tsed/common";
import { randomBytes } from 'crypto';
const csrfCookieName = 'csrf';
import config from '../helpers/Config';
import * as jwt from 'jsonwebtoken';

const makeCsrfCookie = (res: Res) => {
    const str = randomBytes(8).toString('hex');
    const token = jwt.sign({
        csrf: str,
    }, config.csrfKey)
    res.cookie(csrfCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    })
    return str;
}

import base from './base';

@Middleware()
export default class extends base {
    public makeTokenAndThrow(res: Res) {
        let token = makeCsrfCookie(res);
        res.set('x-csrf-token', token);
        throw new this.Unauthorized('TokenValidationFailed');
    }
    public use(
        @HeaderParams('x-csrf-token', String) csrf: string,
        @Cookies('csrf') csrfCookie: string,
        @Res() res: Res,
    ) {
        if (!csrfCookie) {
            return this.makeTokenAndThrow(res);
        }
        let decoded;
        try {
            decoded = jwt.verify(csrfCookie, config.csrfKey) as { iat: number; csrf: string };
        } catch (err) {
            return this.makeTokenAndThrow(res);
        }
        let current = new Date().getTime() / 1000;
        let expiresAt = decoded.iat + 300;
        if (expiresAt < current) {
            console.log('token is expired');
            // re-create token
            return this.makeTokenAndThrow(res);
        }
        if (decoded.csrf !== csrf) {
            console.log(decoded.csrf, 'does not match', csrf);
            res.set('x-csrf-token', decoded.csrf);
            throw new this.Unauthorized('TokenValidationFailed');
        }
        // OK to go
    }
}