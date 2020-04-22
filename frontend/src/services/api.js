import axios from 'axios';
import config from '../config.json';
//'http://192.168.0.105:9966'
const api = axios.create({
   baseURL: config.apiBaseUrl
});

export default api;