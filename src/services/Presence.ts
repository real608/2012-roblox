import base from './base';

export default class PresenceService extends base {

    @base.AddCookie()
    public multiGetPresence(userIds: number[]): Promise<{
        userPresenceType: 0 | 1 | 2 | 3;
        lastLocation: 'Website' | 'Game' | 'Studio';
        userId: number;
        lastOnline: string;
    }[]> {
        return this.axios.post('https://presence.roblox.com/v1/presence/users', {
            userIds,
        }).then(d => {
            return d.data.userPresences;
        });
    }

}