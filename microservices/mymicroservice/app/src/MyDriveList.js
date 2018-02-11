import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import FileIcon from './images/GDocs.png'; 
import FolderIcon from './images/folder.png';
import {getLoggedInUser,setLoggedInUser,downloadFile,getDetailsofFolders,getDetailsofFiles,getPromiseOfUploadFile,getPromiseOfFolderInfoUpdate} from './login';
import Paper from 'material-ui/Paper';
import {info} from './MyMenu';
const styles= {
  height: 600,
  marginTop: 150,
  marginLeft: 200,
  width: '70%',
  overflow: 'auto',
 
}

export default class MyDriveList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      hvName: this.props.hvName,
      hvPwd: this.props.hvPwd,
      TData: [{}],
      success: false,
     }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSelection=this.handleSelection.bind(this);

  }
  
 handleSelection(selectedRow){
  const TData = this.state.TData;
     var file_id="";
     file_id=TData[selectedRow]["file_id"] ;
     if(!file_id)
     {
       var fldrid= TData[selectedRow]["path_id"] ;
       if(fldrid){
         var userDetails = getLoggedInUser();
         userDetails.rtpthid = fldrid;
         setLoggedInUser(userDetails.userName, 
                         userDetails.token, 
                         userDetails.rtpthid, 
                         userDetails.hasura_id);
         userDetails = getLoggedInUser();
         this.componentDidMount();
         return;
       }
       alert("select a file please");
       return;
     }
     var file_name=TData[selectedRow]["file_name"] ;

     var auth_token=getLoggedInUser().token;
     console.log("auth_token is "+auth_token);
     console.log("file_id is "+file_id)
     downloadFile(file_id,file_name,auth_token);
 }
 
 
 componentDidMount() {
   alert("componentDidMount");
   var data = {
       hvfldrid: getLoggedInUser().rtpthid
       } 
       var arrayFiles =  [{}];
       var arrayMix = [{}];
        getDetailsofFolders(data).then( (tableData) => {arrayFiles = tableData[0];} )
        getDetailsofFiles(data).then( (fileData) => {
         var file=fileData[0];
         arrayMix = arrayFiles.concat(file);
      
         this.setState({ TData: arrayMix} ); 
         console.log("set state called");
        
        })
  }
 
//the nextProps will be the fileName of the new file uploaded sent via props from MyMenu.
componentWillReceiveProps(nextProps)
{
  alert("nextProps: "+nextProps.props);
  alert("props now: "+this.props.props);
 if(nextProps.props!==this.props.props)
 {
   alert("Not equal");
  var data = {
    hvfldrid: getLoggedInUser().rtpthid
    } 
    var arrayFiles =  [{}];
    var arrayMix = [{}];
     getDetailsofFolders(data).then( (tableData) => {arrayFiles = tableData[0];} )
     getDetailsofFiles(data).then( (fileData) => {
      var file=fileData[0];
      arrayMix = arrayFiles.concat(file);

      //this setState triggers Render()
      this.setState({ TData: arrayMix} ); 
      
      console.log(this.state.TData);
     
     })
}
}

  render(){
   alert("render()");
   var TData=this.state.TData;
    var uName=getLoggedInUser().userName;
    if(TData){
    return (
      <div style={{}}>
       <Paper style= {styles}>
        <Table selectable = {true} onRowSelection={this.handleSelection}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow selectable={true} onCellClick={this.thefn}>
            <TableHeaderColumn > </TableHeaderColumn>
                <TableHeaderColumn >Name</TableHeaderColumn>
                
                <TableHeaderColumn>Owner</TableHeaderColumn>
                <TableHeaderColumn>Last modified by me</TableHeaderColumn>
                <TableHeaderColumn>Size</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody  displayRowCheckbox={false} deselectOnClickaway={false}>
                  {this.state.TData.map( (row, index) => (
                    <TableRow  key={index} >
                      <TableRowColumn>{row.path_nm ?<img src={FolderIcon} alt="folder" height='20' width='30'/>: <img src={FileIcon} alt="folder" height='20' width='30'/>}</TableRowColumn>
                      <TableRowColumn>{row.path_nm ?row.path_nm : row.file_name}</TableRowColumn>
                      <TableRowColumn>{uName}</TableRowColumn>
                      <TableRowColumn>{row.modified_at}</TableRowColumn>
                      <TableRowColumn>{row.file_name? row.file_size: '-'}</TableRowColumn>
          </TableRow>
                    ))}
            </TableBody>
        </Table>
        </Paper>
      </div>
  );
}


  }
}

