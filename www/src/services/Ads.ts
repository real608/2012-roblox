import base from './base';

export default class AdsService extends base {
    /**
     * Get roblox user sponsorship html
     * @param type 
     */
    public getSponsorshipHtml(type: number): Promise<string> {
        return this.get('https://www.roblox.com/user-sponsorship/' + type);
    }

    /**
     * Get the {redirectUrl} for an ad
     * @param data 
     */
    public getRedirectUrl(data: string): Promise<string> {
        return this.axios.get('https://www.roblox.com/userads/redirect?data=' + encodeURIComponent(data), {
            validateStatus: (num) => {
                return num === 302;
            },
            maxRedirects: 0,
        }).then(d => {
            const head = d.headers['location'];
            if (!head) {
                throw new Error('No 302 redirect location specified');
            }
            console.log('location', head);
            return head;
        });
    }
}