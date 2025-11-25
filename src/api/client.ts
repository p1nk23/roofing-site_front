import axios from 'axios';

// На этапе разработки — прокси через create-react-app (см. ниже)
const api = axios.create({
  baseURL: '/api', // будет проксироваться на http://localhost:5087/api
});

export default api;