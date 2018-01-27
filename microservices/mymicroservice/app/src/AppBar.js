import React from 'react';
import Paper from 'material-ui/Paper';
import AppBarLeft from './AppBarLeft';
import AppBarCenter from './AppBarCenter';
import AppBarRight from './AppBarRight';
const styles = {
    appbar: {
    height: 130,
    width: '100%',
    position: 'fixed',
    display: 'flex',
    flexFlow: 'row nowrap',
   
    },

  };

export default  class AppBar extends React.Component
{

    render()
    {
        return(
            <Paper style={styles.appbar} zDepth={3} >
               
                <AppBarLeft/>
                <AppBarCenter/>
                <AppBarRight/>
            </Paper>
        );
    }
}
