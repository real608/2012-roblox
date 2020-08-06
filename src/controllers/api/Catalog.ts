import { Controller, Get, QueryParams, Res, PathParams, Required } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';
import * as _ from 'lodash';
@Controller('/catalog')
export class CatalogController extends base {

    @Get('/similar/:assetTypeId')
    @Summary('Get similar items')
    public similar(
        @Required()
        @PathParams('assetTypeId', Number) assetTypeId: number,
    ) {
        return this.Catalog.getSimilar(undefined, assetTypeId, 6).then(d => { return _.chunk(d, 3) });
    }

}