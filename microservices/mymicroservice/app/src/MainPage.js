import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './NavBar';
import AppBarRight from './AppBarRight';
export default  class MainPage extends React.Component
{
    render()
    {
        return(
    <AppBar showMenuIconButton={false} className="navbar" zDepth={0} 
    title={<NavBar/> } iconElementRight={<AppBarRight/>}/>
        );
    }
}