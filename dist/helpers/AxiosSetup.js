"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (client) => {
    client.interceptors.response.use(ok => {
        return ok;
    }, (err) => {
        if (err.isAxiosError) {
            let e = err;
            if (e.response && e.response.status === 403 && e.response.headers['x-csrf-token']) {
                if (!e.config.headers) {
                    e.config.headers = {};
                }
                e.config.headers['x-csrf-token'] = e.response.headers['x-csrf-token'];
                return client.request(e.config);
            }
        }
        return Promise.reject(err);
    });
    return client;
};
//# sourceMappingURL=AxiosSetup.js.map