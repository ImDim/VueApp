import axios from 'axios';
import router from '@/router';

const inststance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    "Content-type": "application/json"
  }
});

// Add a request interceptor
inststance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('authToken')
  config.headers['authorization'] = token ? `Bearer ${token}` : '';
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
inststance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const {
    response
  } = error;

  if (response.status === 403) {
    router.push({
      name: "auth"
    });
  }
  return Promise.reject(error);
});

export default inststance;