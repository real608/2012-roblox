import base from './base';

export default class FriendsService extends base {
    public countAuthenticatedUserFriendRequests(): Promise<{ count: number }> {
        return this.get('https://friends.roblox.com/v1/user/friend-requests/count')
    }

    public getFriends(userId: number): Promise<{ isOnline: boolean; isDeleted: boolean; name: string; id: number }[]> {
        return this.get('https://friends.roblox.com/v1/users/' + userId + '/friends').then(data => {
            return data.data;
        })
    }
}