import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTeams } from './UseFetchTeams';
import { UseFetchActivity } from './UseFetchActivity';

export const UseDeleteActivity = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const userId = useSelector(state => state.auth.loggedUser.id);

    const fetchActivity = UseFetchActivity();

    const deleteActivity = async () => {

        try {
            await axios.delete(`${apiUrl}/activities/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchActivity();
        } catch (error) {
            throw(error);
        };
    };

    return deleteActivity;
};