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
    userName: ''
}
export function getLoggedInUser() {
    return loginUser.userName;
}
export function setLoggedInUser(userName) {
    loginUser.userName = userName;
    console.log("Username set as"+ loginUser.userName);
}
export function checkLogin(data) {
    console.log('Posting request to API...');
    var url = '';
    if (data.hvCpwd)
    {
        url = 'https://app.animator94.hasura-app.io/dregister'
    }
    else {
        url = 'https://app.animator94.hasura-app.io/dlogin'
    } 
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
    }).then(function(response) {
        if (response.status >= 200 && response.status < 300) {
            console.log("retirning response.json function");
            var obj = JSON.stringify(response.body);
            var cookies = response.headers.cookies;
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
                setLoggedInUser(data['username']);
                console.log(document.cookie);
                console.log("cookie printer");
            }
            else {
                console.log("User sign up/in failed becaue - "+ data['message']);
            }
        }
        else{
            return false;
        }
    });
  }

  export function signUpNewUser(data) {

  }
  //{"auth_token":"3af1682cf0c585452595b5294b698b46fb279c84ac7ad756","username":"vijay4534","hasura_id":168,"hasura_roles":["user"]}