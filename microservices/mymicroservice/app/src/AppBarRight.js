import React from 'react';
import ListIcon from 'material-ui/svg-icons/action/list';
import InfoIcon from 'material-ui/svg-icons/action/info';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';

export default class AppBarRight extends React.Component
{
    render()
    {
        return (
            <div style={{ display: 'flex'}}>
                
                        <IconButton tooltip="List View"  tooltipPosition="bottom-center"  >
                            <ListIcon/>
                        </IconButton>
                        <IconButton tooltip="View details"  tooltipPosition="bottom-center" >
                    <InfoIcon/>
                    </IconButton>
                    <IconButton tooltip="Settings"  tooltipPosition="bottom-center" >
                    <SettingsIcon/>
                    </IconButton>
             </div>
        );    }
}