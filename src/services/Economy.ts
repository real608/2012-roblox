import base from './base';

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
}