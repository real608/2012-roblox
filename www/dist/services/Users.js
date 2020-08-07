"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const _ = require("lodash");
class UsersService extends base_1.default {
    getAuthenticatedUserInfo() {
        return this.get('https://users.roblox.com/v1/users/authenticated');
    }
    getUserInfo(userId) {
        return this.get('https://users.roblox.com/v1/users/' + userId);
    }
    getUserProfileHtml(userId) {
        return this.get('https://www.roblox.com/users/' + userId + '/profile');
    }
    processUserProfileHtml(html) {
        let robloxBadges = [];
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
        };
    }
}
exports.default = UsersService;
//# sourceMappingURL=Users.js.map