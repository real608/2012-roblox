"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
class AccountInformationService extends base_1.default {
    getBirthDate() {
        return this.get('https://accountinformation.roblox.com/v1/birthdate');
    }
    getDescription() {
        return this.get('https://accountinformation.roblox.com/v1/description').then(d => {
            return d.description;
        });
    }
    getGender() {
        return this.get('https://accountinformation.roblox.com/v1/gender').then(d => {
            return d.gender;
        });
    }
}
exports.default = AccountInformationService;
//# sourceMappingURL=AccountInformation.js.map