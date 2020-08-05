import { AxiosInstance, AxiosError } from "axios";

export default (client: AxiosInstance): void => {
    client.interceptors.response.use(undefined, (err) => {
        if (err.isAxiosError) {
            let e = err as AxiosError;
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
}