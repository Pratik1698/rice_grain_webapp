
/**
 * RiceVision API service
 * Communicates with the FastAPI backend for rice grain classification.
 */

const envUrl = import.meta.env.VITE_API_URL;

const API_BASE = envUrl
  ? envUrl.replace(/\/+$/, '')
  : '/api';

// Debug: verify which API URL the frontend is using
console.log('RiceVision API URL:', API_BASE);

/**
 * Send an image to the backend for grain classification.
 * @param {File} imageFile - The image file to classify
 * @returns {Promise<Object>} Prediction result
 */
export async function predictGrain(imageFile) {
  if (!imageFile) {
    throw new Error('Please select a rice grain image.');
  }

  const formData = new FormData();
  formData.append('file', imageFile);

  let response;

  try {
    response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.error('Prediction request failed:', error);

    throw new Error(
      `Cannot connect to RiceVision API at ${API_BASE}.`
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      data?.error ||
      `Prediction failed (HTTP ${response.status}).`
    );
  }

  if (!data || !data.predicted_class) {
    console.error('Unexpected API response:', data);

    throw new Error(
      'The API returned an unexpected prediction response.'
    );
  }

  console.log('Prediction result:', data);

  return data;
}

/**
 * Check whether the backend is reachable.
 * @returns {Promise<Object>} Health response
 */
export async function checkHealth() {
  let response;

  try {
    response = await fetch(`${API_BASE}/health`);
  } catch (error) {
    console.error('Health check request failed:', error);

    throw new Error(
      `Cannot connect to the RiceVision API at ${API_BASE}.`
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail ||
      `Health check failed (HTTP ${response.status}).`
    );
  }

  return data;
}
