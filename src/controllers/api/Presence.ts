import { Controller, Get, QueryParams, Res, PathParams, Post, BodyParams, Required } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';

@Controller('/presence')
export class PresenceController extends base {

    @Post('/users/multi-get')
    public async multiGetPresenceInfo(
        @Required()
        @BodyParams('userIds') userIds: number[],
    ) {
        return this.Presence.multiGetPresence(userIds);
    }
}