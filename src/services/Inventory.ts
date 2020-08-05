import base from './base';

export default class InventoryService extends base {

    public getUserInventory(userId: number, assetTypeId: number, cursor: string = ''): Promise<{
        previousPageCursor: string | null;
        nextPageCursor: string | null;
        data: {
            assetName: string;
            userAssetId: number;
            assetId: number;
            created: string;
            updated: string;
        }[];
    }> {
        return this.get('https://inventory.roblox.com/v2/users/' + userId + '/inventory/' + assetTypeId + '?sortOrder=Asc&limit=25&cursor=' + encodeURIComponent(cursor));
    }

}