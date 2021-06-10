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
import { DataGrid } from '@material-ui/data-grid';
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const columns = [
  { field: 'creditorName', headerName: 'Creditor name', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'minPaymentPercentage',
    headerName: 'Min pay',
    type: 'number',
    width: 90,
  },
  {
    field: 'balance',
    headerName: 'Balance',
    type: 'number',
    width: 90,
  },
];


    export default function BasicTable() {
      const classes = useStyles();

      const [test, setTest ] = useState([]);
      const [total, setTotal ] = useState([]);
      const [rowCount, setRowCount ] = useState([]);
      const [rowsChecked, setRowsChecked ] = useState([]);

      const selected = useRef({});
      useEffect(() => {
        // setLoading(true);
        (async () => {
          let res;
          let error;
    
          try {
            res = (await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')).data
            console.log('-----res-----');
            console.log(res);
            res.forEach(element =>  element.checked = false);
            setTest(res)
            setRowCount(res.length)
    
          } catch(e) {
            // Process any errors here.
            // error = e;
          }
        })();},[]);

        useEffect(() => {
         let total = 0;
          test.forEach(item => {
            total += item.balance;
          })
          setTotal(total)
          console.log(total);
          setRowCount(test.length)
          setRowsChecked(0)  
        },[test]);

        // let rowCount = test.length();
        

          function checked(row) {      
            console.log(row);
          test.forEach(item => {
            if(row === item.id){
            item.checked = !item.checked
          }
          })

          let checked = 0 
          test.forEach(item => {
            if(item.checked){
            checked++;
          }
          })

          setTest(test)
          setRowsChecked(checked)  


          console.log(test);
        } 

        function deleteRows() {      
          // console.log('hi');
          let temp = []
          test.forEach(item => {
          if(!item.checked){
            temp.push(item);
        }
        })
        setTest(temp)
        setRowsChecked(0)  
        // console.log(test);
      }

        // let test = [];

    return (
      <div>
  <TableContainer component={Paper}>
      <Table  className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
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
                    <TableCell padding="checkbox">
                      <input type="checkbox" onChange={ev=>checked(row.id)}/>
                      </TableCell>
              <TableCell component="th" scope="row">
                {row.creditorName}
              </TableCell>
              <TableCell align="right">{row.firstName}</TableCell>
              <TableCell align="right">{row.lastName}</TableCell>
              <TableCell align="right">{row.minPaymentPercentage}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
              <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="right">TOTAL:  {total}</TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
            <p>Total Rows: {rowCount}</p>
            <p>Checked Rows: {rowsChecked}</p>

  <button onClick={ev => deleteRows()}>Delete Checked Rows</button>

  </div>
    );
  }
