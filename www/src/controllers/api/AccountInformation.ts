import { Controller, Get, QueryParams, Res, UseBefore, Locals } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';
import * as middleware from '../../middleware/';

@Controller('/account-information')
@UseBefore(middleware.Auth.AuthenticateRequest, middleware.Auth.YesAuth)
export class AccountInformationController extends base {

    @Get('/current-account')
    @Summary('Get information required for account page')
    public async currentAccount(
        @Locals('cookie') cookie: string,
    ) {
        const s = new base({
            cookie,
        });
        const [birthDate, description, gender] = await Promise.all([
            s.AccountInformation.getBirthDate(),
            s.AccountInformation.getDescription(),
            s.AccountInformation.getGender(),
        ]);
        return {
            birthDate,
            description,
            gender,
        };
    }

}