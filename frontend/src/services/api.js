import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Public API - Lead submission
export const submitLead = async (leadData) => {
  const response = await api.post('/leads', leadData);
  return response.data;
};

// Admin API - Authentication
export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('admin', JSON.stringify(response.data.data));
  }
  return response.data;
};

export const adminRegister = async (adminData) => {
  const response = await api.post('/admin/register', adminData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('admin', JSON.stringify(response.data.data));
  }
  return response.data;
};

// Admin API - Leads management
export const getLeads = async (params) => {
  const response = await api.get('/admin/leads', { params });
  return response.data;
};

export const getLeadStats = async () => {
  const response = await api.get('/admin/leads/stats');
  return response.data;
};

export const getLeadById = async (id) => {
  const response = await api.get(`/admin/leads/${id}`);
  return response.data;
};

export const updateLead = async (id, data) => {
  const response = await api.put(`/admin/leads/${id}`, data);
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(`/admin/leads/${id}`);
  return response.data;
};

export const exportLeads = async () => {
  const response = await api.get('/admin/leads/export', {
    responseType: 'blob',
  });
  return response.data;
};

export const getAnalytics = async (params) => {
  const response = await api.get('/admin/analytics', { params });
  return response.data;
};

export default api;
