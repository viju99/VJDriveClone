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
import {getLoggedInUser,getActivity, getQaccessed, setLoggedInUser,downloadFile,getDetailsofFolders,getDetailsofFiles, getlogAct, } from './login';
import Paper from 'material-ui/Paper';
import history from './history';
import Cards from './Cards';
const styles= {
  position: 'absolute',
  height: 600,
 // marginTop: 50,
 // marginLeft: 250,
  width: '70%',
  overflow: 'auto',
  zIndex: -1,
 
}
const styless= {
  position: 'relative',
  //height: 500,
  marginTop: 150,
  // marginLeft: 400,
  width: 100,
 // overflow: 'auto',
  zIndex: -1,
  display: 'flex',
  flexFlow: 'row ',
  justifyContent: 'flex-end',

}
// style={{display:'flex', flexFlow:'column'}}
export class ListOfCard extends React.Component{
  render()
  {
    //alert("why are you not getting rendered?");
    var wow=this.props.data;
    console.log(wow)
   /* if(wow.length===0)
    {
      return(
        <div style={{ paddingLeft: '50%',}}>
          <h2>Recent Activity</h2>
          <h3> No activity yet</h3>
          </div>
      );
    }*/
    return(
      
      <div style={{position: 'absolute', width: '100%', display: 'flex',   flexFlow: 'row nowrap ', justifyContent: 'flex-start', zIndex:-1 }}>
               
{wow.map( (row, index) => (
        <Cards name={row.obj_nm} desc={row.act_desc} type={row.obj_type}/>
      
    ))}

    </div>
    );
  
  }
}
/*export default class MyDriveList extends React.Component{
  render()
  {
    return(<div>
      <BrowserRouter>
      <Route exact path="/" component={MyDriveList1}/>

      </BrowserRouter>
    </div>);
  }
}*/
export default class MyDriveList1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      TData: [{}],
      QData: [{}],
     }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleSelection=this.handleSelection.bind(this);
    this.loadTable = this.loadTable.bind(this);
  }
  loadTable(pathid)
  {
    var data = {
      hvfldrid: pathid
      } 
      var arrayFiles =  [{}];
      var arrayMix = [{}];
       getDetailsofFolders(data).then( (tableData) => {
         arrayFiles = tableData[0];
       getDetailsofFiles(data).then( (fileData) => {
        var file=fileData[0];
        arrayMix = arrayFiles.concat(file);
        this.setState({ TData: arrayMix} ); 
        console.log("set state called");
        console.log(this.state.TData);
       })
      } )
      return
  }
 handleSelection(selectedRow){
    const TData = this.state.TData;
    var logactData ={
      hvfileid: TData[selectedRow]["file_id"],
      hvfname: TData[selectedRow]["file_name"],
      //hvfldrid:getLoggedInUser().rtpthid,
      hvfldrid:TData[selectedRow]["file_path_id"],
      hvfilesize: TData[selectedRow]["file_size"],
      hvobjtype: "File",
      hvobjname: TData[selectedRow]["file_name"],
      hvactname: "Download",
      hvactdesc: "You Downloaded a File recently",
     }

    if(TData[selectedRow]["path_id"]) //it's a folder
     {
       var obj=getLoggedInUser();
       setLoggedInUser(obj.userName, obj.token, TData[selectedRow]["path_id"], obj.hasura_id)
       this.loadTable(TData[selectedRow]["path_id"]);
       this.setActivityInfo();

     }
     else // it's a file
     {
       downloadFile(TData[selectedRow]["file_id"],TData[selectedRow]["file_name"],getLoggedInUser().token );
    //   var obj= logAct(logactData, getLoggedInUser().token)
       getlogAct(logactData, getLoggedInUser().token).then(res=>{console.log(res)});
      
     }
     //history.push("/");
     
 }
 setQuickAccess(){
  var u=getLoggedInUser();
  var data={
    hvfldrid: u.rtpthid
  }
  var data1, i;
  getQaccessed(data, getLoggedInUser().token).then((res) => {
     data1=res[0];
     console.log("The quick access : "+data1);
     this.setState({QData: data1});
  })}
 
  setActivityInfo()
  {
    //alert("voila !");
    var u=getLoggedInUser();
    var data={
      hvfldrid: u.rtpthid
    }
    getActivity(data, getLoggedInUser().token).then((res) => {
      console.log(" activity for this folder"+res[0]);
      var i;
      for(i=0;i<res[0].length;i++)
      {
     //  console.log(res[i]["act_desc"]+" "+res[i]["obj_nm"]);
      }
    }
    )
  }
 componentDidMount() {
   
  this.loadTable(getLoggedInUser().rtpthid);
  this.setQuickAccess();
  //this.setActivityInfo();
  }
 
componentWillReceiveProps(nextProps)
{
  console.log("going to call the activity..");

  var u=getLoggedInUser();
  var data={
    hvfldrid: u.rtpthid
  }
  getActivity(data, getLoggedInUser().token).then((res) => {
  console.log(res[0]);
  var i;
  for(i=0;i<res[0].length;i++)
  {
 //     console.log(res[i]["act_desc"]+" "+res[i]["obj_nm"]);
  }
}
)
 if(nextProps.props!==this.props.props)
 {
  
console.log("going to call the table..");
this.loadTable(getLoggedInUser().rtpthid);

}
}

  render(){
   
   
   var TData=this.state.TData;
   console.log("length of Tdata: "+TData.length);
    var uName=getLoggedInUser().userName;
    if(TData.length>0){
    return (
     
    <div style={{position : 'absolute ', display: 'flex',   flexFlow: 'column wrap',marginLeft: 250, marginTop: 150 }}>
      <ListOfCard data={this.state.QData}/>
     <br/>
     <div>
       <Paper style={{position : 'fixed', marginTop: 200, width: '85%',zIndex:-1}}>
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
                  {TData.map( (row, index) => (
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
      </div>
  );
}
else
return(    <div style={{position : 'absolute ', display: 'flex',   flexFlow: 'column wrap',marginLeft: 250, marginTop: 150 }}>
<h3>Go ahead and Upload files/folders </h3></div>);

  }
}

