import base from './base';

export default class PrivateMessagesService extends base {
    public countUnreadMessages(): Promise<{count: number}> {
        return this.get('https://privatemessages.roblox.com/v1/messages/unread/count');
    }
}