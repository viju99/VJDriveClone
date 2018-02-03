import React from 'react';
import Paper from 'material-ui/Paper';
import AppBarLeft from './AppBarLeft';
import AppBarCenter from './AppBarCenter';
import AppBarRight from './AppBarRight';
import {deepOrange400, grey50} from 'material-ui/styles/colors';
import MyDriveList from './MyDriveList';
const styles = {

  //  justifyContent: 'space-between',



  };

export default  class AppBar extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            RenderList1: false
        }
      this.handleRenderList1=this.handleRenderList1.bind(this);
    }
          handleRenderList1()
  {
      alert("Handler called in AppBar");
    this.setState({RenderList1: true})
  }
    render()
    {
       
        return(
            <div style={{diplay:'flex', overflowY:'hidden'}}>
            <Paper style={{
                            height: 130,
                            width: '100%',
                            position: 'fixed',
                            display: 'flex',
                            flexFlow: 'row nowrap',
                            justifyContent:  'space-between',
                            backgroundColor : this.props.themee,}} 
                    zDepth={3}  >
                                    
                <AppBarLeft/>
                <AppBarCenter/>
                <AppBarRight handler={this.handleRenderList1}/>
               
               
            </Paper>
             
          
          {this.state.RenderList1 ? <MyDriveList/> :null}
           </div>
        );
        
    }
}
//{this.state.RenderList1 ?this.props.handler:null }