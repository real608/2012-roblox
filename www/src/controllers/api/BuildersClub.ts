import { Controller, Get, QueryParams, Res, Use, Head, Header, Locals, PathParams } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';
import * as middleware from '../../middleware';

@Controller('/builders-club')
export class BuildersClubController extends base {

    @Get('/metadata')
    @Summary('Get builders club metadata')
    public metadata() {
        return {
            isEnabled: false,
            isBcEnabled: false,
            isTbcEnabled: false,
            isObcEnabled: false,
        }
    }

    @Get('/users/:userId/redirect-to-icon')
    @Summary('Redirect to the bc image icon for the {userId}')
    public async redirectToIcon(
        @PathParams('userId', Number) userId: number,
        @Res() res: Res,
    ) {
        const status = await this.BuildersClub.getType(userId);
        if (status === 'BC') {
            res.redirect(302, '/img/overlay_bcOnly.png');
        } else if (status === 'TBC') {
            res.redirect(302, '/img/overlay_tbcOnly.png');
        } else if (status === 'OBC') {
            res.redirect(302, '/img/overlay_obcOnly.png');
        } else {
            res.redirect(302, '/img/empty.png');
        }
    }

    @Get('/membership')
    @Summary('Get current membership info for the authenticated user')
    @Use(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth)
    public async getMembership(
        @Locals('cookie') cookie: string,
        @Locals('userInfo') userInfo: { userId: number },
    ) {
        const s = new base({ cookie });
        return s.BuildersClub.getSubscription(userInfo.userId);
    }

}