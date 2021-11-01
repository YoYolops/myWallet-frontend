import axios from 'axios';

const API = axios.create({
    baseURL: "https://mywalletb.herokuapp.com"
})

export default API;