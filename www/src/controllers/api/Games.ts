import { Controller, Get, QueryParams, Res, PathParams, Req, BodyParams, Post } from '@tsed/common';
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
        return this.Games.getGamesByUser(userId, accessFilter as any, cursor).then(games => {
            if (games.data.length === 0) {
                return [];
            }
            return this.Games.multiGetGameInfo(games.data.map(val => { return val.id }))
        });
    }

    @Post('/search')
    @Summary('Search through games')
    public searchGames(
        @BodyParams() body: any,
    ) {
        let str = '';
        for (const key of Object.getOwnPropertyNames(body)) {
            str += encodeURIComponent('model.' + key) + '=' + encodeURIComponent(body[key]) + '&';
        }
        str = str.slice(0, str.length - 1);
        return this.Games.search(str).then(d => {
            if (d.games.length === 0) {
                return d;
            }
            return this.Games.multiGetGameInfo(d.games.map((val: any) => {
                return val.universeId;
            })).then(extraInfo => {
                for (const game of extraInfo) {
                    for (const otherGame of d.games) {
                        if (otherGame.universeId === game.id) {
                            for (const key of Object.getOwnPropertyNames(game)) {
                                // @ts-ignore
                                otherGame[key] = game[key];
                            }
                            continue;
                        }
                    }
                }
                return d;
            })
        });
    }
}