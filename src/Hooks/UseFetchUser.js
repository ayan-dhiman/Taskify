import axios from 'axios';
import { useDispatch } from 'react-redux';

export const UseFetchUser = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const dispatch = useDispatch();

    const fetchUser = async (email, token) => {
        try {
            const response = await axios.get(`${apiUrl}/users/email/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            dispatch({ type: 'SET_USER', payload: response.data });
        } catch (error) {
            throw(error);
        }
    };

    return fetchUser;
};