import axios from "axios";

// baseURL: "http://localhost/api",
const tesloApi = axios.create({
    baseURL: "http://minishop.lvl:3377/api",
});

// Todo:interceptors - leer el store de zustand y obtener el token

export {
    tesloApi
}
