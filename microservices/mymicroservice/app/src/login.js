import fetch from 'isomorphic-fetch';

/*export function checkLogin(data) {
    console.log("this is data"+ data);
return fetch('https://app.animator94.hasura-app.io/dregister', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => {
    if (response.status >= 200 && response.status < 300) {
        console.log("Request worked");
        //console.log(response.body[me]);

       // var json = JSON.stringify(response);
        console.log(JSON.stringify(response.json));
     
        
        //window.location.reload();
        return response;
      } else {
       console.log('Something went wrong here');
      }
}).catch(err => err);
}*/
const loginUser = {
    userName: '',
    token: '',
    rtpthid: '',
    hasura_id: ''
}
const mapOfFiles = {}
const mapOfFolders = {}
export function getFoldersOfUser(userName){
    
    return mapOfFolders;
}
export function getFilesOfUser(userName){
    
    return mapOfFiles;
}

export function getLoggedInUser() {
    return loginUser;
}
export function setLoggedInUser(userName, token, rtpthid, hasura_id) {
    loginUser.userName = userName;
    loginUser.token = token;
    loginUser.rtpthid = rtpthid;
    loginUser.hasuraId = hasura_id;

    console.log("Username set as"+ loginUser.userName + '' + token);
}
export function checkLogin(data) {
    console.log('Posting request to API...');
    var url = '';
    if (data.hvCpwd)
    {
        //url = 'https://app.animator94.hasura-app.io/dregister'
        url = 'https://t47d.anthology78.hasura-app.io/dregister'
    }
    else {
        //url = 'https://app.animator94.hasura-app.io/dlogin'
        url = 'https://t47d.anthology78.hasura-app.io/dlogin'
    } 
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
    }).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            console.log("retirning response.json function");
            var obj = JSON.stringify(response.body);
            var length = document.cookie.length;
            if (response.headers){
                for (var pair of response.headers.entries()) {
                    console.log(pair[0]+ ': '+ pair[1]);
                 }
            }
            return response.json();
        }
        else{
            return null;
        }
    }).then(function(data) {
        if(data){
            console.log("printing returned value");
            if (data["auth_token"])
            {
                console.log("User logged in. Username is : " + data['username'] + " and user id is "+ data['hasura_id']);
                setLoggedInUser(data['username'],data["auth_token"],data["rtpthid"],data["hasura_id"]);
            }
            else {
                console.log("User sign up/in failed becaue - "+ data['message']);
            }
            return true;
        }
        else{
            return false;
        }
    });
  }

  export function getFolderList(data) {
    console.log('Posting folder request to API...');
    var url = '';
    if (data)
    {
       // url = 'https://app.animator94.hasura-app.io/dregister'
        url = 'https://t47d.anthology78.hasura-app.io/fldrlist'
    }
   
    fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
    }).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            console.log("retirning response.json function");
            var obj = JSON.stringify(response.body);
            return response.json();
        }
        else{
            return null;
        }
    }).then(function(responsedata) {
        if(responsedata){
            console.log(responsedata);
            return true;
        }
        else{
            return false;
        }
    });
  }


  export function signUpNewUser(data) {

  }
  //{"auth_token":"3af1682cf0c585452595b5294b698b46fb279c84ac7ad756","username":"vijay4534","hasura_id":168,"hasura_roles":["user"]}