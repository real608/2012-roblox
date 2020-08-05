import base from './base';

/**
 * WWW Service, for legacy/misc APIs and web-scraping
 */
export default class WwwService extends base {

    /**
     * Info for the website banner
     */
    public getAlertInfo(): Promise<{ LinkText: string; LinkUrl: string; Text: string; IsVisible: boolean; }> {
        return this.get('https://api.roblox.com/alerts/alert-info');
    }
}