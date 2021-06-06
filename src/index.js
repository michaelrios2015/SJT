import React, { Component } from 'react';
import { render } from 'react-dom';
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

// function createData(id, creditorName, firstName, lastName, minPaymentPercentage, balance) {
//   return { id, creditorName, firstName, lastName, minPaymentPercentage, balance };
// }


class App extends Component{
  constructor(){
    super();
    this.state = {
      users: [],
      loading: true,
      test: [],
      rows: []
    };
  }
  async componentDidMount(){
    this.setState({
      users: (await axios.get('/api/users')).data,
      loading: false,
      test: (await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')).data
    });
    // let tempRows = this.state.test.forEach(element => {
    //   createData(element)
    // });
    // console.log(tempRows);
  }
  render(){
    const { users, loading, test } = this.state;
    if(loading){
      return '....loading';
    }
    console.log(test)
    // let tempRows = []
    // test.forEach(element => {
    //   tempRows.push(createData(element))
    // });
    // console.log(tempRows)
    // const classes = useStyles();
    return (
      <TableContainer component={Paper}>
      <Table  aria-label="simple table">
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
}

render(<App />, document.querySelector('#root'));