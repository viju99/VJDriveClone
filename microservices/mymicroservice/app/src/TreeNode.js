import React from 'react';
import {List, ListItem} from 'material-ui/List';

export default class TreeNode extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          visible: true,
      };
    }
    
    toggle = () => {
      this.setState({visible: !this.state.visible});
    };
    
    render() {
      var childNodes;
      var classObj;
      if (this.props.node.childNodes != null) {
        childNodes = this.props.node.childNodes.map(function(node, index) {
          return <li key={index}><TreeNode node={node} /></li>
        });
  
      }
  
      var style;
      if (!this.state.visible) {
        style = {display: "none"};
      }
  
      return (
        <div>
          <h5 onClick={this.toggle} >
            {this.props.node.title}
          </h5>
          <List>
          <ul style={style}>
            {childNodes}
          </ul>
          </List>
        </div>
      );
    }
  }
  
