import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


    export default function BasicTable() {
      const classes = useStyles();

      const [test, setTest ] = useState([]);

      useEffect(() => {
        // setLoading(true);
        (async () => {
          let res;
          let error;
    
          try {
            res = (await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')).data
            console.log('-----res-----');
            console.log(res);
            setTest(res)
    
          } catch(e) {
            // Process any errors here.
            // error = e;
          }
        })();},[]);

        // let test = [];

    return (
      <TableContainer component={Paper}>
      <Table  className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Creditor</TableCell>
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Min Pay</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {test.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.creditorName}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.minPaymentPercentage}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
  }
