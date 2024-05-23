import axios from 'axios';

export const UseValidateOTP = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const validateOTP = async (email, OTP) => {
        try {
            const response = await axios.post(`${authUrl}/validateOTP?email=${email}&OTP=${OTP}`);
            return response.data;
        } catch (error) {
            throw(error);
        }
    };

    return validateOTP;
};