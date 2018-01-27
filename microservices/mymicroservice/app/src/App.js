import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopMenu from './TopMenu.js';
import MyMenu from './MyMenu';
import Menu from 'material-ui/Menu/Menu';
import MyDriveList from './MyDriveList';
 

class App extends Component {
  render() {
    return (
      <MuiThemeProvider >
        <div className="App">
        
        <AppBar style= {{position: 'absolute'}}/>
        <MyMenu style= {{position: 'absolute'}}/>
        <MyDriveList/>
       </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
