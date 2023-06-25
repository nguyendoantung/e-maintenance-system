import axios from "axios";

class rootApiNoToken {
    constructor() {
        this.http = axios.create({
            // baseURL: HOST_SERVER,
            timeout: 15000,
        });

        this.http.interceptors.request.use(
            async (config) => {
                const headers = config.headers;
                let baseURL = config.baseURL;

                if (!baseURL) {
                    baseURL = process.env.REACT_APP_URL_API;
                }
                headers["ngrok-skip-browser-warning"] = true;

                return { ...config, headers: headers, baseURL: baseURL };
            },
            (error) => {
                console.error("[axios]", error);
                return Promise.reject(error);
            }
        );
    }

    async request({ url, params, data, method, onUploadProgress }) {
        const config = {
            url,
            method,
            params,
            data,
            onDownloadProgress: onUploadProgress,
        };

        const response = await this.http.request(config);

        return response.data;
    }
}

export default new rootApiNoToken();
