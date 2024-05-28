import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTeams } from './UseFetchTeams';
import { UseFetchActivity } from './UseFetchActivity';

export const UseDeleteAccount = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const userId = useSelector(state => state.auth.loggedUser.id);
 
    const deleteAccount = async () => {

        try {
            await axios.delete(`${apiUrl}/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            throw(error);
        };
    };

    return deleteAccount;
};