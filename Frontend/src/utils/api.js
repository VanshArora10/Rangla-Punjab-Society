// API utility for making requests
const getBaseUrl = () => {
    // In production, use the deployed backend URL
    if (import.meta.env.PROD) {
        return 'https://your-backend-url.onrender.com'; // Replace with your actual backend URL
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
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
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
