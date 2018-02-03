import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import CFolderIcon from 'material-ui/svg-icons/file/create-new-folder'; 
import UFileIcon from 'material-ui/svg-icons/file/file-upload'; 
import FolderIcon from 'material-ui/svg-icons/file/folder'; 
import GdocsIcon from './images/GDocs.png';
import GSheetsIcon from './images/Sheets-icon.png';
import GSlidesIcon from './images/GSlides.png';
import PlusIcon from './images/plus-icon.png';
import GdrIcon from './images/Gdrawings.png';
import GFIcon from './images/GForms.png';
import GMIcon from './images/GMaps.png';
import GSIcon from './images/GSites2016.png';
import driveLogo from './images/Hasura_Drive_image.png';
import FlatButton from 'material-ui/FlatButton';
import {Dialog, TextField} from 'material-ui';
import { SelectField } from 'material-ui/SelectField';
import index from 'material-ui/Dialog';
import {getLoggedInUser, uploadFile} from './login.js';


import RaisedButton from 'material-ui/RaisedButton'
import {List, ListItem} from 'material-ui/List';


export default class MyMenu extends React.Component
{
  //==================

  constructor(props) {
    super(props);
    this.state = {open: false,
                 show:false,
                 change:true,
                 showUpload:false,
                 filePathnName: '',
                 Index: 0,
                 headerFileUpload: {
                  'Content-type': 'multipart/form-data',
                  'credentials' : 'include',
                },
                rtpthid: 0
                 
               
                };
    //this.handleUpload=this.handleUpload.bind(this);
    this.handleToggle=this.handleToggle.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.getUserPathId=this.getUserPathId.bind(this);  

  }


  handleFileUpload = (file) => {
    console.log(file);
    const authToken = getLoggedInUser().token;
    if (!authToken) {
      this.showAlert('Please login first. Go to /auth to login');
      return;
    }
    const folderId = getLoggedInUser().rtpthid;
    var data = {
      hvfname: file,
      hvfldrid: folderId
      }
    //this.showProgressIndicator(true)
    uploadFile(data, authToken).then(response => {
      //this.showProgressIndicator(false)
      console.log(response);
      if (response.file_id) {
        alert("File uploaded successfully");
        //this.showAlert("File uploaded successfully: " + JSON.stringify(response, null, 4));
      } else {
        //this.showAlert("File upload failed: " + JSON.stringify(response));
      }
    }).catch(error => {
      console.log('File upload failed: ' + error);
    });
  }

  handleToggle = () => this.setState({open: !this.state.open});
  handleChange=()=>this.setState({change: !this.state.change});
  handleClick =()=> this.setState({show: !this.state.show});


  state = {
    open: false,
  };

  handleOpen = (e) => {
   
    this.setState({showUpload: true});
  };

  handleClose = () => { 
    this.setState({showUpload: false});
  };

  getUserPathId = () => {
    var loginUser = getLoggedInUser();
    this.setState({rtpthid: loginUser.rtpthid});
  }

  handleErrorInputChange = (e) => {
    if (e.target.id === 'filePathnName') {
      var fileDetails = e.target.value;

      this.setState({
        filePathnName: fileDetails
      });
      /*this.setState({
        //name: name,
        errorTextName: e.target.value ? '' : 'Please, type your Name'
      });*/
    };
    
  }; 


  /*
  handleFileUpload = () => {
    var x = document.getElementById("fileToUpload");
    const fileName = x.files[0];
    
    console.log(fileName);
    var data = new FormData()
    data.append('hvfname', x.files[0])

    var arr = getLoggedInUser();
    
    //fetch('https://app.animator94.hasura-app.io/fupload', {
    fetch('https://t47d.anthology78.hasura-app.io/fupload', {
      method: 'POST',
      body: data,
      credentials: 'include',
      username: arr["userName"],
      headers: {
        "Authorization": 'Bearer ' + arr[1]
      }
    }).then(function(response) {
      console.log("Inside function response of file upload");
      if (response.status >= 200 && response.status < 300) {
          console.log("retirning response.json function");
          var obj = JSON.stringify(response.body);
          return response.json();
      }
      else{
          return null;
      }
  }).then(function(data) {
      if(data){
          console.log("printing returned value");
          if (data["file_id"])
          {
              console.log("File uploadedwith file id : " + data['file_id'] + " and size of the file is "+ data['size']+"bytes");
              //setLoggedInUser(data['username']);
          }
          else {
              console.log("User sign up/in failed becaue - "+ data['message']);
          }
      }
      else{
          return false;
      }
    });
    
  }
*/

  //=======================

  
  render()
  {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Upload"
        primary={true}
        onClick={this.handleClose}
      />,
    ];
    /* needs an eventlistener that will call {this.props.action}, a funcyion defined in line 28 of AppBarLeft and line 73 of
     AppBarRight wich changes the state of showComponent to false */

    if(this.props.id==="1"){
     
      return(
      <div >
       
          <Paper style={{position: 'absolute', zIndex: 1}}  >
          <Menu desktop={true} width={320} className="menu" style= {{display: this.props.appear}} onMouseLeave= {this.props.action} >
            <MenuItem primaryText="New Folder.."  leftIcon={<CFolderIcon/>} />
            <Divider /> 
            <MenuItem primaryText="Upload Files.." leftIcon={<UFileIcon/>} onClick={this.handleOpen} />
            
            <MenuItem primaryText="Upload Folder" leftIcon={<FolderIcon/>} />
            <Divider />
            <MenuItem
              primaryText="Google Docs"
              leftIcon={<img src={GdocsIcon} alt="googleDocs" />}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem primaryText="Blank document"/>,
                <MenuItem primaryText="Form a template"/>,
                ]}
            />
            <MenuItem
              primaryText="Google Sheets"
              leftIcon={<img src={GSheetsIcon} alt="gSheets" />}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem primaryText="Blank spread sheet"/>,
                <MenuItem primaryText="Form a template"/>,
              ]}
            />
            <MenuItem
              primaryText="Google Slides"
              leftIcon={<img src={GSlidesIcon} alt="googleSheets" />}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem primaryText="Blank presentation"/>,
                <MenuItem primaryText="Form a template"/>,
                  ]}
            />
            <MenuItem
              primaryText="More"
              leftIcon={<p></p>}
              rightIcon={<ArrowDropRight />}
              menuItems={[
                <MenuItem
                  primaryText="Google Forms"
                  leftIcon={<img src={GFIcon} alt="Forms" />}
                  rightIcon={<ArrowDropRight />}
                  menuItems={[
                    <MenuItem primaryText="Blank form"/>,
                    <MenuItem primaryText="Form a template"/>,
                    ]}
                  />,
                  <MenuItem primaryText="Google Drawings"  leftIcon={<img src={GdrIcon} color= '#616161'  alt="Dra" />}/>,
                  <MenuItem primaryText="Google My Maps"  leftIcon={<img src={GMIcon} color= '#616161'  alt="Maps" />}/>,
                  <MenuItem primaryText="Google Sites"  leftIcon={<img src={GSIcon} color= '#616161'  alt="Sites" />}/>,
                  <Divider/>,
                  <MenuItem primaryText="Connect More Apps"  leftIcon={<img src={PlusIcon} color= '#616161'  alt="pLus" />}/>
                ]}
                />
          </Menu>
          </Paper>
          <Dialog
              actions={actions}
              modal={true}
              open={this.state.showUpload}
              contentStyle={{width: 450, height: 600}}
              >
                  <img className="driveLogo" src={driveLogo} alt="driveLogo" />
                  <br />
                  <br />
                  <br />
                  <h1>File Upload</h1>
                  <div>
                    <input type="file" className="form-control" placeholder="Upload a file"/>                   
                  </div> &nbsp;
                  <FlatButton
                    label="Upload File"
                    secondary={true}
                    onClick={(e) => {
                      e.preventDefault();
                      //var pathId = {this.getUserPathId}
                      const input = document.querySelector('input[type="file"]');
                      if (input.files[0]) {
                        this.handleFileUpload(input.files[0])
                      } else {
                        this.showAlert("Please select a file")
                      }
                    }}/>                  
                  <br />               
              </Dialog>
      </div>
    );
    }
    else if(this.props.id=='2')
  {
    return(
      <div>
        <Menu>
      <MenuItem primaryText="Download" />
            
           <MenuItem primaryText="View Details"  />
          
           
           </Menu>
           </div>
    )
  }
    else 
    {
      return(
        <div >
         
           <List width={250} className="menu" style={{position: 'absolute', marginTop: 20, zIndex: -1}} >
          
              <ListItem
              primaryText="My Drive"
              leftIcon={<CFolderIcon />}
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="F1"
                  leftIcon={<CFolderIcon />}
                />,
                <ListItem
                  key={2}
                  primaryText="F2"
                  leftIcon={<CFolderIcon />}
                  
                  
                />,
              
              ]}
            />,
             
         
           <MenuItem primaryText="Computers" leftIcon={<UFileIcon/>} onClick={this.handleOpen} />
            
           <MenuItem primaryText="Shared with me" leftIcon={<FolderIcon/>} />
          
           <MenuItem primaryText="Recent" leftIcon={<FolderIcon/>} />
           <MenuItem primaryText="Google Photos" leftIcon={<FolderIcon/>} />
           <MenuItem primaryText="Starred" leftIcon={<FolderIcon/>} />
           <MenuItem primaryText="Trash" leftIcon={<FolderIcon/>} />
           <Divider/>
           <MenuItem primaryText="Backups" leftIcon={<FolderIcon/>} />
           <Divider/>
           <MenuItem primaryText="Upgrade storage" leftIcon={<FolderIcon/>} />

         </List>

      
        </div>
      );
    }
  }
}

/*

 <form action="https://t47d.anthology78.hasura-app.io/fupload" 
                        method="post" 
                        headers= {this.state.headerFileUpload}
                        encType="multipart/form-data" >
                      <p><input type="file" name="hvfname" /></p>
                      <p><input type="hidden" name="hvfldrid" value={this.state.rtpthid} /></p>
                      <p><input type="submit" value="Upload File" name="submit" onClick={this.getUserPathId}/></p>
                    </form>
                    

*/

/* Hasura type file upload JSX
<div>
                    <input type="file" className="form-control" placeholder="Upload a file"/>                   
                  </div> &nbsp;
                  <FlatButton
                    label="Upload File"
                    secondary={true}
                    onClick={(e) => {
                      e.preventDefault();
                      //var pathId = {this.getUserPathId}
                      const input = document.querySelector('input[type="file"]');
                      if (input.files[0]) {
                        this.handleFileUpload(input.files[0])
                      } else {
                        this.showAlert("Please select a file")
                      }
                    }}/>
*/