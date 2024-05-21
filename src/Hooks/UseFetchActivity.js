import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const UseFetchActivity = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const userId = useSelector(state => state.auth.loggedUser.id);

    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const fetchActivity = async () => {
        try {
            const response = await axios.get(`${apiUrl}/activities/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
            dispatch({type: 'SET_ACTIVITY', payload: sortedData});
        } catch (error) {
           throw(error);
        };
    };

    return fetchActivity;
};