import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const UseFetchTeams = (apiUrl, userId, token) => {

    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const fetchTeams = async () => {

        console.log("Fetching Teams");

        try {
            const response = await axios.get(`${apiUrl}/teams/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: 'SET_TEAMS', payload: response.data});
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log("Teams - 401");
                    alert('Teams - Unauthorized: Please enter a valid email and password.');
                } else {
                    console.error('Server Error:', error.response.data);
                    alert('Teams - An error occurred while processing your request. Please try again later.');
                }
            } else if (error.request) {
                console.error('Network Error:', error.request);
                alert('Teams - Network Error: Please check your internet connection.');
            } else {
                console.error('Error:', error.message);
                alert('Teams - An error occurred. Please try again later.');
            }
        };
    };

    useEffect(() => {
        fetchTeams();
    }, [apiUrl, userId, token]);

    return fetchTeams;
};