import { Controller, Get, QueryParams, Res, Req } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';

@Controller('/Thumbnail')
export class ThumbnailController extends base {

    @Get('/User.ashx')
    @Summary('Redirect to the user thumbnail')
    public redirectToUserThumbnail(
        @Res() res: Res,
        @Req() req: Req,
    ) {
        console.log(res.locals);
        let idStr = req.query['id'] || req.query['userId'] || req.query['userid'] || req.query['UserID'] || req.query['USERID'] || req.query['ID'] || req.query['Id'];
        if (!idStr || typeof idStr !== 'string') {
            throw new this.BadRequest('NoIdSpecified');
        }
        let id = parseInt(idStr, 10);
        if (!Number.isInteger(id)) {
            throw new Error('InvalidId');
        }
        if (id === 1) {
            return res.redirect('/img/Roblox.png');
        }
        return res.redirect('https://www.roblox.com/Thumbs/Avatar.ashx?x=420&y=420&userid=' + id);
    }

    @Get('/Group.ashx')
    @Summary('Redirect to the group thumbnail')
    public async redirectToGroupThumbnail(
        @Res() res: Res,
        @Req() req: Req,
    ) {
        let idStr = req.query['id'] || req.query['groupId'] || req.query['groupid'] || req.query['GroupID'] || req.query['GROUPID'] || req.query['ID'] || req.query['Id'];
        if (!idStr || typeof idStr !== 'string') {
            throw new this.BadRequest('NoIdSpecified');
        }
        let id = parseInt(idStr, 10);
        if (!Number.isInteger(id)) {
            throw new Error('InvalidId');
        }
        const url = await this.Thumbnails.getGroupIcon(id);
        if (!url.url) {
            return res.redirect(302, '/img/pending.png');
        }
        return res.redirect(302, url.url);
    }
}