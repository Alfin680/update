import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import './Donarlist.css';
import { Button } from '@mui/material';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  

const Requests = () => {
  const [receivers, setReceiver] = useState([]);

  useEffect(() => {
    fetchReceivers();
  }, []);

  const fetchReceivers = async () => {
    try {
      const response = await axios.get('http://localhost:15000/acc/receiver'); // Make API request to fetch donors
      setReceiver(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:15000/acc/delete', { _id: id });
      fetchReceivers(); // Fetch donors again to update the list after deletion
      console.log('Blood request deleted successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='Donation'>
        <TableContainer style={{margin: "15px", borderRadius: "10px" }} component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">NAME</StyledTableCell>
                <StyledTableCell align="center">BLOOD GROUP</StyledTableCell>
                <StyledTableCell align="center">EMAIL</StyledTableCell>
                <StyledTableCell align="center">MOBILE NUMBER</StyledTableCell>
                <StyledTableCell align="center">ACCEPT</StyledTableCell>
                <StyledTableCell align="center">DECLINE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {receivers.map((receiver,index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row" align="center">
                    {receiver.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{receiver.bloodGroup}</StyledTableCell>
                  <StyledTableCell align="center">{receiver.email}</StyledTableCell>
                  <StyledTableCell align="center">{receiver.phone}</StyledTableCell>
                  <StyledTableCell align="center"><Button variant="outlined" color="error">Accept</Button></StyledTableCell>
                  <StyledTableCell align="center"><Button variant="contained" color="error" onClick={() => handleDelete(receiver._id)}>Decline</Button></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          </TableContainer>
    </div>
  )
}

export default Requests