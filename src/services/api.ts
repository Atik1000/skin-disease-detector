import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post(`${API_URL}/predict`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_URL}/health`);
        return response.data;
    } catch (error) {
        console.error('Error checking health:', error);
        throw error;
    }
}; 