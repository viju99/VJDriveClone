import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import FileIcon from './images/GDocs.png'; 
import FolderIcon from './images/folder.png';


export default class Cards extends React.Component{
    
    render(){
     
     
      return(
    <Card>
    <CardHeader
      title="Recent activity"
      avatar={this.props.type=="File"? FileIcon: FolderIcon}
    />
    
    
    <CardTitle title={this.props.name} subtitle={this.props.desc} />
  
  </Card>
);
    }
}
