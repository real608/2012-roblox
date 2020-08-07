import { Middleware, Cookies, Res, Locals } from "@tsed/common";
import base from './base';

@Middleware()
export class AuthenticateRequest extends base {
    public async use(
        @Res() res: Res,
        @Cookies('rblxcookie') cookie?: string
    ) {
        let start = new Date().getTime();
        if (!cookie) {
            return;
        }
        const decrypted = this.Cookie.decrypt(cookie);
        // construct a new base with the cookie for methods requiring auth
        const s = new base({
            cookie: decrypted,
        });
        //  const userInfo = await s.Users.getAuthenticatedUserInfo();
        const [userInfo, friendRequests, unreadMessages] = await Promise.all([
            s.Users.getAuthenticatedUserInfo(),
            // s.Economy.getBalance(userInfo.id),
            s.Friends.countAuthenticatedUserFriendRequests(),
            s.PrivateMessages.countUnreadMessages()
        ]);
        const balance = await s.Economy.getBalance(userInfo.id);
        const session = {
            userId: userInfo.id,
            username: userInfo.name,
            robux: balance.robux,
            friendRequests: friendRequests.count,
            messages: unreadMessages.count,
        }
        let end = new Date().getTime();
        let timeTookInMs = end - start;
        res.locals.userInfo = session;
        res.locals.cookie = decrypted;
    }
}

/**
 * Require user to be unauthenticated to use a route
 */
@Middleware()
export class NoAuth extends base {
    public use(
        @Locals('userInfo') info: any,
    ) {
        if (!info) {
            return;
        }
        throw new this.Conflict('LogoutRequired');
    }
}

/**
 * Require authentication to use a route
 */
@Middleware()
export class YesAuth extends base {
    public use(
        @Locals('userInfo') info: any,
    ) {
        if (!info) {
            throw new this.Conflict('LoginRequired');
        }
    }
}