import axios from 'axios';

export const UseGenerateOTP = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const generateOTP = async (email) => {
        try {
            await axios.post(`${authUrl}/generateOTP?email=${email}`);
        } catch (error) {
            throw(error);
        }
    };

    return generateOTP;
};