import React from 'react';
import ListIcon from 'material-ui/svg-icons/action/list';
import InfoIcon from 'material-ui/svg-icons/action/info';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import FolderIcon from 'material-ui/svg-icons/file/folder'; 
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import GridIcon from 'material-ui/svg-icons/image/grid-on'; 
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import Avatar from 'material-ui/Avatar';
import profPic from './images/twitter-person-image.png';
import { checkLogin, getFolderList, getLoggedInUser } from './login';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {SelectField, TextField} from 'material-ui';
import driveLogo from './images/Hasura_Drive_image.png';
import blue200 from 'material-ui/styles/colors';
import { SMALL } from 'material-ui/utils/withWidth';

import MyDrawer from './MyDrawer';


const styles = {


    Left:{
        display: 'flex',
        flexFlow: 'row wrap',
        AlignContent: 'stretch',
        ALignItems: 'baseline',
        width: 190,
        marginLeft: 50
    },
    Login:{
        height: 700,
        width: 50
    },
    TextEntry:{
        width: 500  

    },
    fBUtton:{
        padding:0,
        margin: 0
    },
    cfmButton:{
        marginTop: 5
    }

}
class MYlist extends React.Component{
    render()
    {
      
        return(
            <Paper >
            <Menu className="menu">
                <MenuItem primaryText="settings"/>
                <MenuItem primaryText="Download Backup and Sync for Windows"/>
                <MenuItem primaryText="Keyboard shortcuts"/>
                <MenuItem primaryText="Help"/>
                </Menu>
                </Paper>
        );
    }
}
export default class AppBarRight extends React.Component {
    constructor(props) {
        super(props);
        this.state = {open: false,
                     show:false,
                     change:true,
                     showLogin:false,
                     hvName: '',
                     hvPwd: '',
                     hvCpwd: '',
                     isSignUp: false,
                     loginType: "Sign in",
                     showLoginErrorDialog: false
                    };
        this.handleClick=this.handleClick.bind(this);
        this.handleToggle=this.handleToggle.bind(this);
        this.handleChange=this.handleChange.bind(this);

      }

      getFolders = () => {
        var userCred = getLoggedInUser();

        var data = {
            hvName: this.state.hvName,
            hvPwd: this.state.hvPwd,
            hvfldrid: userCred.rtpthid
            }
        var x = getFolderList(data);
        console.log(x);
      }
      handleLogoClick = () => {
        alert("logo clicked");


        if(!this.state.isSignUp)
        {
            var cred = {
                hvName: this.state.hvName,
                hvPwd: this.state.hvPwd
                }
        } else {
            var cred = {
                hvName: this.state.hvName,
                hvPwd: this.state.hvPwd,
                hvCpwd: this.state.hvCpwd
                }
        }
        
        if (!checkLogin(cred))
        {
            alert("User with same username already exists. Please try with a different username");
        }
        //setErrorText(undefined);
      };
      handleToggle = () => this.setState({open: !this.state.open});
      handleChange=()=>this.setState({change: !this.state.change});
      handleClick =()=> this.setState({show: !this.state.show});
      
      setSignUp = () => {
        this.setState({isSignUp: true});
        this.setState({loginType: "Sign Up"});
      }

      

      state = {
        open: false,
      };
    
      handleOpen = () => {
        this.setState({showLogin: true});
      };
    
      handleClose = () => { 
        this.setState({showLogin: false});
        this.setState({isSignUp: false});
      };

      handleSubmit = () => {
        /*if (this.state.isSignUp){
            console.log(this.state.hvPwd);
            //var password1 = this.state.hvPwd;
            //var password2 = this.state.hwCpwd;
            console.log(this.state.hvCpwd);
            if(password1 !== password2) {
                alert("Password and confirmations don't match! Please try again");
                return;
            }
        } */ 
        this.handleLogoClick();
        this.setState({showLogin: false});
      };

      handleErrorInputChange = (e) => {
        if (e.target.id === 'userName') {
          var userName = e.target.value;
  
          this.setState({
              hvName: userName
          });
          /*this.setState({
            //name: name,
            errorTextName: e.target.value ? '' : 'Please, type your Name'
          });*/
        } else if (e.target.id === 'password') {
          var password = e.target.value;

          this.setState({
                hvPwd: password,
           });
        } else if (e.target.id === 'cfmPassword') {
            var cfmPassword = e.target.value;
  
            this.setState({
                  hvCpwd: cfmPassword
             });
      }
    }
  
    render()
    {
        const actions = [
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <FlatButton
              label={this.state.loginType}
              primary={true}
              onClick={this.handleSubmit}
            />,
          ];
        return (
            <div style={styles.Left} className="iconColor">
                    <IconButton tooltip="Grid View" tooltipPosition="bottom-center" onClick={this.getFolders}  >
                        <GridIcon color= '#757575'/>
                    </IconButton>

                    <IconButton tooltip="Grid View" tooltipPosition="bottom-center" >
                        <NotificationIcon color= '#757575'/>
                    </IconButton>

                    <IconButton >
                        <Avatar className="profilePic" src={profPic} alt="profPic" round="true" onClick={this.handleOpen} />
                            <Dialog
                            actions={actions}
                            modal={true}
                            open={this.state.showLogin}
                            contentStyle={{width: 450, height: 1000}}
                            >
                                <img className="driveLogo" src={driveLogo} alt="driveLogo"  />
                                <br />
                                <br />
                                <strong>Sign in</strong><br />
                                to continue to Hasura Drive
                                <br />
                                <br />
                                <TextField
                                    id="userName"
                                    hintText="User Name"
                                    floatingLabelText="User Name"
                                    errorText="Enter your user name"
                                    onChange={this.handleErrorInputChange}
                                /><br />
                                <TextField
                                    id="password"
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    errorText="Enter your password"
                                    type="password"
                                    onChange={this.handleErrorInputChange}
                                /><br />
                                <br />
                                If not existing user, please 
                                    <FlatButton 
                                        id="signUPlink" 
                                        style={styles.fBUtton} 
                                        onClick={this.setSignUp} 
                                        label="Sign Up"
                                        primary={true}> 
                                    </FlatButton> 
                                first
                                <TextField
                                style={styles.cfmPassword}
                                id="cfmPassword"
                                hintText="Confirm Password"
        
                                type="password"
                                disabled={!this.state.isSignUp}
                                onChange={this.handleErrorInputChange}
                                /><br />
                                <br />
                                
                            </Dialog>

                    </IconButton>
                    
                    {this.state.change ? <IconButton tooltip="Grid View" tooltipPosition="bottom-center" onClick={this.handleChange}>
                        <GridIcon color= '#757575'/>
                    </IconButton>
                    :
                     <IconButton tooltip="List View"  tooltipPosition="bottom-center" onClick={this.handleChange}  >
                     <ListIcon color= '#757575'/>
                 </IconButton>
                 }
                    
                   
                    <IconButton tooltip="View details"  tooltipPosition="bottom-center" onClick ={this.handleToggle}  >
                        <InfoIcon color= '#757575' />
                    </IconButton>
                    <IconButton tooltip="Settings"  tooltipPosition="bottom-center">
                        <SettingsIcon onClick={this.handleClick}  color= '#757575'/>
                    </IconButton>

                    <Drawer width={250} openSecondary={true} open={this.state.open} containerStyle={{ top: 144}} style={{display: 'flex'}}>
                         <AppBar   title="My Drive" 
                                    
                                    iconElementLeft={<IconButton>
                                                        <FolderIcon color= '#616161'/>
                                                    </IconButton> } 
                                    iconElementRight={<IconButton onClick={this.handleToggle}>
                                                        <CloseIcon color= '#616161'/>
                                                    </IconButton>} /> 
                        <MyDrawer/>
                        
                    </Drawer>

                    {this.state.show? <MYlist/>: null}
             </div>
        );    
    }
}