interface IWebsiteConfiguration {
    port?: number;
    cookiesKey: string;
    csrfKey: string;
    redis: IORedis.RedisOptions;
}
import { join } from 'path';
import { readFileSync } from 'fs';
import IORedis from 'ioredis';
const conf = readFileSync(join(__dirname, '../../config.json')).toString();

export default JSON.parse(conf) as Readonly<IWebsiteConfiguration>;