import { Controller, Get, QueryParams, Res, BodyParams, Required, Post, Use } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';
import * as model from '../../models/index';
import * as middleware from '../../middleware';

@Controller('/auth')
export class AuthController extends base {

    @Post('/signup')
    @Summary('Signup a new user and set the roblosecurity cookie')
    @Use(middleware.csrf, middleware.Auth.NoAuth)
    public async signup(
        @BodyParams(model.Auth.SignupRequest) body: model.Auth.SignupRequest,
        @Res() res: Res,
    ) {
        const results = await this.Auth.signup(
            body.username,
            body.password,
            body.gender,
            body.birthday,
            body.captcha,
            true,
        );
        const encrypted = this.Cookie.encrypt(results.cookie);
        res.cookie('rblxcookie', encrypted, {
            maxAge: 86400 * 30 * 12 * 10 * 1000,
            httpOnly: true,
        })
        return {
            userId: results.userId,
            username: body.username,
        }
    }

    @Post('/login/cookie')
    @Summary('Construct a cookie based off the provided {robloSecurity}')
    @Use(middleware.csrf, middleware.Auth.NoAuth)
    public async loginCookie(
        @Required()
        @BodyParams('cookie', String) cookie: string,
        @Res() res: Res,
    ) {
        if (cookie.indexOf('.ROBLOSECURITY=') !== -1) {
            cookie = cookie.replace('.ROBLOSECURITY=', '');
        }
        if (!cookie.match(/;$/g)) {
            cookie = cookie + ';'
        }
        const encrypted = this.Cookie.encrypt(cookie);
        res.cookie('rblxcookie', encrypted, {
            maxAge: 86400 * 30 * 12 * 10 * 1000,
            httpOnly: true,
        })
        return {}
    }

    @Post('/usernames/recover')
    @Summary('Send a username reminder email')
    @Use(middleware.Auth.AuthenticateRequest, middleware.csrf, middleware.Auth.NoAuth)
    public async recoverUsernames(
        @Required()
        @BodyParams('email', String) email: string,
    ) {
        return this.Auth.usernameRecovery(email);
    }

    @Post('/password/reset/send')
    @Summary('Send a password reset email')
    @Use(middleware.Auth.AuthenticateRequest, middleware.csrf, middleware.Auth.NoAuth)
    public async sendPasswordResetEmail(
        @Required()
        @BodyParams('email', String) email: string,
        @Required()
        @BodyParams('captcha', String) captcha: string,
    ) {
        return this.Auth.requestPasswordReset(email, captcha);
    }
}