class AlertViewModel {
    public LinkText: string;
    public LinkUrl: string;
    public Text: string;
    public IsVisible: boolean;
}
let defaultAlertViewModel = new AlertViewModel();
defaultAlertViewModel.LinkText = '';
defaultAlertViewModel.LinkUrl = '';
defaultAlertViewModel.Text = '';
defaultAlertViewModel.IsVisible = false;

import WwwService from '../services/www';
const WWW = new WwwService();
setInterval(async () => {
    defaultAlertViewModel = await WWW.getAlertInfo();
}, 60 * 1000);

export class Default<T = any> {
    public title?: string = 'Free Games at ROBLOX.com'
    public description?: string = 'User-generated MMO gaming site for kids, teens, and adults. Players architect their own worlds. Builders create free online games that simulate the real world. Create and play amazing 3D games. An online gaming cloud and distributed physics engine.'
    public url?: string | false = false;
    public image?: string | false = false;
    public keywords?: string = 'free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine';
    public page: T;
    public alert?: AlertViewModel = defaultAlertViewModel;

    constructor(data: T, extra?: Partial<Default<T>>) {
        this.page = data;
        if (extra) {
            for (const key of Object.getOwnPropertyNames(extra)) {
                // @ts-ignore
                this[key] = extra[key];
            }
        }
    }
}