import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchActivity } from './UseFetchActivity';
import { UseFetchTasks } from './UseFetchTasks';

export const UseAddTask = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const fetchTasks = UseFetchTasks();

    const fetchActivity = UseFetchActivity();

    const addTask = async (newTask) => {

        try {
            await axios.post(`${apiUrl}/tasks`, newTask, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTasks();
        } catch (error) {
           throw(error);
        };
    };

    return addTask;
};