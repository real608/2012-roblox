import base from './base';

export default class BadgesService extends base {

    public getUserBadges(userId: number, cursor: string = ''): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        data: {
            id: number;
            name: string;
            description: string;
            enabled: boolean;
            iconImageId: number;
            displayIconImageId: number;
            awarder: {
                id: number;
                type: 'Place';
            };
            statistics: {
                pastDayAwardedCount: number;
                awardCount: number;
                winRatePercentage: number;
            };
            created: string;
        }[];
    }> {
        return this.get('https://badges.roblox.com/v1/users/' + userId + '/badges?limit=25&sortOrder=Asc&cursor=' + encodeURIComponent(cursor));
    }

}