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
    const [total, setTotal ] = useState([]);
    const [rowCount, setRowCount ] = useState([]);
    const [rowsChecked, setRowsChecked ] = useState([]);
    const [bank, setBank ] = useState([]);
    const [balance, setBalance ] = useState([]);
    // const [allRowsChecked, setAllRowsChecked ] = useState([]);
    
    // Intial call to get the data
    useEffect(() => {
      // setLoading(true);
      (async () => {
        let res;
        let error;
  
        try {
          res = (await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')).data
          // console.log('-----res-----');
          // console.log(res);
          // add
          res.forEach(element =>  element.checked = false);
          setTest(res)
          setRowCount(res.length)
  
        } catch(e) {
          // Process any errors here.
          // error = e;
        }
      })();},[]);

      // goes through all the rows and adds the total balance
    useEffect(() => {
      let total = 0;
      test.forEach(item => {
        total += item.balance;
      })
      setTotal(total)
      console.log(total);
      setRowCount(test.length)
      setRowsChecked(0)
      // setAllRowsChecked(false)  
    },[test]);

    
    // toggles the checked value in each row
    function checked(row) {      
      // console.log(row);
      test.forEach(item => {
      if(row === item.id){
        item.checked = !item.checked;
        }
      })
      let checked = 0 
      test.forEach(item => {
        if(item.checked){
        checked++;
        }
      })
      setTest(test); 
      setRowsChecked(checked)
    }  

    function allChecked(ev, checked) {      
      console.log(ev.target.checked);
      
      if (ev.target.checked){
          test.forEach(item => {
          item.checked = true;}
          )
          // console.log(test.length)
          setRowsChecked(test.length)    
        }
      else {
        test.forEach(item => {
          item.checked = false;}
          )
          // console.log(test.length)
          setRowsChecked(0)
      }  
      setTest(test)
    } 

    //deletes all rows that are checked 
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

    // adds new Balance
    function addUser(ev) {  
      ev.preventDefault()    
      
      // console.log('hi');
      let temp = {}
      temp.id = test.length + 1;
      temp.creditorName = bank;
      temp.balance = balance * 1;
      temp.checked = false;
      let newTest = [...test, temp]
      setTest(newTest);  
      // console.log(newTest);
  }

  // pretty sure this is supposed to be done a bit differently
  // I am new to react hooks so I jut modified my knowledge of state to work here 
  function onChange(ev){
    if (ev.target.name === 'bank'){
      setBank(ev.target.value)
    }
    if (ev.target.name === 'balance'){
      setBalance(ev.target.value)
    }
    // console.log(bank)
    // console.log(balance)
  }
    
  return (
    <div>
      <TableContainer component={Paper}>
        <Table  className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell padding="checkbox">
                  <input type="checkbox" onClick={(ev)=>allChecked(ev)} />
                  </TableCell>
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
                  <input type="checkbox" checked = { row.checked } onChange = {ev=>checked(row.id) }/>
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

      <br></br>
      <br></br>
      <form onSubmit = { ev => addUser(ev) }>
          Bank
          <input name='bank'  value = { bank } onChange = { onChange }/>
          Balance
          <input name='balance' value = { balance } onChange = { onChange }/>
          
          <button >SAVE</button>
      </form>
  </div>
  );
}
