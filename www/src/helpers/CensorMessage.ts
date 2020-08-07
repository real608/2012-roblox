import Config from './Config';
/**
 * Remove important information from a string
 * @param str 
 */
const censorString = (str: string): string => {
    let rString = '****';
    let newStr = str
        .replace(new RegExp(Config.cookiesKey, 'g'), rString)
        .replace(new RegExp(Config.csrfKey, 'g'), rString)

    if (Config.redis.password) {
        newStr = newStr.replace(new RegExp(Config.redis.password || '', 'g'), rString);
    }
    return newStr;
}

const censor = <T>(object: T): T => {
    // @ts-ignore
    if (object.stack) {
        // @ts-ignore
        object.stack = censorString(object.stack);
    }
    // @ts-ignore
    if (object.message) {
        // @ts-ignore
        object.message = censorString(object.message);
    }
    return object;
    /*
    // null, 0, '', undefined 
    if (!object) {
        return object;
    }
    if (object === null || typeof object === 'undefined' || typeof object === 'number' || typeof object === 'bigint' || typeof object === 'boolean') {
        return object;
    }
    if (Array.isArray(object)) {
        for (let item of object) {
            item = censor(item);
        }
    }else if (typeof object === 'object') {
        for (const key of Object.getOwnPropertyNames(object)) {
            // @ts-ignore
            object[key] = censor(object[key]);
        }
    }else if (typeof object === 'string') {

    }
    // @ts-ignore
    return object;
    */
}
export default censor;