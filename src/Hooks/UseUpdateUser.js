import axios from 'axios';
import { useSelector } from 'react-redux';

export const UseUpdateUser = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    //const userId = useSelector(state => state.auth.loggedUser.id);

    const token = useSelector(state => state.auth.token);

    const updateUser = async (userId, updatedDetails) => {
        try {
            await axios.put(`${apiUrl}/users/${userId}`, updatedDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw(error);
        }
    };

    const updateUserByEmail = async (email,updatedDetails) => {
        try {
            await axios.put(`${apiUrl}/users/email/${email}`, updatedDetails, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw(error);
        }
    };

    return updateUser;
};