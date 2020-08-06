import { Controller, Get, QueryParams, Res, PathParams } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';

@Controller('/users')
export class UsersController extends base {

    @Get('/:userId/profile-info')
    public async scrapeProfileInfo(
        @PathParams('userId', Number) userId: number,
    ) {
        const profile = await this.Users.getUserProfileHtml(userId);
        let data = this.Users.processUserProfileHtml(profile);
        return data;
    }
}