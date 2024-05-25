import axios from 'axios';
import { useSelector } from 'react-redux';
import { UseFetchTeams } from './UseFetchTeams';

export const UseDeleteTeam = () => {

    const apiUrl = process.env.REACT_APP_API_URL;

    const token = useSelector(state => state.auth.token);

    const fetchTeams = UseFetchTeams();

    const deleteTeam = async (selectedTeams) => {

        try {
            await axios.delete(`${apiUrl}/teams`, {
                data: selectedTeams,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTeams();
        } catch (error) {
            throw(error);
        };
    };

    return deleteTeam;
};