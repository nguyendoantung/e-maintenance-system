import axios from "axios";
export function getToken(tokenType) {
    try {
        const state = localStorage.getItem(tokenType);
        return state;
    } catch (e) {
        return "none";
    }
}
export const axiosMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
};
class rootApiHaveToken {
    constructor() {
        this.http = axios.create({
            // baseURL: HOST_SERVER,
            timeout: 15000,
        });

        this.http.interceptors.request.use(
            async (config) => {
                const headers = config.headers;
                let baseURL = config.baseURL;
                const accessToken = localStorage.getItem("token");

                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                    headers["ngrok-skip-browser-warning"] = true;
                }

                if (!baseURL) {
                    baseURL = process.env.REACT_APP_URL_API;
                }

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

export default new rootApiHaveToken();
