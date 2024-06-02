import axios, {AxiosResponse} from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError = {
            message: error.response ? error.response.data.message : 'Bir hata oluştu.',
            status: error.response ? error.response.status : 500,
        };
        switch (customError.status) {
            case 404:
                console.error('Kaynak bulunamadı:', customError.message);
                break;
            case 500:
                console.error('Sunucu hatası:', customError.message);
                break;
            default:
                console.error(`Bir hata oluştu: ${customError.message}`);
        }
        return Promise.reject(customError);
    }
);

export default axiosInstance;
