import base from './base';

/**
 * Roblox captcha service
 */
export default class CaptchaService extends base {
    public metadata(): Promise<{ funCaptchaPublicKeys: { type: string; value: string }[] }> {
        return this.get('https://captcha.roblox.com/v1/captcha/metadata');
    }
}