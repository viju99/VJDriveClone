import React from 'react';
import {getLoggedInUser, getActivity } from './login';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
export default class MyDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TData: [{}],
      pID: "",
     }
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
      var A=res[0];
    //  alert(typeof A[0]["obj_nm"]);
      A.reverse();
      this.setState({TData: A});
    //   this.setState({TData: res[0]});
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
    if(pID!==this.state.pID)
    {
      this.setActivityInfo();
    }
    if(this.state.TData.length>0){
   if(this.state.TData[0]["modified_at"]){ 
    return (
     
      <div>
          
          {this.state.TData.map( (row, index) => (
           <List>
          <ListItem key={index}
          
          style={{position: 'inherit'}}
          primaryText={row.act_desc +`\n`+ row.obj_nm}  secondaryText={row.modified_at.toString().slice(0,9)}
                
                    />,
                   <Divider/>
                   </List>
                ))}
               
           


      </div>
    );
  }
  else{
    return(<div></div>);
  }
}
  else{
    return(<div></div>);
  }
  }
}

/**  */