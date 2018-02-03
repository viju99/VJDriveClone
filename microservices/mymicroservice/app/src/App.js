import React, { Component } from 'react';
import './App.css';
import AppBar from './AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TopMenu from './TopMenu.js';
import MyMenu from './MyMenu';
import Menu from 'material-ui/Menu/Menu';
import MyDriveList from './MyDriveList';
import Toggle from 'material-ui/Toggle';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themee: '#FF5722' ,
    
    };
    this.handleToggle=this.handleToggle.bind(this);
   
  }
 
  handleToggle()
  {
    if(this.state.themee=='#fff')
      this.setState({themee: '#FF5722'});
    else
    this.setState({themee: '#fff'});
   
  }

  render() {
    return (
      <MuiThemeProvider >
        <div className="App" style={{postion: 'absolute', zIndex: 0}}>
      
        <AppBar themee=
        {this.state.themee}/>
        
        <style>{'body { background-color: #EEEEEE; }'}</style>
       
        
    
       </div>
       
      </MuiThemeProvider>
    );
  }
}

export default App;
// <Toggle onToggle={this.handleToggle} />
