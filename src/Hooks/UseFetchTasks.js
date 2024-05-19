import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

export const UseFetchTasks = (apiUrl, userId, token) => {

    const dispatch = useDispatch();

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${apiUrl}/tasks/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            dispatch({type: 'SET_TASKS', payload: response.data.reverse()});
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Team - Unauthorized: Please enter a valid email and password.');
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

    useEffect(() => {
        fetchTasks();
    }, [apiUrl, userId, token]);

    return fetchTasks;
};