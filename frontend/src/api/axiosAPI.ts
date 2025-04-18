import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'http://localhost:3001',
});

export default axiosAPI;