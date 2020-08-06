export enum PurchaseFailReasons { "Success", "AlreadyOwned", "ApplicationError", "EconomyDisabled", "InsufficientFunds", "InsufficientMembership", "InvalidTransaction", "NotAvailableInRobux", "NotForSale", "PriceChanged", "SaleExpired", "SupplyExausted", "ContentRatingRestricted", "UnknownBirthday", "AffiliateSalesDisabled", "BadAffiliateSaleProduct", "ExceptionOccurred", "IOSOnlyItem", "InvalidArguments", "TooManyPurchases", "Unauthorized", "AccountRestrictionsRestricted", "PendingTransactionAlreadyExists" }

export interface IPurchaseRequest {
    expectedSellerId: number;
    expectedCurrency: number;
    expectedPrice: number;
    userAssetId?: number;
    saleLocationType?: string;
    expectedPromoId?: number;
    saleLocationId?: number;
}