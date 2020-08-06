"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
class AlertViewModel {
}
let defaultAlertViewModel = new AlertViewModel();
defaultAlertViewModel.LinkText = '';
defaultAlertViewModel.LinkUrl = '';
defaultAlertViewModel.Text = '';
defaultAlertViewModel.IsVisible = false;
const www_1 = require("../services/www");
const WWW = new www_1.default();
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    defaultAlertViewModel = yield WWW.getAlertInfo();
}), 60 * 1000);
class Default {
    constructor(data, extra) {
        this.title = 'Free Games at ROBLOX.com';
        this.description = 'User-generated MMO gaming site for kids, teens, and adults. Players architect their own worlds. Builders create free online games that simulate the real world. Create and play amazing 3D games. An online gaming cloud and distributed physics engine.';
        this.url = false;
        this.image = false;
        this.keywords = 'free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine';
        this.alert = defaultAlertViewModel;
        this.page = data;
        if (extra) {
            for (const key of Object.getOwnPropertyNames(extra)) {
                // @ts-ignore
                this[key] = extra[key];
            }
        }
    }
}
exports.Default = Default;
//# sourceMappingURL=index.js.map