import base from './base';
import * as _ from 'lodash';

export default class UsersService extends base {
    public getAuthenticatedUserInfo(): Promise<{ id: number; name: string; }> {
        return this.get('https://users.roblox.com/v1/users/authenticated');
    }

    public getUserInfo(userId: number): Promise<{ id: number; name: string; isBanned: boolean; description: string; created: string; }> {
        return this.get('https://users.roblox.com/v1/users/' + userId);
    }

    public getUserProfileHtml(userId: number): Promise<string> {
        return this.get('https://www.roblox.com/users/' + userId + '/profile');
    }

    public processUserProfileHtml(html: string): {
        robloxBadges: string[][];
        placeVisits: number;
    } {
        let robloxBadges: string[] = [];
        let $ = this.cheerio.load(html);

        let allBadges = $('.rbx-roblox-badge');
        allBadges.each(function (index, el) {
            let title = $(el).find('a').attr('title');
            if (title) {
                robloxBadges.push(title);
            }
        });
        let placeVisits = $(".text-label:contains('Place Visits')").parent().find('.text-lead:nth-child(2)');
        // console.log('visits', placeVisits);
        return {
            robloxBadges: _.chunk(robloxBadges.filter(val => {
                return !['Welcome To The Club', 'Official Model Maker'].includes(val);
            }), 4),
            placeVisits: parseInt(placeVisits.text().replace(/,/g, ''), 10),
        }
    }
}