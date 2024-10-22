
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_SERVER_URL;


  const apiClient = axios.create({
    baseURL: SERVER_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Interceptor to handle responses
  apiClient.interceptors.response.use(
    (response) => {
      if (['post', 'put', 'delete'].includes(response.config.method)) {
        console.log(response);
      }
      return response;
    },
    (error) => {

      return Promise.reject(error);
    }
  );

  export default apiClient;

