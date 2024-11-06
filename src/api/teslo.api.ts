import axios from "axios";
import { useAuthStore } from "../stores";

// baseURL: "http://localhost/api",
const tesloApi = axios.create({
    baseURL: "http://minishop.lvl:3377/api",
});

// Todo:interceptors - leer el store de zustand y obtener el token
// usando zustand cada vez que se manda una peticion pasa por el interceptor
 tesloApi.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        const token = useAuthStore.getState().token;
        // console.log(token);

        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    }
 )

export {
    tesloApi
}
