import { Controller, Get, QueryParams, Res, Render, PathParams, Required, UseBefore, Locals, Use } from '@tsed/common';
import { Summary, Description } from '@tsed/swagger'
import base from '../base';
import * as vm from '../../viewmodels';
import * as _ from 'lodash';
import * as middleware from '../../middleware';
import * as model from '../../models';
import e from 'express';

@Controller('/Parents')
export class ParentsController extends base {

    @Get('/BuildersClub')
    @Get('/BuildersClub.aspx')
    @Summary('Builders club FAQ')
    @Render('pages/parents/builders-club.ejs')
    @Use(middleware.Auth.AuthenticateRequest)
    public BuildersClubFaq() {
        return new vm.Default({});
    }

}