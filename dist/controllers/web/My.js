"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.MyController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const vm = require("../../viewmodels");
const middleware = require("../../middleware");
let MyController = class MyController extends base_1.default {
    homepage() {
        return new vm.Default({});
    }
    settings(cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = new base_1.default({
                cookie,
            });
            const email = yield s.AccountSettings.getEmail();
            return new vm.Default({
                'email': email,
                currentYear: new Date().getFullYear(),
            });
        });
    }
};
__decorate([
    common_1.Get('/Home.aspx'),
    swagger_1.Summary('My Homepage'),
    common_1.Render('pages/my/home.ejs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MyController.prototype, "homepage", null);
__decorate([
    common_1.Get('/Account.aspx'),
    swagger_1.Summary('My Settings'),
    common_1.Render('pages/my/account.ejs'),
    __param(0, common_1.Locals('cookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MyController.prototype, "settings", null);
MyController = __decorate([
    common_1.Controller('/My'),
    common_1.UseBefore(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth)
], MyController);
exports.MyController = MyController;
//# sourceMappingURL=My.js.map