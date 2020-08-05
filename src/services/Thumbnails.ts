import base from './base';

export default class ThumbnailsService extends base {
    public getGroupIcon(groupId: number): Promise<{ url: string | null; }> {
        return this.get('https://thumbnails.roblox.com/v1/groups/icons?groupIds=' + groupId + '&size=420x420&format=Png&isCircular=false').then(d => {
            return {
                url: d.imageUrl,
            }
        });
    }
}