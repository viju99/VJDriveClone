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
import {Dialog} from 'material-ui';
import {getLoggedInUser,getPromiseOfUploadFile,getPromiseOfFolderInfoUpdate,getPromiseOfFolderCreation} from './login.js';
import {List, ListItem} from 'material-ui/List';
import MyDriveList, { handleFileUpload } from './MyDriveList';
export var info={};
export function  setUploadedData(data)
{
   info=data;
  console.log(info);
}

export default class MyMenu extends  React.Component
{
  //==================

  constructor(props) {
    super(props);
    this.state = {open: false,
                 show:false,
                 change:true,
                 showUpload:false,
                 showNewFolder: false,
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
    console.log(file.name);
    const authToken = getLoggedInUser().token;
    if (!authToken) {
      //this.showAlert('Please login first. Go to /auth to login');
      return;
    }
    const folderId = getLoggedInUser().rtpthid;
    var data = {
      hvfname: file.name,
      hvfldrid: folderId
      }
      var folderData = {
        hvfname: file.name,
        hvfldrid: data.hvfldrid,
        hvfileid: "",
        hvfilesize: ""
      }
    
    //this.showProgressIndicator(true)
    getPromiseOfUploadFile(data, authToken).then(response => {
      //this.showProgressIndicator(false)
      console.log(response[0]);
      if (response[0]["file_id"]) {
        alert("Upload of file named " + file.name + ". Status - " + response[0]["file_status"]);
        folderData.hvfileid = response[0]["file_id"];
        folderData.hvfilesize = response[0]["file_size"];
        console.log(folderData);
        getPromiseOfFolderInfoUpdate(folderData, authToken).then(response => {

          console.log(response);
          //On successful file Upload, passes the FileName through props function to parent(AppBarLeft).
          this.props.update(file.name);
       
        }).catch(error => {
          console.log('File upload failed: ' + error);
        });

      
     
      } else {
        alert("File upload failed because of an internal error");
      }
    }).catch(error => {
      console.log('File upload failed: ' + error);
    });
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////

  handleCreateFolder = (folderName) => {
    console.log(folderName);
    const authToken = getLoggedInUser().token;
    if (!authToken) {
      alert('Please login first to access features of the Drive');
      return;
    }
    const folderId = getLoggedInUser().rtpthid;
    var data = {
      hvfldrname: folderName,
      hvfldrid: folderId
      }
      
    //this.showProgressIndicator(true)
    getPromiseOfFolderCreation(data, authToken).then(response => {
      //this.showProgressIndicator(false)
      console.log(response[0]);
      this.props.update(response[0]);
    }).catch(error => {
      console.log('Folder creation failed : ' + error);
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

  handleNewFolderOpen = (e) => {
    console.log("Setting showNewFolder as true. Dialog should open now");
    this.setState({showNewFolder: true});
  };

  handleClose = () => { 
    this.setState({showUpload: false});
    this.setState({showNewFolder: false});
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
      
    };
    
  }; 


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
        secondary={true}
        onClick={(e) => {
          e.preventDefault();
          //var pathId = {this.getUserPathId}
          const input = document.querySelector('input[type="file"]');
          if (input.files[0]) {
           this.handleFileUpload(input.files[0])
          } else {
            alert("Please select a file");
          }
          this.handleClose();
        }
      }/> 
    ];

    const actionsNewFolder = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Create"
        secondary={true}
        onClick={(e) => {
          e.preventDefault();
          //var pathId = {this.getUserPathId}
          //const input = document.querySelectorAll('input[type="text"]');
          var folderName = '';
          var input = document.getElementById('newFolder');
          if( input.value != "" && !/^\d{1,}$/.test(input.value) ){
            folderName = input.value;
          }
          else{
            alert("Please provide a valid name for the new folder");
            return false;
          }
          this.handleCreateFolder(folderName);
          this.handleClose();
        }
      }/> 
    ];
    /* needs an eventlistener that will call {this.props.action}, a funcyion defined in line 28 of AppBarLeft and line 73 of
     AppBarRight wich changes the state of showComponent to false */

    if(this.props.id==="1"){
     
      return(
      <div >
       
          <Paper style={{position: 'absolute', zIndex: 1}}  >
          <Menu desktop={true} width={320} className="menu" style= {{display: this.props.appear}} onMouseLeave= {this.props.action} >
            <MenuItem primaryText="New Folder.."  leftIcon={<CFolderIcon/>} onClick={this.handleNewFolderOpen}/>
            <Divider /> 
            <MenuItem primaryText="Upload Files.." leftIcon={<UFileIcon/>} onClick={this.handleOpen} />
            
            <MenuItem primaryText="Upload Folder" leftIcon={<FolderIcon/>}  />
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
                                  
                  <br />               
            </Dialog>
            <Dialog
            actions={actionsNewFolder}
            modal={true}
            open={this.state.showNewFolder}
            contentStyle={{width: 450, height: 600}}
            >
                <img className="driveLogo" src={driveLogo} alt="driveLogo" />
                <br />
                <br />
                <br />
                <h1>New Folder</h1>
                <div>
                  <input type="text" id="newFolder" placeholder="Create Folder"/>                   
                </div> &nbsp;
                                
                <br />               
          </Dialog>
      </div>
    );
    }
    else if(this.props.id==='2')
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

