import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UseFetchTeams } from './UseFetchTeams';

export const UseDeleteTeam = (apiUrl, userId, token) => {

    const dispatch = useDispatch();

    const fetchTeams = UseFetchTeams(apiUrl, userId, token);

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const deleteTeam = async (teamId) => {

        try {
            await axios.delete(`${apiUrl}/teams/${teamId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTeams();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Delete - Unauthorized: Please enter a valid email and password.');
                } else {
                    console.error('Server Error:', error.response.data);
                    alert('An error occurred while processing your request. Please try again later.');
                }
            } else if (error.request) {
                console.error('Network Error:', error.request);
                alert('Network Error: Please check your internet connection.');
            } else {
                console.error('Error:', error.message);
                alert('An error occurred. Please try again later.');
            }
        };
    };

    return deleteTeam;
};