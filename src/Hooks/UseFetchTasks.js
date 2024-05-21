import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UseFetchActivity } from './UseFetchActivity';

export const UseFetchTasks = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const userId = useSelector(state => state.auth.loggedUser.id);

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const fetchActivity = UseFetchActivity();

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: 'SET_TASKS', payload: response.data.reverse()});
            fetchActivity();
        } catch (error) {
           throw(error);
        };
    };

    return fetchTasks;
};