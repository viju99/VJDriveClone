import React from 'react';
import driveLogo from './images/Hasura_Drive_image.png';
import FlatButton from 'material-ui/FlatButton';
import MyMenu from './MyMenu';
const styles=
{
    Left:
    {
        marginLeft: 20,
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch', 
     


    }
}
export default class AppBarLeft extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {showComponent1: false};
        this.handleClick=this.handleClick.bind(this);
        this.handler = this.handler.bind(this)
        
      }
      handler(e) {
        e.preventDefault()
        this.setState({
            showComponent: false
        })
      }
    
      handleClick=() =>
      {
        this.setState({
            showComponent: ! this.state.showComponent,
          });
      }
    render(){
        return(
            <div style={styles.Left}>
            <img className="driveLogo" src={driveLogo} alt="driveLogo" />
            <br/>
            <FlatButton className= "newbutton" label="New" backgroundColor="#0091EA" onClick ={this.handleClick}/>
            {this.state.showComponent?  <MyMenu id="1" action = {this.handler} />: null}  
            </div>
        );
    }
}