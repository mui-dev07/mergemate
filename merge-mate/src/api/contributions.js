import api from './axios';

export const getContributions = () => api.get('/contributions');
export const getContribution = (id) => api.get(`/contributions/${id}`);
export const createContribution = (data) => api.post('/contributions', data);
export const updateContribution = (id, data) => api.put(`/contributions/${id}`, data);
export const deleteContribution = (id) => api.delete(`/contributions/${id}`); 