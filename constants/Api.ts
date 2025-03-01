/**
 * API configuration constants
 */

// Base URL
export const API_BASE_URL = "https://orb.letsfindaway.online/api/v1";

export const ENDPOINTS = {
  // Auth endpoints
  AUTH_LOGIN: `${API_BASE_URL}/auth/log-in`,
  AUTH_SIGNUP: `${API_BASE_URL}/auth/sign-up`,

  // Add other endpoints as needed
};

// Helper function to get API URL with the endpoint
export const getApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};
