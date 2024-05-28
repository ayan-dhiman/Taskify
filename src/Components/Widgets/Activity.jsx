import React, { useEffect, useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/Activity.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Snackbar, SnackbarContent } from '@mui/material';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';
import useAlert from '../../Hooks/UseAlert';
import { UseFetchActivity } from '../../Hooks/UseFetchActivity';
import { UseDeleteActivity } from '../../Hooks/UseDeleteActivity';

function Activity({ loading, setLoading }) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const theme = useSelector(state => state.theme.theme);

  const activities = useSelector(state => state.activity.activity);

  const fetchActivity = UseFetchActivity();

  const deleteActivity = UseDeleteActivity();

  const [sortOrder, setSortOrder] = useState('desc');

  const alert = useAlert();

  const dispatch = useDispatch();

  const columns = [
    { field: 'date' },
    { field: 'activity' }
  ];

  const handleFetchActivity = async () => {
    try {
      await fetchActivity();
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          alert('Unauthorized: Please enter a valid email and password.');
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

  const sortData = () => {
    setSortOrder(prevSortOrder => {
      const newSortOrder = prevSortOrder === 'asc' ? 'desc' : 'asc';
      const sortedRows = [...activities].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
  
        if (newSortOrder === 'asc') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });
      dispatch({ type: 'SET_ACTIVITY', payload: sortedRows });
      return newSortOrder;
    });
  };
  
  const handleClearActivity = () => {
    deleteActivity();
  }

  useEffect(() => {
    handleFetchActivity();
  }, []);

  return (
    <div className={`ActivityWgt ${theme === 'light' ? 'light' : 'dark'}`} >
      <div className="widget-header">
        <>ACTIVITY</>
        <div className='buttons' >
          <Button variant="outlined" className='clearButton' onClick={handleClearActivity}>Clear Activity</Button>
          <ImportExportOutlinedIcon onClick={sortData} className='icon' />
          <CachedOutlinedIcon onClick={handleFetchActivity} className='icon' />
        </div>
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
            {activities.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={"grid-row"}
              >
                {columns.map((column) => (
                  <td key={column.field} id={`td-${column.field}`} className="grid-cell">
                    {row[column.field]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Activity