// API utility for making requests
const getBaseUrl = () => {
    // Prefer explicit env override
    const envUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
    if (envUrl) return envUrl.replace(/\/$/, '');

    // In production, try same-origin as a sensible default for API-only servers
    if (import.meta.env.PROD) {
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

        // Try to parse JSON, but gracefully handle empty/non-JSON responses
        let data = null;
        try {
            data = await response.json();
        } catch (parseErr) {
            // Fallback: read as text and surface useful error messages
            const text = await response.text().catch(() => '');
            if (!response.ok) {
                const message = (data && data.message) || text || response.statusText || 'Request failed';
                throw new Error(message);
            }
            // Successful but non-JSON/empty body
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                }
            } else {
                // No content (e.g., 204)
                return null;
            }
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
