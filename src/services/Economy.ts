import base from './base';
import * as model from '../models/';

export default class EconomyService extends base {
    public getBalance(userId: number): Promise<{ robux: number }> {
        return this.get('https://economy.roblox.com/v1/users/' + userId + '/currency');
    }

    public getResaleData(assetId: number): Promise<{
        assetStock: number | null;
        sales: number;
        numberRemaining: number | null;
        recentAveragePrice: number;
        /**
         * Original price in Robux
         */
        originalPrice: number | null;
        priceDataPoints: { value: number; date: string }[];
        volumeDataPoints: { value: number; date: string }[];
    }> {
        return this.get(`https://economy.roblox.com/v1/assets/${assetId}/resale-data`);
    }

    public getSellers(assetId: number, limit: number = 100, cursor: string = ''): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        data: { userAssetId: number; seller: { id: number; type: 'User'; name: string; }; price: number; serialNumber: number | null }[];
    }> {
        return this.get(`https://economy.roblox.com/v1/assets/${assetId}/resellers?limit=${limit}&cursor=${cursor}`);
    }

    /**
     * Purchase the {productId}. If error, {BadRequest} is thrown with the code in the error.message
     * @param productId 
     * @param expectedSellerId 
     * @param expectedCurrency 
     * @param userAssetId 
     * @param saleLocationType 
     * @param expectedPromoId 
     * @param saleLocationId 
     */
    public async purchaseItem(
        productId: number,
        expectedSellerId: number,
        expectedPrice: number,
        userAssetId?: number,
        // this should always be 1 right?
        expectedCurrency: number = 1,
        saleLocationType: 'Website' | 'Game' = 'Website',
        expectedPromoId?: number,
        // i have no idea what this is
        saleLocationId?: number,
    ): Promise<{ purchased: boolean; reason: model.Economy.PurchaseFailReasons; statusCode: number; errorMsg: string; }> {
        let requestBody: model.Economy.IPurchaseRequest = {
            expectedSellerId,
            expectedCurrency,
            saleLocationType,
            expectedPrice,
        };
        if (expectedPromoId) {
            requestBody.expectedPromoId = expectedPromoId;
        }
        if (saleLocationId) {
            requestBody.saleLocationId = saleLocationId;
        }
        if (userAssetId) {
            requestBody.userAssetId = userAssetId;
        }
        const d = await this.axios.post('https://economy.roblox.com/v1/purchases/products/' + productId, requestBody)
        let purchased = d.data.purchased;
        let status = d.data.reason;
        if (purchased) {
            return d.data;
        } else {
            let msg = status;
            if (typeof status === 'number') {
                msg = model.Economy.PurchaseFailReasons[status]
            }
            throw new this.Conflict(msg);
        }
    }
}