import base from './base';

export default class GamesService extends base {

    public getGamesByUser(userId: number, accessFilter: 'Public' | 'Private' | 'All', cursor: string = ''): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        data: {
            id: number;
            name: string;
            description: string;
            rootPlace: {
                id: number;
                type: 'Place';
            };
            created: string;
            updated: string;
        }[];
    }> {
        return this.get('https://games.roblox.com/v2/users/' + userId + '/games?accessFilter=' + accessFilter + '&sortOrder=Asc&limit=100&cursor=' + encodeURIComponent(cursor));
    }

}