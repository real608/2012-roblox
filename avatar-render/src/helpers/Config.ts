interface IWebsiteConfiguration {
    authorization: string;
    port?: number;
}

const conf: Readonly<IWebsiteConfiguration> = JSON.parse(require('fs').readFileSync('../../config.json').toString())
export default conf;