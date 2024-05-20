import axios from 'axios';

export const UseAddUser = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;

    const addUser = async (newUser) => {
        try {
            await axios.post(`${authUrl}/register`, newUser);
        } catch (error) {
            throw(error);
        }
    };

    return addUser;
};