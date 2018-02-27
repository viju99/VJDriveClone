import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
//import {setSelectedRowDetails} from './MyDriveList';
import {setActivityInfo,getLoggedInUser, getActivity } from './login';
import {List, ListItem} from 'material-ui/List';

import FileIcon from './images/GDocs.png'; 

export default class MyDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TData: [{}],
      pID: "",
     }
     var TData1=[{}];
  }

  setActivityInfo()
  {

   // alert("inside setAct fun"+this.state.pID);
    this.setState({pID: getLoggedInUser().rtpthid});
    var u=getLoggedInUser();
    var data={
      hvfldrid: u.rtpthid,
     
    }
  
    getActivity(data, getLoggedInUser().token).then((res) => {
      console.log(res[0]);
       this.setState({TData: res[0]});
     //this.TData1=res[0];
    }
    )
  }
 /* shouldComponentUpdate(nextProps, nextState)
  {
    
    
      if(this.state.TData!==nextState.TData )
        return true;
      else
        return false;
    
  }*/
  
  render() {
    var pID=getLoggedInUser().rtpthid;
    if(pID!=this.state.pID)
    {
      this.setActivityInfo();
    }
   if(this.state.TData){ 
    return (
     
      <div>

          <List>
          {this.state.TData.map( (row, index) => (
          <ListItem primaryText={row.obj_nm} 
                   // leftIcon={<FileIcon/>} 
                   // onClick={() =>this.handleBrowse(getLoggedInUser().rtpthid)}
                    initiallyOpen={false}
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      
                      
                          <ListItem
                                    primaryText = {row.act_desc} 
                                   // onClick={() =>this.handleBrowse(row.path_id)}
                                    />
                         
                      
                ]} />
                
                ))}
                
            </List>

      </div>
    );
  }
  else{
    return(<div></div>);
  }
  }
}