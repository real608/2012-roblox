import { Controller, Get, QueryParams, Res, Post, PathParams, Required, BodyParams, Locals, Use } from '@tsed/common';
import { Summary, Returns } from '@tsed/swagger'
import base from '../base';

import * as middleware from '../../middleware';
import * as model from '../../models';

@Controller('/economy')
export class EconomyController extends base {

    @Post('/purchase/:productId')
    @Summary('Purchase the {productId}')
    @Use(
        middleware.Auth.AuthenticateRequest,
        middleware.Auth.YesAuth,
        middleware.csrf,
    )
    public async purchase(
        @Locals('cookie') cookie: string,
        @Required()
        @PathParams('productId', Number) productId: number,
        @Required()
        @BodyParams('expectedSellerId', Number) expectedSellerId: number,
        @Required()
        @BodyParams('expectedPrice', Number) expectedPrice: number,
        @BodyParams('userAssetId', Number) userAssetId?: number,
    ) {
        return new base({ cookie }).Economy.purchaseItem(productId, expectedSellerId, expectedPrice, userAssetId);
    }
}