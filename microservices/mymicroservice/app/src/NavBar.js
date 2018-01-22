import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import DetailsIcon from 'material-ui/svg-icons/image/details';
export default class NavBar extends React.Component
{
    render()
    {
        return(
            <div className="navbarleftdiv">
                <ul>

                    <li className="navbarlistitem" ><FlatButton className= "newbutton" label="New" backgroundColor="#2962FF" /></li>
                    <li className="navbarlistitem"> 
                    <FlatButton className= "dropbutton"
                        label="My drive"
                        labelPosition="before"
                        primary={true}
                        icon={<DetailsIcon style={{}}/>}
                        />
                    </li>
                </ul>
            </div>
        );

    }
}