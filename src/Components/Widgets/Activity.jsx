import React, { useEffect, useState } from 'react';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import '../../Style/Activity.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Snackbar, SnackbarContent } from '@mui/material';
import ImportExportOutlinedIcon from '@mui/icons-material/ImportExportOutlined';

function Activity({ loading, setLoading }) {

  const apiUrl = process.env.REACT_APP_API_URL;

  const theme = useSelector(state => state.theme.theme);

  const [rows, setRows] = useState([]);

  const userId = useSelector(state => state.auth.loggedUser.id);

  const token = useSelector(state => state.auth.token);

  const [openSnackbar, setOpenSnackBar] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [sortOrder, setSortOrder] = useState('desc');

  const columns = [
    { field: 'date' },
    { field: 'activity' }
  ];

  const handleClick = (message) => {
    setSnackbarMessage(message);
    setOpenSnackBar(true);
  };

  const fetchActivity = async () => {
    try {
      const response = await axios.get(`${apiUrl}/activities/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const sortedData = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRows(sortedData);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        if (error.response.status === 401) {
          handleClick('Unauthorized: Please enter a valid email and password.');
        } else {
          console.error('Server Error:', error.response.data);
          handleClick('An error occurred while processing your request. Please try again later.');
        }
      } else if (error.request) {
        console.error('Network Error:', error.request);
        handleClick('Network Error: Please check your internet connection.');
      } else {
        console.error('Error:', error.message);
        handleClick('An error occurred. Please try again later.');
      }
    };
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  const sortData = () => {
    const sortedRows = [...rows].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      if (sortOrder === 'asc') {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });

    setRows(sortedRows);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className={`ActivityWgt ${theme === 'light' ? 'light' : 'dark'}`} >
      <div className="widget-header">
        <>ACTIVITY</>
        <div className='buttons' >
          <ImportExportOutlinedIcon onClick={sortData} className='icon' />
          <CachedOutlinedIcon onClick={fetchActivity} className='icon' />
        </div>
      </div>
      <div className="widget-body">
        <table className="grid">
          <tbody>
            {rows.map((row, rowIndex) => (
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

      <Snackbar className='snackbar'
        open={openSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}>
        <SnackbarContent
          style={{
            fontSize: '12px',
            fontFamily: 'Raleway',
            minWidth: 'fit-content',
          }}
          message={snackbarMessage}
        />
      </Snackbar>

    </div>
  )
}

export default Activity