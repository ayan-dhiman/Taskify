import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTeams } from './UseFetchTeams';

export const UseAddTeam = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const fetchTeams = UseFetchTeams();

    const addTeam = async (newTeam) => {

        try {
            await axios.post(`${apiUrl}/teams`, newTeam, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTeams();
        } catch (error) {
           throw(error);
        };
    };

    return addTeam;
};