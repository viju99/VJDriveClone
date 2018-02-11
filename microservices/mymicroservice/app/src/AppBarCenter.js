import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
import MyMenu from './MyMenu';
import TopMenu from './TopMenu'
import {BrowserRouter} from 'react-router-dom';
const styles = {
    customWidth: {
      width: 500
    },
    Container:
    {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        marginLeft: 20,

    }
  };

export default class AppBarCenter extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: 1,showComponent: false, appear: 'inline'};
        this.handler = this.handler.bind(this)
      }
    
      state = {
        searchText: '',
      };
      handleOpen=() =>
      {
        this.setState({
            showComponent: true,
          });
          this.setState({
           appear: 'inline',
          });
      }
      handleClose =() =>
      {
        this.setState({showComponent: false})
      }
      handleUpdateInput = (searchText) => {
        this.setState({
          searchText: searchText,
        });
      };
      
    
      handleNewRequest = () => {
        this.setState({
          searchText: '',
        });
      };
      handler(e) {
       
        this.setState({
           appear: 'none'
        })
      };
    
     
    render(){
        return (
            <div style={styles.Container}>
           
       
          <TopMenu/>
          <br/>
          <FlatButton className= "dropbutton"
                        label="My drive"
                        labelPosition="before"
                        primary={true}
                        icon={<DetailsIcon  color = '#fff'/>}
                        onClick={this.handleOpen} 
                        backgroundColor="#222"
                    
                      
            />
            
           
            {this.state.showComponent?  <MyMenu id="1" appear ={this.state.appear} action={this.handler} />: null} 
            </div>
        );
    }
}