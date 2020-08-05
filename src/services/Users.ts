import base from './base';

export default class UsersService extends base {
    public getAuthenticatedUserInfo(): Promise<{ id: number; name: string; }> {
        return this.get('https://users.roblox.com/v1/users/authenticated');
    }

    public getUserInfo(userId: number): Promise<{ id: number; name: string; isBanned: boolean; description: string; created: string; }> {
        return this.get('https://users.roblox.com/v1/users/' + userId);
    }
}