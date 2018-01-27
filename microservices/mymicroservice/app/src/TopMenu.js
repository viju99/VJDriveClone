import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import './App.css';
import SearchSVGIcon from 'material-ui/svg-icons/action/search';
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import gridIcon from './images/Grid-Image.png'; 
import Avatar from 'material-ui/Avatar';
import profPic from './images/twitter-person-image.png';
import driveLogo from './images/Hasura_Drive_image.png';
import { checkLogin } from './login';





const styles = {
  customWidth: {
    width: 500
  },
};

const appList = [
  'PDFs',
  'Text documents',
  'Spreadsheets',
  'Presentations',
  'Photos & Images',
  'Videos'
];

const iconStyles = {
  marginRight: 20,
  marginTop: 23
};

const searchIconStyles = {
  marginRight: 20,
  marginTop: 14,
  marginLeft: 8
};

export default class TopMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  state = {
    searchText: '',
  };

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

  handleLogoClick = () => {
    alert("logo clicked");
    
    const text = {
        hvName: "t47user29",
        hvPwd: "sankarXYZ",
        hvCpwd: "sankarXYZ"
    }
    alert(text);
    checkLogin(text);
    //setErrorText(undefined);
  };

  handleSubmit() {
    const text = {
        hvName: "vj",
        hvPwd: "sankar",
        hvCpwd: "sankar"
    }
    alert(text.hvName);
    checkLogin(text);
    //setErrorText(undefined);

};

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div className="trial">
    
        <div className="TopMenu">
          <SearchSVGIcon style={searchIconStyles} />
          <AutoComplete className="AutoComplete"
            width={styles.customWidth.width}
            hintText="Search Drive"
            searchText={this.state.searchText}
            onUpdateInput={this.handleUpdateInput}
            onNewRequest={this.handleNewRequest}
            dataSource={appList}
            filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
            openOnFocus={true}
            underlineShow={false}
          />
        </div>
      
      </div>
    );
  }
}

