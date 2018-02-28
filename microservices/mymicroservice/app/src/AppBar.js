import React from 'react';
import Paper from 'material-ui/Paper';
import AppBarLeft from './AppBarLeft';
import AppBarCenter from './AppBarCenter';
import AppBarRight from './AppBarRight';
import MyDriveList from './MyDriveList';
import { getLoggedInUser } from './login';

export default  class AppBar extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            RenderList1: false,
            // The state that will be passed as props to MyDriveList
            FileName: "",
            ZI: "0",
        }
      this.handleRenderList1=this.handleRenderList1.bind(this);
      this.handleVanishList1=this.handleVanishList1.bind(this);
      this.toReRender=this.toReRender.bind(this);
    }
    handleRenderList1()
    {
        this.setState({RenderList1: true});
        if(!getLoggedInUser().userName){
            this.setState({RenderList1: false});
        }

    }
    handleVanishList1()
    {
        this.setState({RenderList1: false})
    }
    //The function that sets the fileName state and triggers render
    toReRender(name)
    {
        this.setState({FileName: name});
       
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
                                    
                <AppBarLeft update ={this.toReRender} />
                <AppBarCenter update ={this.toReRender} />
                <AppBarRight render={this.handleRenderList1} vanish={this.handleVanishList1}/>
               
               
            </Paper>
             
          
          {this.state.RenderList1 ? 
          <div>
          <MyDriveList props={this.state.FileName} ZI={this.state.ZI}/> 
          </div>
          :null}
           </div>
        );
        
    }
}