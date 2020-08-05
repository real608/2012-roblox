import base from './base';

export default class AccountInformationService extends base {

    public getBirthDate(): Promise<{ birthMonth: number; birthYear: number; birthDay: number }> {
        return this.get('https://accountinformation.roblox.com/v1/birthdate');
    }

    public getDescription(): Promise<string> {
        return this.get('https://accountinformation.roblox.com/v1/description').then(d => {
            return d.description;
        });
    }

    public getGender(): Promise<number> {
        return this.get('https://accountinformation.roblox.com/v1/gender').then(d => {
            return d.gender;
        })
    }
}