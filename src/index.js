import React, { Component } from 'react';
import { render } from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import BasicTable from './BasicTable'


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});




class App extends Component{
  constructor(){
    super();
    this.state = {

    };
  }

    render(){
    return (
    <div>
      <BasicTable/>
    </div>
    );
  }
}

render(<App />, document.querySelector('#root'));