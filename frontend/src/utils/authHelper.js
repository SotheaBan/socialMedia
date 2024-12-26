// src/utils/authHelper.js
export const getAccessToken = () => localStorage.getItem('accessToken');
export const getUserId = () => localStorage.getItem('id');