import Redis from 'ioredis';
import Config from './Config';
const redis = new Redis(Config.redis); // uses defaults unless given configuration object

export default redis;
export const ps = () => {
    return new Redis(Config.redis);
}