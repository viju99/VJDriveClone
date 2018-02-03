import React from 'react';



import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {setSelectedRowDetails} from './MyDriveList';


export default class MyDrawer extends React.Component {


  render() {
    return (
      <div>
        
          <Table  selectable = {false}>
            <TableBody  displayRowCheckbox={false} >
              <TableRow >
                <TableRowColumn>Type</TableRowColumn>
                <TableRowColumn>--</TableRowColumn>
              </TableRow>
              <TableRow >
                <TableRowColumn>Location</TableRowColumn>
                <TableRowColumn>--</TableRowColumn>
              </TableRow>
              <TableRow >
                <TableRowColumn>Type</TableRowColumn>
                <TableRowColumn>--</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
       
      </div>
    );
  }
}