import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UseFetchTasks } from './UseFetchTasks';

export const UseAddTask = (apiUrl, userId, token) => {

    const dispatch = useDispatch();

    const fetchTasks = UseFetchTasks(apiUrl, userId, token);

    const alert = (message) => {
        dispatch({ type: 'SET_OPEN', payload: true });
        dispatch({ type: 'SET_MESSAGE', payload: message });
    };

    const addTask = async (newTask) => {

        try {
            await axios.post(`${apiUrl}/tasks`, newTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    alert('Add Task - Unauthorized: Please enter a valid email and password.');
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

    return addTask;
};