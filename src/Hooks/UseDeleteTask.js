import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTasks } from './UseFetchTasks';

export const UseDeleteTask = () => {

    
    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const fetchTasks = UseFetchTasks();

    const deleteTask = async (taskId) => {

        try {
            await axios.delete(`${apiUrl}/tasks/${taskId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
            throw(error);
        };
    };

    return deleteTask;
};