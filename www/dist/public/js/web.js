const web = {};
web.csrf = '';
/**
 * Add commas to a number
 * @param {number} x 
 */
function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const _filterObjForXss = (obj) => {
    if (Array.isArray(obj)) {
        obj.forEach((item, index, arr) => {
            arr[index] = _filterObjForXss(item);
        })
        return obj;
    } else if (typeof obj === 'object' && obj !== null) {
        let props = Object.getOwnPropertyNames(obj);
        for (const prop of props) {
            let item = obj[prop];
            obj[prop] = _filterObjForXss(item);
        }
        return obj;
    } else if (typeof obj === 'string') {
        return filterXSS(obj, { whiteList: {} });
    } else if (typeof obj === 'number') {
        return obj;
    } else {
        console.warn('invalid object passed to _filterObjForXss. it will be returned un-touched');
        return obj;
    }
    return obj;
}

/**
 * Make an HTTP GET request
 * @param {string} originalUrl 
 */
web.get = (originalUrl) => {
    let url = originalUrl;
    if (url.slice(0, 1) === '/') {
        url = url.slice(1);
    }
    url = '/api/v1/' + url;
    return new Promise((res, rej) => {
        $.ajax({
            headers: {
                'x-csrf-token': web.csrf,
            },
            url: url,
            success: (d) => {
                res(_filterObjForXss(d));
            },
            error: (err) => {
                let newCsrf = err.getResponseHeader('x-csrf-token');
                if (newCsrf) {
                    web.csrf = newCsrf;
                    web.get(originalUrl).then(data => res(data)).catch(err => rej(err));
                } else {
                    rej(err);
                }
            }
        });
    });
}
/**
 * Make an HTTP POST request
 * @param {string} originalUrl
 * @param {*} data Request body 
 */
web.post = (originalUrl, data) => {
    let url = originalUrl;
    if (url.slice(0, 1) === '/') {
        url = url.slice(1);
    }
    url = '/api/v1/' + url;
    return new Promise((res, rej) => {
        $.ajax({
            method: 'POST',
            headers: {
                'x-csrf-token': web.csrf,
                'content-type': 'application/json',
            },
            data: JSON.stringify(data),
            url: url,
            success: (d) => {
                res(_filterObjForXss(d));
            },
            error: (err) => {
                let newCsrf = err.getResponseHeader('x-csrf-token');
                if (newCsrf) {
                    web.csrf = newCsrf;
                    web.post(originalUrl, data).then(data => res(data)).catch(err => rej(err));
                } else {
                    rej(err);
                }
            }
        });
    });
}
