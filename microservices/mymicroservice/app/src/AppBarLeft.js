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
        this.state = {
            showComponent1: false, 
            appear: 'inline', 
            ZI: "0",
    };
        this.handleClick=this.handleClick.bind(this);
        this.handler = this.handler.bind(this)
        
      }
      handler(e) {
          
        this.setState({
            appear: 'none'
        });
        this.setState({
            ZI: "0",
           });
        
      }
    
      handleClick=() =>
      {
        this.setState({
            showComponent: true,
          });

        this.setState({
         appear: 'inline',
        });
        this.setState({
            ZI: "-1",
           });
       
      }

    render(){
        return(
            <div>
            <div style={styles.Left}>
            <img className="driveLogo" src={driveLogo} alt="driveLogo" />
            <br/>
            <br/>
            <FlatButton className= "newbutton" label="New" backgroundColor="#222" onClick ={this.handleClick}/>
            {this.state.showComponent?  <MyMenu id="1" appear ={this.state.appear} action={this.handler} />: null}  
            </div>
            <MyMenu style= {{position: 'absolute', }} ZI={this.state.ZI} />
            </div>
        );
    }
}