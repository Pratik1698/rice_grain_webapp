/**
 * RiceVision API Service
 * Communicates with the FastAPI backend for rice grain classification.
 */

/**
 * In production (Vercel): Set VITE_API_URL (e.g. https://ricevision-api.onrender.com)
 * In local development: Falls back to '/api' (handled by Vite proxy to http://localhost:8000)
 */
const envUrl = import.meta.env.VITE_API_URL;
const API_BASE = envUrl ? envUrl.replace(/\/+$/, '') : '/api';

/**
 * Send an image to the backend for grain classification.
 * @param {File} imageFile - The image file to classify
 * @returns {Promise<Object>} - Prediction result
 */
export async function predictGrain(imageFile) {
  const formData = new FormData();
  formData.append('file', imageFile);

  const response = await fetch(`${API_BASE}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `Server error: ${response.status}`);
  }

  return response.json();
}

/**
 * Check if the backend is running and healthy.
 * @returns {Promise<Object>}
 */
export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('Backend is not reachable');
  }
  return response.json();
}
