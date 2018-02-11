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
import profPic from './images/Hasura-face-new.jpg';
import {getFolderList, getLoggedInUser, logout, resetUserCredentials } from './login';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {TextField} from 'material-ui';
import driveLogo from './images/Hasura_Drive_image.png';
import MyDrawer from './MyDrawer';
import {getDetails} from './login';
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
                     showLoginErrorDialog: false,
                     success: false,
                     showSnack: false
                     };
        this.handleClick=this.handleClick.bind(this);
        this.handleToggle=this.handleToggle.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleRequestClose=this.handleRequestClose.bind(this);
        this.handleRequestOpen=this.handleRequestOpen.bind(this);
      }
      handleRequestOpen =()=>
      {
        this.setState({showSnack: true});
      }
      handleRequestClose =()=>
      {
        this.setState({showSnack: false});
      }
     
      getFolders = () => {
        var userCred = getLoggedInUser();
        var data = {
            hvName: this.state.hvName,
            hvPwd: this.state.hvPwd,
            hvfldrid: userCred.rtpthid
            }
        var x = getFolderList(data);
        console.log('x=: '+x);
       }
    
      handleLogoClick = () => {
        var cred= {};
        if(!this.state.isSignUp)
        {
             cred = {
                hvName: this.state.hvName,
                hvPwd: this.state.hvPwd
                };
        } else {
             cred = {
                hvName: this.state.hvName,
                hvPwd: this.state.hvPwd,
                hvCpwd: this.state.hvCpwd
                };
        }
        getDetails(cred).then( (loginresp) => {
      
       if(loginresp[0]["username"])
       {
        console.log(loginresp[0]);
        this.setState({ success: true} );
        this.props.render();
       }
       else
       {
           alert("Username and Password do not match. Please try again");
           this.setState({showLogin: false});
           this.setState({success: false});
           this.setState({loginType: "Sign in"});
       }
      
       
    }
        )
    }
      
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
      handleSignOutClose = () => {

      }

      handleSubmit = () => {
        
        if(!this.state.success)
        {
            this.handleLogoClick();
         }

         else{
             this.handleSignOut();
         }
        this.setState({showLogin: false});
        
        this.state.loginType === "Sign Out" ? 
            this.setState({loginType: "Sign in"}) : 
            this.setState({loginType: "Sign Out"});
      };

      handleErrorInputChange = (e) => {
        if (e.target.id === 'userName') {
          var userName = e.target.value;
  
          this.setState({
              hvName: userName
          });
          
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

    handleSignOut = () => {
        const status = logout();
        if (status)
        {
            this.setState({showSnackBarLogout: true });
            this.props.vanish();
           
        }
        
        alert("User has been signed out");
        this.setState({showLogin: false});
        this.setState({success: false});
        resetUserCredentials();
        this.props.handler();
    }
    handleCancelSignOut = (e) => {
        this.setState({showLogin: false});
    }
  
    render()
    {
       // alert("ABBarRight rendering");
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
            />
          ];
        return (

            <div >
            <div style={styles.Left} className="iconColor">
                    <IconButton tooltip="Grid View" tooltipPosition="bottom-center" onClick={this.getFolders}  >
                        <GridIcon color= '#212121'/>
                    </IconButton>

                    <IconButton tooltip="Grid View" tooltipPosition="bottom-center" >
                        <NotificationIcon color= '#212121'/>
                    </IconButton>

                    <IconButton >
                        <Avatar className="profilePic" src={profPic} alt="profPic" round="true" onClick={this.handleOpen} />
                            <Dialog
                            actions={actions}
                            modal={true}
                            open={this.state.showLogin}
                            contentStyle={{width: 450, height: 1000}}
                            >
                            {this.state.success ?
                                <div>
                                    <Avatar className="profilePic" src={profPic} alt="profPic" round="true"/>
                                    <h4> Logged in user : {this.state.hvName} </h4>

                                </div>
                                :
                                <div>
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
                                </div>
                                
                            }
                                
                            </Dialog>

                    </IconButton>
                    
                    {this.state.change ? <IconButton tooltip="Grid View" tooltipPosition="bottom-center" onClick={this.handleChange}>
                        <GridIcon color= '#212121'/>
                    </IconButton>
                    :
                     <IconButton tooltip="List View"  tooltipPosition="bottom-center" onClick={this.handleChange}  >
                     <ListIcon color= '#212121'/>
                 </IconButton>
                 }
                    
                   
                    <IconButton tooltip="View details"  tooltipPosition="bottom-center" onClick ={this.handleToggle}  >
                        <InfoIcon color= '#212121' />
                    </IconButton>
                    <IconButton tooltip="Settings"  tooltipPosition="bottom-center">
                        <SettingsIcon onClick={this.handleClick}  color= '#212121'/>
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
             
           
             </div>
             
        );    
       
    }
   
}