import base from "../base";
import { Summary } from "@tsed/swagger";
import { Get, PathParams, Controller, Required, Res, QueryParams } from "@tsed/common";

@Controller('/')
export class DefaultNoAuthController extends base {

    @Get('/user-sponsorship/:id')
    @Summary('Roblox IFrame ads page')
    public adPage(
        @PathParams('id', Number) id: number,
    ) {
        return this.Ads.getSponsorshipHtml(id).then(data => {
            return data.replace('https://www.roblox.com', '');
        })
    }

    @Get('/userads/redirect')
    @Summary('Roblox IFrame ads page')
    public async userAdsRedirect(
        @Required()
        @QueryParams('data', String) data: string,
        @Res() res: Res,
    ) {
        let url = await this.Ads.getRedirectUrl(data);
        if (url.indexOf('?ID=')) {
            let assetId = url.slice(url.indexOf('?ID=')).slice('?ID='.length);
            return res.redirect(302, '/Item.aspx?ID=' + assetId);
        } else if (url.indexOf('/groups/')) {
            let groupId = url.slice(url.indexOf('/groups/')).slice('/groups/'.length);
            return res.redirect(302, '/Groups/Group.aspx?ID=' + groupId);
        }
        res.redirect(302, url);
    }
}