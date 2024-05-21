import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTasks } from './UseFetchTasks';

export const UseUpdateTask = () => {
    
    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const fetchTasks = UseFetchTasks();

    const updateTask = async (taskId, updatedTask) => {
        try {
            await axios.put(`${apiUrl}/tasks/${taskId}`, updatedTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
           throw(error);
        }
    };

    return updateTask;
};