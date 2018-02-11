import fetch from 'isomorphic-fetch';
import { projectConfig } from './config';
import download from 'downloadjs';

export const loginUser = {
    userName: '',
    token: '',
    rtpthid: '',
    hasura_id: ''
}
export const status= false;
const mapOfFiles = {}
const mapOfFolders = {}
export function getFoldersOfUser(userName){
    
    return mapOfFolders;
}
export function getFilesOfUser(userName){
    
    return mapOfFiles;
}

export function getLoggedInUser() {
    console.log("reached getLoggedInUser");
    return loginUser;
}

export function resetUserCredentials()
{
    setLoggedInUser("","","","");
}
export function setLoggedInUser(userName, token, rtpthid, hasura_id) {
    loginUser.userName = userName;
    loginUser.token = token;
    loginUser.rtpthid = rtpthid;
    loginUser.hasura_id = hasura_id;

    console.log("Username set as"+ loginUser.userName + '' + token);
}

export function downloadFile(file_id,file_name, authToken){

    var url = projectConfig.url.filestore + '/' + file_id;
    console.log("GET to url : "+url);

    var requestOptions = {
        method: "GET",
        
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + authToken
    }
    
    };

    fetch(url, requestOptions)
    .then(function(response) {
    return response.blob();
    })
    .then(function(blob) {
   
    console.log(blob);
    download(blob, file_name, "text/plain");
    })
    .catch(function(error) {
    console.log('Request Failed:' + error);
    });

}

  export async function checkLogin(data) {
    console.log('Posting request to API...');
    var url = '';
    if (data.hvCpwd)
    {
        url = projectConfig.url.register;
        
    }
    else {
        url = projectConfig.url.login;
    } 

    let responseObject =  await (await fetch(url,{
        method: 'post',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
          }
      })).json();
      if(responseObject['username']){
        console.log("User logged in. Username is : " + responseObject['username'] + " and user id is "+ responseObject['hasura_id']);
                setLoggedInUser(responseObject['username'],responseObject["auth_token"],responseObject["rtpthid"],responseObject["hasura_id"]);
      }
        return responseObject;
  }
  export function getDetails(data){
    return Promise.all([checkLogin(data)])
  }

  export function getDetailsofFolders(data){
    return Promise.all([getFolderList(data)])
  }

  export function getDetailsofFiles(data){
    return Promise.all([getFileList(data)])
  }



  export function signUpNewUser(data) {

  }
  export function getPromise(){
    return Promise.all([checkLogin()]);
  }
  
  //=============================================================


  export async function getFileList(data) {
    console.log('Posting filelist request to API...');
    var url = '';

    if (data)
    {
        url = projectConfig.url.filelist;
    }

    let responseObject = await (await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
    })).json();
   
     if(responseObject){
        var i = 0;
        for (i=0; i < responseObject.length; i++ ){    
                console.log('Item '+ i +' -> '+ responseObject[i]["file_name"] );
        }
        return responseObject;
    }
    else{
        return null;
    }
  }

//===================================================

export async function getFolderList(data) {
    console.log('Posting folder request to API...');
    var url = '';

    if (data)
    {
        url = projectConfig.url.folderList;
    }

    let responseObject = await (await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
        }
    })).json();
   
     if(responseObject){
        var i = 0;
        for (i=0; i < responseObject.length; i++ ){    
                console.log('Item '+ i +' -> '+ responseObject[i]["path_nm"] );
        }
        return responseObject;
    }
    else{
        return null;
    }
  }

  export async function uploadFile(data, authToken) {
    const uuidv4 = require('uuid/v4');
    var fileId = uuidv4();
    console.log(JSON.stringify(data));
    const options = {
        method: 'POST',
        body: data.hvfname,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
        }
      };
    console.log(projectConfig.url.filestore);
    let responseObject = await( await fetch(projectConfig.url.filestore+'/'+fileId, options)
    ).json();

    if(responseObject){
        var i = 0;
        for (i=0; i < responseObject.length; i++ ){    
                console.log('Item '+ i +' -> '+ responseObject[i]["file_name"] );
        }
        return responseObject;
    }

  }
  export function getPromiseOfUploadFile(data, authToken){
    return Promise.all([uploadFile(data, authToken)]);
  }

  export async function logout() {
    console.log('Posting logout request sent to API...');
    var url = '';
    const userName = getLoggedInUser().userName;
    const authToken = getLoggedInUser().token;
    if (userName)
    {
        
        url = projectConfig.url.logout;
    }
    else {
        return false;
    } 
    var userCred = {
        hvName: userName
        };

    let responseObject =  await (await fetch(url,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(userCred),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
          }
      })).json();
      console.log("User " + userName +" has been successfully logged out");
      return responseObject;
  }

  export async function updateFolderInfoOfFile(data,authToken) {
    console.log('Posting logout request sent to API...');
    var url = '';
    const userName = getLoggedInUser().userName;
    
    if (userName)
    {
        
        url = projectConfig.url.folderUpdate;
    }
    else {
        return false;
    } 

    let responseObject =  await (await fetch(url,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
          }
      })).json();
      console.log("Folder info updated for file");
      return responseObject;
  }

  export function getPromiseOfFolderInfoUpdate(data, authToken){
    return Promise.all([updateFolderInfoOfFile(data, authToken)]);
  } 

  export async function createFolder(data,authToken) {
    console.log('Posting create folder sent to API...');
    var url = '';
    const userName = getLoggedInUser().userName;
    
    if (userName)
    {
        
        url = projectConfig.url.createFolder;
    }
    else {
        return false;
    } 

    let responseObject =  await (await fetch(url,{
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + authToken
          }
      })).json();
      console.log("Folder added in database");
      return responseObject;
  }

  export function getPromiseOfFolderCreation(data,authToken){
      return Promise.all([createFolder(data, authToken)]);
  }