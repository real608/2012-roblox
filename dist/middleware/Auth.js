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
exports.YesAuth = exports.NoAuth = exports.AuthenticateRequest = void 0;
const common_1 = require("@tsed/common");
const base_1 = require("./base");
let AuthenticateRequest = class AuthenticateRequest extends base_1.default {
    use(res, cookie) {
        return __awaiter(this, void 0, void 0, function* () {
            let start = new Date().getTime();
            if (!cookie) {
                return;
            }
            const decrypted = this.Cookie.decrypt(cookie);
            // construct a new base with the cookie for methods requiring auth
            const s = new base_1.default({
                cookie: decrypted,
            });
            //  const userInfo = await s.Users.getAuthenticatedUserInfo();
            const [userInfo, friendRequests, unreadMessages] = yield Promise.all([
                s.Users.getAuthenticatedUserInfo(),
                // s.Economy.getBalance(userInfo.id),
                s.Friends.countAuthenticatedUserFriendRequests(),
                s.PrivateMessages.countUnreadMessages()
            ]);
            const balance = yield s.Economy.getBalance(userInfo.id);
            const session = {
                userId: userInfo.id,
                username: userInfo.name,
                robux: balance.robux,
                friendRequests: friendRequests.count,
                messages: unreadMessages.count,
            };
            let end = new Date().getTime();
            let timeTookInMs = end - start;
            res.locals.userInfo = session;
            res.locals.cookie = decrypted;
        });
    }
};
__decorate([
    __param(0, common_1.Res()),
    __param(1, common_1.Cookies('rblxcookie')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], AuthenticateRequest.prototype, "use", null);
AuthenticateRequest = __decorate([
    common_1.Middleware()
], AuthenticateRequest);
exports.AuthenticateRequest = AuthenticateRequest;
/**
 * Require user to be unauthenticated to use a route
 */
let NoAuth = class NoAuth extends base_1.default {
    use(info) {
        if (!info) {
            return;
        }
        throw new this.Conflict('LogoutRequired');
    }
};
__decorate([
    __param(0, common_1.Locals('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NoAuth.prototype, "use", null);
NoAuth = __decorate([
    common_1.Middleware()
], NoAuth);
exports.NoAuth = NoAuth;
/**
 * Require authentication to use a route
 */
let YesAuth = class YesAuth extends base_1.default {
    use(info) {
        if (!info) {
            throw new this.Conflict('LoginRequired');
        }
    }
};
__decorate([
    __param(0, common_1.Locals('userInfo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], YesAuth.prototype, "use", null);
YesAuth = __decorate([
    common_1.Middleware()
], YesAuth);
exports.YesAuth = YesAuth;
//# sourceMappingURL=Auth.js.map