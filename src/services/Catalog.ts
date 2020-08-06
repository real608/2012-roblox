import base from './base';

/**
 * Roblox catalog service
 */
export default class CatalogService extends base {
    /**
     * Get the catalog
     * @param queryParams 
     */
    public getCatalog(queryParams: Partial<{
        Category: number;
        IncludeNotForSale: boolean;
        MaxPrice: number;
        SortType: number;
        Limit: number,
    }>): Promise<{ nextPageCursor: string | null; previousPageCursor: string | null; data: any[] }> {
        let queryStr = '';
        const keys = Object.getOwnPropertyNames(queryParams);
        for (const key of keys) {
            // @ts-ignore
            let val = queryParams[key];
            queryStr += encodeURIComponent(key) + '=' + encodeURIComponent(val) + '&';
        }
        queryStr = queryStr.slice(0, queryStr.length - 1);
        return this.get('https://catalog.roblox.com/v1/search/items/details?' + queryStr);
    }

    /**
     * Get product info by the {assetId}
     * @param assetId 
     */
    public getProductInfo(assetId: number): Promise<{
        TargetId: number;
        ProductType: 'User Product';
        AssetId: number;
        ProductId: number;
        Name: string;
        Description: string;
        AssetTypeId: number;
        Creator: {
            Id: number;
            Name: string;
            CreatorType: 'User' | 'Group';
            CreatorTargetId: number;
        };
        Created: string;
        Updated: string;
        PriceInRobux: number | null;
        PriceInTickets: null;
        Sales: number;
        IsNew: boolean;
        IsForSale: boolean;
        IsPublicDomain: boolean;
        IsLimited: boolean;
        IsLimitedUnique: boolean;
        Remaining: null | number;
        MinimumMembershipLevel: 0 | 1 | 2 | 3 | 4;
        ContentRatingTypeId: number;
    }> {
        return this.get('https://api.roblox.com/marketplace/productinfo?assetId=' + assetId);
    }

    public countFavorites(assetId: number): Promise<number> {
        return this.get(`https://catalog.roblox.com/v1/favorites/assets/${assetId}/count`)
    }

    @base.AddCookie()
    public getSimilar(assetId?: number, typeId: number = 8, limit: number = 5): Promise<{
        item: {
            assetId: number;
            name: string;
            price: number;
            premiumPrice: number | null;
        };
        creator: {
            creatorId: number;
            creatorType: 'User' | 'Group';
            name: string;
        };
        product: {
            id: number;
            priceInRobux: number | null;
            isForSale: boolean;
            isPublicDomain: boolean;
            isResellable: boolean;
            isLimited: boolean;
            isLimitedUnique: boolean;
            isRental: boolean;
            bcRequirement: 0 | 1 | 2 | 3 | 4;
            totalPrivateSales: number;
            isFree: boolean;
        }
    }[]> {
        return this.get(`https://catalog.roblox.com/v1/recommendations/asset/${typeId}?contextAssetId=${assetId || ''}&numItems=${limit}`).then(d => {
            return d.data;
        })
    }

    public batchGetItemDetails(items: { itemType: 'Asset' | 'Bundle' | string; id: number; key?: string; thumbnailType?: string; }[]): Promise<{ data: any[] }> {
        for (const item of items) {
            if (!item.key) {
                item.key = item.itemType + '_' + item.id;
            }
            item.thumbnailType = 'assetThumbnail';
        }
        return this.axios.post(`https://catalog.roblox.com/v1/catalog/items/details`, {
            items,
        }).then(d => {
            return d.data;
        })
    }

    public async getAssetDetails(assetId: number): Promise<{
        genres: string[]
    }> {
        return this.batchGetItemDetails([
            {
                itemType: 'Asset',
                id: assetId,
            }
        ]).then(data => {
            return data.data[0];
        })
    }
}