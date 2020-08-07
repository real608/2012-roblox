import base from './base';

export default class AccountSettingsService extends base {
    /**
     * Get email for the authenticated user
     * @param type 
     */
    public getEmail(): Promise<{ emailAddress: string; verified: boolean; }> {
        return this.get('https://accountsettings.roblox.com/v1/email');
    }
}