import base from './base';

/**
 * Roblox auth service
 */
export default class AuthService extends base {
    public async signup(
        username: string,
        password: string,
        gender: 2 | 3,
        /**
         * Seems to accept any date formats
         * @example 02 Jan 2016
         */
        birthday: string,
        /**
         * Fun captcha token
         */
        captcha: string,
        isTosAggreementBoxChecked: boolean = false,
    ): Promise<{ userId: number; starterPlaceId: number; cookie: string }> {
        // {"username":"wgawag","password":"hwawahwah","birthday":"02 Jan 2016","gender":3,"isTosAgreementBoxChecked":true,"context":"MultiverseSignupForm","displayAvatarV2":false,"displayContextV2":false}
        const request = await this.axios.post('https://auth.roblox.com/v2/signup', {
            username,
            password,
            gender,
            birthday,
            isTosAggreementBoxChecked,
            captchaProvider: 'PROVIDER_ARKOSELABS',
            captchaToken: captcha,
            // this seems to be for analytics and probably isn't required
            context: 'MultiverseSignupForm',
            displayAvatarV2: false,
            displayContextV2: false,
        });
        let cookieHeader = request.headers['cookie'];
        if (!cookieHeader || typeof cookieHeader !== 'string') {
            throw new this.Conflict('NoCookieHeader');
        }
        let robloSecurity = cookieHeader.match(/\.ROBLOSECURITY=(.+?)(;|$)/g);
        if (!robloSecurity || robloSecurity && !robloSecurity[0]) {
            throw new this.Conflict('NoRobloSecurityInCookies');
        }
        robloSecurity[0] = robloSecurity[0].replace('.ROBLOSECURITY=', '').replace(/;$/g, '');
        return {
            cookie: robloSecurity[0],
            userId: request.data.userId,
            starterPlaceId: request.data.starterPlaceId,
        };
    }

    public async usernameRecovery(email: string): Promise<{}> {
        await this.axios.post('https://auth.roblox.com/v2/usernames/recover', {
            "targetType": "Email",
            "target": email
        });
        return {};
    }

    public async requestPasswordReset(email: string, captcha: string): Promise<{}> {
        await this.axios.post('https://auth.roblox.com/v2/passwords/reset/send', {
            "targetType": "Email",
            "target": email,
            "captchaToken": captcha,
            "captchaProvider": "PROVIDER_ARKOSELABS"
        })
        return {};
    }
}