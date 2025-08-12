// API utility for making requests
const getBaseUrl = () => {
    // Prefer explicit env override
    const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
    if (envUrl) return envUrl.replace(/\/$/, '');

    // In production, require explicit API base URL to avoid calling the frontend origin
    if (import.meta.env.PROD) {
        // If not provided, we still return same-origin for backward compatibility,
        // but apiCall will error on non-JSON responses to surface misconfiguration.
        if (typeof window !== 'undefined' && window.location?.origin) {
            return window.location.origin.replace(/\/$/, '');
        }
    }

    // In development, use localhost
    return 'http://localhost:5000';
};

export const apiCall = async (endpoint, options = {}) => {
    const baseUrl = getBaseUrl();
    const url = `${baseUrl}${endpoint}`;
    
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);

        const contentType = response.headers.get('content-type') || '';
        const isJson = contentType.includes('application/json');

        // If the response isn't JSON but is OK, this likely means the frontend origin
        // returned an HTML page (e.g., index.html). Treat as misconfiguration.
        if (response.ok && !isJson) {
            const text = await response.text().catch(() => '');
            const hint = import.meta.env.PROD
                ? 'Set VITE_API_BASE_URL to your backend URL in the frontend environment.'
                : 'Ensure the API is reachable and returns JSON.';
            throw new Error(
                `Unexpected non-JSON response from API. ${hint}`
            );
        }

        // Parse JSON (or surface a clear error if parsing fails)
        let data = null;
        try {
            data = await response.json();
        } catch {
            const text = await response.text().catch(() => '');
            if (!response.ok) {
                throw new Error(text || response.statusText || 'Request failed');
            }
            // No content (e.g., 204)
            if (!text) return null;
            // Non-JSON success should have been caught above; treat as error here too
            throw new Error('Failed to parse API response as JSON.');
        }

        if (!response.ok) {
            throw new Error((data && data.message) || 'Something went wrong');
        }

        return data;
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Unable to connect to the server. Please check your internet connection.');
        }
        throw error;
    }
};

export const apiPost = (endpoint, data) => {
    return apiCall(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const apiGet = (endpoint) => {
    return apiCall(endpoint, {
        method: 'GET',
    });
};
