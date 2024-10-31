import axios from "axios";

const tesloApi = axios.create({
    baseURL: "http://localhost/api",
});

// Todo:interceptors - leer el store de zustand y obtener el token

export {
    tesloApi
}
