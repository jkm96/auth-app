import axios from "axios";
import * as https from "https";

const adminApiClient = axios.create({
    baseURL: `${process.env.ADMIN_API_URL}`,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

adminApiClient.interceptors.request.use(
    function (config) {
        // console.log("axios interceptor",config.url)
        // console.log("axios request headers",config.headers)
        let url = config.url as string;
        if (!url.includes("auth")){

        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    }
);
export default adminApiClient;