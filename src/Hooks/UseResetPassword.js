import axios from 'axios';

export const UseResetPassword = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const resetPassword = async (reqBody) => {
        try {
            await axios.post(`${authUrl}/resetPassword`,reqBody);
        } catch (error) {
            throw(error);
        }
    };

    return resetPassword;
};