import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UseFetchActivity } from './UseFetchActivity';

export const UseFetchTeams = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const userId = useSelector(state => state.auth.loggedUser.id);

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const fetchActivity = UseFetchActivity();

    const fetchTeams = async () => {
        try {
            const response = await axios.get(`${apiUrl}/teams/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: 'SET_TEAMS', payload: response.data});
            fetchActivity();
        } catch (error) {
            throw(error);
        };
    };

    return fetchTeams;
};