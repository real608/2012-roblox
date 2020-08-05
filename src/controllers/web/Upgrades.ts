import { Controller, Get, QueryParams, Res, Render, PathParams, Required, UseBefore, Locals, Use } from '@tsed/common';
import { Summary, Description } from '@tsed/swagger'
import base from '../base';
import * as vm from '../../viewmodels';
import * as _ from 'lodash';
import * as middleware from '../../middleware';
import * as model from '../../models';

@Controller('/Upgrades')
@UseBefore(middleware.Auth.AuthenticateRequest)
export class UpgradesController extends base {

    @Get('/BuildersClubMemberships.aspx')
    @Summary('Builders club purchase')
    @Render('pages/upgrades/builders-club-memberships.ejs')
    public async buildersClubMemberships(
        @Locals('cookie') cookie: string,
    ) {
        const types = await this.BuildersClub.getMembershipTypes();
        return new vm.Default({
            bcTypes: types,
        }, {
            title: 'ROBLOX - Builders Club',
        });
    }
}