import os
import sys
from src import app
import requests
from flask import jsonify, render_template, request, make_response, json
from flask import redirect, url_for
from werkzeug import secure_filename
#import shutil

#-------------------------------------------------------------------------------
# Name:        DriveClone
# Purpose:
#
# Author:      PrithamS
#
# Created:     17-01-2018
# Copyright:   (c) PrithamS 2018
# Licence:     <your licence>
# Modified:    19-01-2018 - Include the Auth integration index(),registerpage(),
#                           dregister(),login(),page_not_found(error)
# Modified:    20-01-2018


#-------------------------------------------------------------------------------
CLUSTER_NAME = os.environ.get("CLUSTER_NAME")
if CLUSTER_NAME is None:
    print("""
    Set the name of your cluster as an environment variable and start again:

    $ export CLUSTER_NAME=<cluster-name>

    """)

UPLOAD_FOLDER = '/fuploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','docx','xlsx','pptx','md'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_COOKIE_HTTPONLY'] = False
DEF_USR_PATH = '/'
DEF_PRNT_PTHID = 0

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS



def r_folderlist(vauth,vhid,vpthid):
    # This is the url to which the query is made
    url = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "user_paths",
            "columns": [
                "path_nm",
                "path_id",
                "prnt_path_id",
                "created_at"
            ],
            "where": {
                "$and": [
                    {
                        "user_id": {
                            "$eq": vhid
                        }
                    },
                    {
                        "prnt_path_id": {
                            "$eq": vpthid
                        }
                    }
                ]
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp.content)
    return resp

def r_getfldrid(vauth,vhid,vpthnm):
    # This is the url to which the query is made
    url = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "user_paths",
            "columns": [
                "path_nm",
                "path_id",
                "prnt_path_id",
                "created_at"
            ],
            "where": {
                "$and": [
                    {
                        "user_id": {
                            "$eq": vhid
                        }
                    },
                    {
                        "path_nm": {
                            "$eq": vpthnm
                        }
                    }
                ]
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + vauth
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp.content)
    return resp


def r_filelist(vauth,vhid,vpthid):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload1 = {
        "type": "select",
        "args": {
            "table": "user_files",
            "columns": [
                "file_name",
                "file_id",
                "file_path_id",
                "created_at"
            ],
            "where": {
                "$and": [
                    {
                        "user_id": {
                            "$eq": vhid
                        }
                    },
                    {
                        "file_path_id": {
                            "$eq": vpthid
                        }
                    }
                ]
            }
        }
    }


    # Setting headers
    headers1 = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload1), headers=headers1)
    # resp.content contains the json response.
    print(resp1.content)

    return resp1

def r_userinfo(vauth,vhid):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "app_users",
                "columns": [
                    "username",
                    "hasura_id",
                    "root_path_id"
                ],
                "where": {
                    "hasura_id": {
                    "$eq": +vhid
                }
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp1.content)
    return resp1

def c_userdtl(vauth,vhid,usr,rtpthid):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "insert",
        "args": {
            "table": "app_users",
            "objects": [
                {
                    "username": usr,
                    "hasura_id": vhid,
                    "root_path_id": rtpthid,
                    "auth_token": vauth
                }
            ]
        }
    }


    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp1.content)
    return resp1


def r_userrtfldr(vauth,vhid):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "select",
        "args": {
            "table": "user_paths",
            "columns": [
                "path_id"
            ],
            "where": {
                "$and": [
                    {
                        "user_id": {
                            "$eq": vhid
                        }
                    },
                    {
                        "prnt_path_id": {
                            "$eq": "0"
                        }
                    }
                ]
            }
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp1.content)
    return resp1

def c_userfldr(vauth,vhid,vprntpthid,pthnm):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload = {
        "type": "insert",
        "args": {
            "table": "user_paths",
            "objects": [
                {
                    "path_nm": pthnm,
                    "prnt_path_id": vprntpthid,
                    "user_id": vhid
                }
            ]
        }
}


    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload), headers=headers)

    # resp.content contains the json response.
    print(resp1.content)
    return resp1

def c_fileupload(vauth,vhid,vpthid,vfilename,vfileid):
    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload1 = {
    "type": "insert",
       "args": {
           "table": "user_files",
            "objects": [
                {
                    "user_id": vhid,
                    "file_path_id": vpthid,
                    "file_name": vfilename,
                    "file_id": vfileid
                }
            ]
           }
       }

    # Setting headers
    headers1 = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + vauth
    }

    # Make the query and store response in resp
    resp1 = requests.request("POST", url1, data=json.dumps(requestPayload1), headers=headers1)

    # resp.content contains the json response.
    print(resp1.content)
    return resp1

def r_filedwnld(vauth,vhid,vpthid,vfilename,vfileid):
    # This is the url to which the query is made
    url = "https://filestore." + CLUSTER_NAME + ".hasura-app.io/v1/file/"+vfileid

    # Change the name of the file and the extension based on the file being downloaded
    filename = vfilename

    # Make the query
    resp = requests.get(url, stream=TRUE)

    # Save the data into the file
    #with open(filename, 'wb') as file_image
    #shutil.copyfileobj(resp.raw, file_image)

    print(resp.content)
    return resp.raw


@app.route("/")
def home():
    print(CLUSTER_NAME)
    return redirect(url_for('index'))

# Uncomment to add a new URL at /new

@app.route("/json")
def json_message():
    return jsonify(message="Hello World")

@app.route("/index")
def index():
    return render_template('dlogin.html')

@app.route("/cfldr/<pthid>")
def cfldr(pthid):
    return render_template('cfldr.html',pthid = pthid)

@app.route("/regdisplay", methods = ['POST', 'GET'])
def registerpage():
    return render_template('dregister.html')

@app.route("/dlogin", methods = ['POST'])
def dlogin():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/login"

    print(request.headers)
    print(request.data)
    print(request.json)
    print(request.is_json)
    content = request.json

    if request.method == 'POST':
        if request.content_type == 'application/json':
            vuser = content['hvName']
            vpwd = content['hvPwd']
        else:
            vuser = request.form['hvName']
            vpwd = request.form['hvPwd']

    # This is the json payload for the query
    requestPayload = {
        "provider": "username",
        "data": {
            "username": vuser,
            "password": vpwd
        }
    }

    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    print(requestPayload)
    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)
    # resp.content contains the json response.

    print(resp.content)
    if(resp.status_code >= 200 and resp.status_code < 300):
        vauthdata = resp.json()
        print(vauthdata['auth_token'])
        print(vauthdata['username'])
        print(vauthdata['hasura_id'])
        print(vauthdata['hasura_roles'])

        usrirep=r_userinfo(vauthdata['auth_token'],vauthdata['hasura_id'])
        if(usrirep.status_code >= 200 and usrirep.status_code < 300):
            usrdt = usrirep.json()
            print(usrdt)


            data_app = {}
            data_app["auth_token"] = vauthdata['auth_token']
            data_app["username"] = vauthdata['username']
            data_app["hasura_id"] = vauthdata['hasura_id']
            data_app["hasura_roles"] = vauthdata['hasura_roles']
            data_app["rtpthid"] = str(usrdt[0]['root_path_id'])
            json_app = json.dumps(data_app)
            print ('JSON: ', json_app)

            #print(usrdt[0]['root_path_id'])
            if request.content_type == 'application/json':

                #respo = make_response(resp.content)
                respo = make_response(json_app)
                respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
                respo.set_cookie(vauthdata['auth_token'], vauthdata['username'])
                respo.set_cookie('rtpthid', str(usrdt[0]['root_path_id']))

            else:
                fldrresp=r_folderlist(vauthdata['auth_token'],vauthdata['hasura_id'],usrdt[0]['root_path_id'])
                flresp=r_filelist(vauthdata['auth_token'],vauthdata['hasura_id'],usrdt[0]['root_path_id'])
                print(fldrresp.json())
                print(flresp.json())
                #respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg=resp.content, fldr=fldrresp.json(), fllst=flresp.json()))
                respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg=json_app, fldr=fldrresp.json(), fllst=flresp.json(),pthid=str(usrdt[0]['root_path_id'])))
                respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
                respo.set_cookie(vauthdata['auth_token'], vauthdata['username'])
                respo.set_cookie('rtpthid', str(usrdt[0]['root_path_id']))

            return respo
        else:
            return usrirep.content
    else:
        return resp.content

@app.route("/dregister", methods = ['POST'])
def dregister():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/signup"

    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)
    content = request.json

    if request.method == 'POST':
        if request.content_type == 'application/json':
            vuser = content['hvName']
            vpwd = content['hvPwd']
        else:
            vuser = request.form['hvName']
            vpwd = request.form['hvPwd']

    # This is the json payload for the query
    requestPayload = {
    "provider": "username",
    "data": {
        "username": vuser,
        "password": vpwd
            }
    }
    # Setting headers
    headers = {
        "Content-Type": "application/json"
    }

    print(requestPayload)
    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    #  resp.content contains the json response.
    print(resp.content)
    if(resp.status_code >= 200 and resp.status_code < 300):
        vauthdata = resp.json()
        print(vauthdata['auth_token'])
        print(vauthdata['username'])
        print(vauthdata['hasura_id'])
        print(vauthdata['hasura_roles'])

        #Creating user root folder for newly created user
        cpthrep=c_userfldr(vauthdata['auth_token'],vauthdata['hasura_id'],DEF_PRNT_PTHID,DEF_USR_PATH)
        if (cpthrep.status_code >= 200 and cpthrep.status_code < 300):
            # querying for User root folder id for newly created user
            rtfldr=r_userrtfldr(vauthdata['auth_token'],vauthdata['hasura_id'])
            if (rtfldr.status_code >= 200 and rtfldr.status_code < 300):
                fldr = rtfldr.json()
                fldrid=fldr[0]['path_id']
                # Inserting the user in App_user table after successful user creation steps
                cusrrep=c_userdtl(vauthdata['auth_token'],vauthdata['hasura_id'],vauthdata['username'],fldrid)
                if (cusrrep.status_code >= 200 and cusrrep.status_code < 300):
                    #print(usrdt[0]['root_path_id'])
                    # Sending response back to UI with response of user creation and user cookies

                    data_app = {}
                    data_app["auth_token"] = vauthdata['auth_token']
                    data_app["username"] = vauthdata['username']
                    data_app["hasura_id"] = vauthdata['hasura_id']
                    data_app["hasura_roles"] = vauthdata['hasura_roles']
                    data_app["rtpthid"] = str(fldrid)
                    json_app = json.dumps(data_app)
                    print ('JSON: ', json_app)

                    if request.content_type == 'application/json':
                        #respo = make_response(resp.content)
                        respo = make_response(json_app)
                        respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
                        respo.set_cookie(vauthdata['auth_token'], vauthdata['username'])
                        respo.set_cookie('rtpthid', str(fldrid))
                    else:
                        #respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg=resp.content + cpthrep.content +rtfldr.content+cusrrep.content, fldr="",fllst=""))
                        respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg=json_app , fldr="", fllst="",pthid=str(fldrid)))
                        respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
                        respo.set_cookie(vauthdata['auth_token'], vauthdata['username'])
                        respo.set_cookie('rtpthid', str(fldrid))

                    return respo.content
                #Failure of insert into App_user
                else:
                    return cusrrep.content
            #Failure of query for new user root folder
            else:
                return rtfldr.content
        #Failure of insert for new user root folder
        else:
            return cpthrep.content
    #Failure of new user creation at Auth API Call
    else:
        return resp.content

@app.route("/fldrcreate", methods = ['POST'])
def fldrcreate():
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)
    content = request.json

    if request.method == 'POST':
        if request.content_type == 'application/json':
            vfldrname = content['hvfldrname']
            vpthid = content['hvfldrid']
        else:
            vfldrname = request.form['hvfldrname']
            vpthid = request.form['hvfldrid']
        #Creating user root folder for newly created user
        cpthrep=c_userfldr(vauth,vhid,vpthid,vfldrname)
        if (cpthrep.status_code >= 200 and cpthrep.status_code < 300):
            # querying for User root folder id for newly created user
            if request.content_type == 'application/json':
                respo = make_response(resp.content)
            else:
                fldrresp=r_folderlist(vauth,vhid,vpthid)
                flresp=r_filelist(vauth,vhid,vpthid)
                respo = make_response(render_template('homedrive.html', name=vuser, msg=cpthrep.content, fldr=fldrresp.json(), fllst=flresp.json(),pthid=vpthid))
            return respo
        #Failure of insert for new user root folder
        else:
            return cpthrep.content
    else:
        return "invalid request"

@app.route("/fupload", methods = ['POST','GET'])
def fileupload():
    # This is the url to which the query is made
    url = "https://filestore." + CLUSTER_NAME + ".hasura-app.io/v1/file"

    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    # Setting headers
    headers = {
        "Authorization": "Bearer " + vauth
    }
    # Open the file
    if request.method =='POST':

        if request.content_type == 'application/json':
            content = request.json
            print(content)
            fileup = content['hvfname']
            fileup = content['hvfldrid']
        else:
            fileup = request.files['hvfname']
            print("file" , fileup)
            vpthid = request.form['hvfldrid']

        if fileup and allowed_file(fileup.filename):
            filename = secure_filename(fileup.filename)
        resp = requests.post(url, data=fileup, headers=headers)

    # resp.content contains the json response.
        if(resp.status_code >= 200 and resp.status_code < 300):
            vfileupload = resp.json()
            print(vfileupload['file_id'])
            print(vfileupload['user_id'])
            print(vfileupload['user_role'])
            print(vfileupload['content_type'])
            print(vfileupload['file_status'])
            print(vfileupload['created_at'])
            print(vfileupload['file_size'])
            vfileid=vfileupload['file_id']

            flinsresp=c_fileupload(vauth,vhid,vpthid,filename,vfileid)

            if request.content_type == 'application/json':
                respo = make_response(resp.content)
            else:
                fldrresp=r_folderlist(vauth,vhid,vpthid)
                flresp=r_filelist(vauth,vhid,vpthid)
                respo = make_response(render_template('homedrive.html', name=vuser, msg=resp.content + flinsresp.content, fldr=fldrresp.json(), fllst=flresp.json(),pthid=vpthid))

            return respo
        else:
            print("failed call" , resp.content)

            return resp.content
    else:
        fldrresp=r_folderlist(vauth,vhid,vpthid)
        flresp=r_filelist(vauth,vhid,vpthid)
        resp = make_response(render_template('homedrive.html', name=vuser, msg="", fldr=fldrresp.json(), fllst=flresp.json(),pthid=vpthid))
        return resp

@app.route("/fchge/<vpthnm>", methods = ['GET'])
def fchge(vpthnm):

    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    respfldr=r_getfldrid(vauth,vhid,vpthnm)
    # resp.content contains the json response.
    if(respfldr.status_code >= 200 and respfldr.status_code < 300):
            getfldrid = respfldr.json()
            print(getfldrid[0]['path_nm'])
            print(getfldrid[0]['path_id'])
            print(getfldrid[0]['prnt_path_id'])
            print(getfldrid[0]['created_at'])
            vpthid=getfldrid[0]['path_id']
            fldrresp=r_folderlist(vauth,vhid,vpthid)
            flresp=r_filelist(vauth,vhid,vpthid)
            respo = make_response(render_template('homedrive.html', name=vuser, msg=getfldrid, fldr=fldrresp.json(), fllst=flresp.json(),pthid=vpthid))

            return respo
    else:
        return respfldr.content

@app.route("/filelist", methods = ['POST','GET'])
def filelist():
    # This is the url to which the query is made
    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    content = request.json
    if request.content_type == 'application/json':
        vpthid = content['hvfldrid']
    else:
        vpthid = request.form['hvfldrid']

    if request.content_type == 'application/json':
        respo=r_filelist(vauth,vhid,vpthid)
        print(respo.content)
        return respo.content
    else:
       fldrresp==r_folderlist(vauth,vhid,vpthid)
       flresp=r_filelist(vauth,vhid,vpthid)
       respo = make_response(render_template('homedrive.html',name=vuser, msg= flresp.json(), fldr=fldrresp.json(),fllst=flresp.json(),pthid=vpthid))
       return respo

@app.route("/fldrlist", methods = ['POST','GET'])
def fldrlist():
    # This is the url to which the query is made
    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    content = request.json
    if request.content_type == 'application/json':
        vpthid = content['hvfldrid']
    else:
        vpthid = request.form['hvfldrid']

    if request.content_type == 'application/json':
        respo=r_folderlist(vauth,vhid,vpthid)
        print(respo.content)
        return respo.content
    else:
        fldrresp==r_folderlist(vauth,vhid,vpthid)
        flresp=r_filelist(vauth,vhid,vpthid)
        respo = make_response(render_template('homedrive.html',name=vuser, msg= flresp.content, fldr=fldrresp.json(),fllst=flresp.json(),pthid=vpthid))
        return respo

@app.route("/dlogout")
def dlogout():

    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/user/logout"

    # This is the json payload for the query
    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+vauth
    }

    # Make the query and store response in resp
    resp = requests.request("POST", url, headers=headers)

    # resp.content contains the json response.
    print(resp.content)
    if request.content_type == 'application/json':
        respo=make_response(resp)
        respo.set_cookie(CLUSTER_NAME, expires=0)
        respo.set_cookie(vauth, expires=0)
        respo.set_cookie('rtpthid', expires=0)

    else:
        respo = make_response(render_template('dlogin.html'))
    return respo

@app.route("/dwnload/<vfileid>" , methods = ['GET'])
def dlwnload(vfileid):

    print(request)
    print(request.headers)
    print(request.form)
    print(request.json)
    print(request.cookies)
    vauth = request.cookies.get(CLUSTER_NAME)
    vuser = request.cookies.get(vauth)
    vpthid = request.cookies.get('rtpthid')
    vhid = request.headers.get('X-Hasura-User-Id')

    # This is the url to which the query is made
    url = "https://filestore." + CLUSTER_NAME + ".hasura-app.io/v1/file/"+vfileid

    # This is the json payload for the query
    # Setting headers
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+vauth
    }
    filename = "downloadedFile.png"

    # Make the query
    resp = requests.get(url, stream=True)

    with open(filename, 'wb') as fd:
        for chunk in resp.iter_content(chunk_size=128):
            fd.write(chunk)
    return fd

# Handling all other request and robots.txt request
@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404