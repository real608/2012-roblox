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

    public multiGetGameInfo(universeIds: number[]): Promise<{
        id: number;
        rootPlaceId: number;
        name: string;
        description: string;
        creator: {
            id: number;
            name: string;
            type: 'User' | 'Group';
        };
        price: number | null;
        allowedGearGenres: string[];
        allowedGearCategories: string[];
        playing: number;
        visits: number;
        maxPlayers: number;
        created: string;
        updated: string;
        genre: string;
    }[]> {
        return this.get('https://games.roblox.com/v1/games?universeIds=' + encodeURIComponent(universeIds.join(','))).then(d => {
            return d.data;
        })
    }

    public search(params: string) {
        return this.get(`https://games.roblox.com/v1/games/list?${params}`);
    }

    @base.AddCookie()
    public async getPlaceInfo(placeId: number): Promise<{ universeId: number; isPlayable: boolean; reasonProhibited: string; }> {
        let univData = (await this.get('https://games.roblox.com/v1/games/multiget-place-details?placeIds=' + placeId))[0]
        return univData;
    }

}