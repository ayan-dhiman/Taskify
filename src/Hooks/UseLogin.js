import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UseFetchUser } from './UseFetchUser';

export const UseLogin = () => {
    const authUrl = process.env.REACT_APP_AUTH_URL;
    const dispatch = useDispatch();
    const fetchUser = UseFetchUser();

    const login = async (credentials) => {
        try {
            const response = await axios.post(`${authUrl}/login`, credentials);
            const { token } = response.data;
            dispatch({ type: 'SET_TOKEN', payload: token });
            await fetchUser(credentials.email, token);
        } catch (error) {
            throw(error);
        }
    };

    return login;
};