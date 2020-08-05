import { Controller, Get, QueryParams, Res, Render, PathParams, Required, UseBefore, Locals, Use } from '@tsed/common';
import { Summary, Description } from '@tsed/swagger'
import base from '../base';
import * as vm from '../../viewmodels';
import * as _ from 'lodash';
import * as middleware from '../../middleware';
import * as model from '../../models';

@Controller('/My')
@UseBefore(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth)
export class MyController extends base {

    @Get('/Home.aspx')
    @Summary('My Homepage')
    @Render('pages/my/home.ejs')
    public homepage() {
        return new vm.Default({

        });
    }

    @Get('/Account.aspx')
    @Summary('My Settings')
    @Render('pages/my/account.ejs')
    public async settings(
        @Locals('cookie') cookie: string,
    ) {
        const s = new base({
            cookie,
        });
        const email = await s.AccountSettings.getEmail();
        return new vm.Default({
            'email': email,
            currentYear: new Date().getFullYear(),
        });
    }
}