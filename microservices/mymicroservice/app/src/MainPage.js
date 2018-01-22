import React from 'react';
import AppBar from 'material-ui/AppBar';
import NavBar from './NavBar';

export default class MainPage extends React.Component{
    render()
    {
        return (
            <div>
                 <AppBar showMenuIconButton={false} className= "navbar" zDepth={0} 
                    title={<NavBar/>} /> 
            </div>
        );
    }
}