import { Controller, Get, QueryParams, Res, PathParams } from '@tsed/common';
import { Summary } from '@tsed/swagger'
import base from '../base';
import * as _ from 'lodash';

@Controller('/inventory')
export class InventoryController extends base {

    @Get('/users/:userId/:assetTypeId')
    public getInventory(
        @PathParams('userId', Number) userId: number,
        @PathParams('assetTypeId', Number) assetType: number,
        @QueryParams('cursor', String) cursor: string,
        @QueryParams('mode', String) mode?: string,
    ) {
        if (!cursor) {
            cursor = '';
        }
        if (!assetType) {
            assetType = 8;
        }
        if (assetType === 21) {
            return this.Badges.getUserBadges(userId, cursor).then(d => {
                d.data.forEach(val => {
                    // @ts-ignore
                    val.assetName = val.name;
                    // @ts-ignore
                    val.assetId = val.displayIconImageId;
                })
                if (mode === 'profile') {
                    // @ts-ignore
                    d.data = _.chunk(d.data, 5)
                }
                return d;
            })
        }
        return this.Inventory.getUserInventory(userId, assetType, cursor).then(d => {
            let multiGetIds = d.data.map(val => {
                return { id: val.assetId, itemType: 'Asset' };
            });
            return this.Catalog.batchGetItemDetails(multiGetIds).then(res => {
                for (const item of res.data) {
                    for (const otherItem of d.data) {
                        if (item.id === otherItem.assetId) {
                            for (const key of Object.getOwnPropertyNames(item)) {
                                // @ts-ignore
                                otherItem[key] = item[key];
                            }
                            continue;
                        }
                    }
                }
                if (mode === 'profile') {
                    // @ts-ignore
                    d.data = _.chunk(d.data, 5)
                }
                return d;
            })
        })
    }
}