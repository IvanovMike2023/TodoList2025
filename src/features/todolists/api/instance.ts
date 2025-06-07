import {AUTH_TOKEN} from "../../../common/constants";
import axios from "axios";

const token = "1517a2ba-bf0b-4d95-8de7-cbeab30791d7"

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": "a2bc24bd-0a71-4fa5-ad1c-5b343082cdb6"
    }
});
instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem(AUTH_TOKEN)
    config.headers.Authorization=`Bearer ${token}`
    return config;
});