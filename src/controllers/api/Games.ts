import { Controller, Get, QueryParams, Res, PathParams } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';

@Controller('/games')
export class GamesController extends base {

    @Get('/users/:userId/:accessFilter')
    public getGamesByUser(
        @PathParams('userId', Number) userId: number,
        @PathParams('accessFilter', String) accessFilter: string,
        @QueryParams('cursor', String) cursor: string,
    ) {
        if (!cursor) {
            cursor = '';
        }
        if (accessFilter !== 'Public') {
            accessFilter = 'Public';
        }
        return this.Games.getGamesByUser(userId, accessFilter as any, cursor);
    }
}