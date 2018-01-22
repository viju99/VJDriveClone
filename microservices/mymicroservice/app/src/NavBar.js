import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';

import {List, ListItem} from 'material-ui/List';
import TopMenu from './TopMenu.js';
import Paper from 'material-ui/Paper';

const style = {
    height: 350,
    width: 230,
   marginTop: 70,
  marginLeft: -130,
  display: 'flex', flexFlow: 'column',
    textAlign: 'center',
   position: 'absolute',
  };

  export class DMenu extends React.Component{
      render()
      {
          return(
            <div>
           
           <List style= {style}>
                <FlatButton label= "New Folder"/>
                <FlatButton label=  "Upload files"/>
                <FlatButton label= "Upload folder"/>
                <FlatButton label=" Google docs"/>
                <FlatButton label=" Google Sheets"/>
                <FlatButton label=" Google Slides" />
                <FlatButton label= "More"/>
            </List>
         
            </div>
          );
      }
  }

export default class NavBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {showComponent: false};
        this.handleClick=this.handleClick.bind(this);
      }
      handleClick=() =>
      {
        this.setState({
            showComponent: ! this.state.showComponent,
          });
      }
    render()
    {
        return(
          <div>
            
            <ul className="navbarleftdiv">
             <li className="navbarlistitem" ><FlatButton className= "newbutton" label="New" backgroundColor="#2962FF" /></li>
                    <li className="navbarlistitem"> 
                    <FlatButton className= "dropbutton"
                        label="My drive"
                        labelPosition="before"
                        primary={true}
                        icon={<DetailsIcon  color = '#21212' />}
                        onClick={this.handleClick}
                        />
                    </li>
                  <li> {this.state.showComponent? 
                       <DMenu/>: null}  </li>
                 </ul>
                 
             </div>
        );

    }
}