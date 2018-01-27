import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';


import MyMenu from './MyMenu';


 

export default class NavBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {showComponent1: false,
            showComponent2: false    };
        this.handleClick1=this.handleClick1.bind(this);
        this.handleClick2=this.handleClick2.bind(this);
      }
      handleClick1=() =>
      {
        this.setState({
            showComponent1: ! this.state.showComponent1,
          });
      }
      handleClick2=() =>
      {
        this.setState({
            showComponent2: ! this.state.showComponent2,
          });
      }
    render()
    {
        return(
          <div>
            
            <ul className="navbarleftdiv">
             <li className="navbarlistitem" style={{ marginLeft: -40,}} >
                 <FlatButton className= "newbutton" label="New" backgroundColor="#2962FF" onClick={this.handleClick1}/>
             </li>
            {this.state.showComponent1? <MyMenu />: null}  

            <li className="navbarlistitem" style={{ marginLeft: 250,}}> 
                <FlatButton className= "dropbutton"
                        label="My drive"
                        labelPosition="before"
                        primary={true}
                        icon={<DetailsIcon  color = '#21212' />}
                        onClick={this.handleClick2}
                        />
            </li>
             {this.state.showComponent2?  <MyMenu />: null}  
            </ul>
                 
             </div>
        );

    }
}