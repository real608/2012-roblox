import base from './base';
import * as model from '../models';

export default class BuildersClubService extends base {

    /**
     * Get the builders club type of the {userId}
     * @param userId 
     */
    @base.AddCookie()
    public async getType(userId: number): Promise<model.BuildersClub.SubscriptionType> {
        if (userId === 1) {
            return 'OBC';
        }
        let cached = await this.redis.get('is_premium_' + userId) as 'true' | 'false' | null;
        if (typeof cached !== 'string') {
            cached = (await this.get('https://premiumfeatures.roblox.com/v1/users/' + userId + '/validate-membership') as boolean) === true ? 'true' : 'false';
            await this.redis.setex('is_premium_' + userId, 60 * 5, cached);
        }
        if (cached === 'true') {
            const cachedBcStatus = await this.redis.get('bc_type_' + userId);
            if (cachedBcStatus) {
                return cachedBcStatus as model.BuildersClub.SubscriptionType;
            } else {
                return 'BC';
            }
        }
        return 'NBC';
    }

    /**
     * Subscription info can only be retreived by the authenticated user
     * @param userId 
     */
    public getSubscription(userId: number): Promise<{
        type: 'NBC' | 'BC' | 'TBC' | 'OBC';
        isLifetime?: boolean;
        renewal?: string;
        expiration?: string
    }> {
        return this.get('https://premiumfeatures.roblox.com/v1/users/' + userId + '/subscriptions').then(d => {
            if (!d.subscriptionProductModel) {
                return {
                    // @ts-ignore
                    type: 'NBC',
                }
            }
            let m = d.subscriptionProductModel;
            const newM = {
                // @ts-ignore
                type: model.BuildersClub.PremiumToBC[m.subscriptionTypeName],
                isLifetime: m.isLifetime,
                expiration: m.expiration,
                renewal: m.renewal,
            }
            return newM;
        }).catch(err => {
            if (err.response && err.response.status === 404) {
                return {
                    type: 'NBC',
                } as any;
            }
            throw err;
        });
    }

    public getMembershipTypes(): Promise<{
        name: string;
        productId: number;
        premiumFeatureId: number;
        robuxAmount: number;
        price: number;
    }[]> {
        return this.get('https://premiumfeatures.roblox.com/v1/products?typeName=Premium').then(d => {
            const newModel: any[] = [];
            d.products.forEach((item: any) => {
                if (item.premiumFeatureTypeName !== 'Subscription') {
                    return;
                }
                // @ts-ignore
                let name = model.BuildersClub.PremiumToBC[item.subscriptionTypeName] || 'Unknown';
                newModel.push({
                    name: name,
                    productId: item.productId,
                    premiumFeatureId: item.premiumFeatureId,
                    robuxAmount: item.robuxAmount,
                    price: item.price.usdAmount,
                })
            })
            return newModel;
        })
    }

}