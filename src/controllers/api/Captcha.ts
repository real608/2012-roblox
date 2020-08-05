import { Controller, Get, QueryParams, Res } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';

@Controller('/captcha')
export class CaptchaController extends base {

    @Get('/metadata')
    @Summary('Get captcha metadata')
    public metadata() {
        return this.Captcha.metadata();
    }

}