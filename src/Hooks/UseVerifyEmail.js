import axios from 'axios';

export const UseVerifyEmail = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const verifyEmail = async (email) => {
        try {
            const response = await axios.get(`${authUrl}/verifyemail?email=${email}`);
            return response.data;
        } catch (error) {
            throw(error);
        }
    };

    return verifyEmail;
};