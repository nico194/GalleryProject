import axios from 'axios';
const API = "http://interview.agileengine.com";
const apiKey = "23567b218376f79d9415"

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? atob(token) : null;
}

const getHeaders = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
}

export default {
    auth() {
        const body = {
            apiKey: apiKey
        }
        return axios.post(`${API}/auth` , body);
    },
    getImages(page = 0) {
        const headers = getHeaders();
        return axios.get(`${API}/images${ page !== 0 ? `/?page=${page}` : ""}`, headers);
    },
    getImage(id) {
        const headers = getHeaders();
        return axios.get(`${API}/images/${id}`, headers);
    }
}