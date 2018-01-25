import os
import sys
from src import app
import requests
from flask import jsonify, render_template, request, make_response, json
from flask import redirect, url_for, session
from werkzeug import secure_filename
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
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','docx','xlsx','pptx'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

def filelist(vauth,vhid):

    # This is the url to which the query is made
    url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

    # This is the json payload for the query
    requestPayload1 = {
        "type": "select",
        "args": {
            "table": "user_files",
            "columns": [
                "*"
            ],
            "where": {
                "user_id": {
                    "$eq": vhid
                }
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

    return resp1.content


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

@app.route("/regdisplay", methods = ['POST', 'GET'])
def registerpage():
    return render_template('dregister.html')

@app.route("/dlogin", methods = ['POST'])
def login():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/login"
#    print(request)
    print(request.headers)
#    print(request.form)
#    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)

    content = request.json
#    print (content)
#    print (content['hvName'])
#    print (content['hvPwde'])

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
#        session['auth_token']= vauthdata['auth_token']
#        session['username']= vauthdata['username']
#        session['hasura_id']= vauthdata['hasura_id']
#        session['hasura_roles']= vauthdata['hasura_roles']

#        session['auth_token']= vauthdata['auth_token']

        # This is the url to which the query is made
        url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

        # This is the json payload for the query
        requestPayload1 = {
            "type": "select",
            "args": {
                "table": "user_files",
                "columns": [
                    "*"
                ],
                "where": {
                    "user_id": {
                        "$eq": vauthdata['hasura_id']
                    }
                }
            }
        }

        # Setting headers
        headers1 = {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ vauthdata['auth_token']
        }

        # Make the query and store response in resp
        resp1 = requests.request("POST", url1, data=json.dumps(requestPayload1), headers=headers1)

        # resp.content contains the json response.
        print(resp1.content)


        flresp=filelist(vauthdata['auth_token'],vauthdata['hasura_id'])

        if request.content_type == 'application/json':
            respo = make_response(resp.content+flresp)
            respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'] )
            respo.set_cookie(vauthdata['auth_token'], vauthdata['username'] )

        else:
            respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg=resp.content, response1=flresp))
            respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
            respo.set_cookie(vauthdata['auth_token'], vauthdata['username'] )

        return respo
    else:
        return resp.content

@app.route("/dregister", methods = ['POST'])
def dregister():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/signup"

#    print(request)
#    print(request.headers)
#    print(request.form)
    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)

    content = request.json
#    print (content)
#    print (content['hvName'])
#    print (content['hvPwd'])
    if request.method == 'POST':
        if request.content_type == 'application/json':
            vuser = content['hvName']
            vpwd = content['hvPwd']
        else:
            vuser = request.form['hvName']
            vpwd = request.form['hvPwd']

    print("Before")
    print(vuser)
    print(vpwd)
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

        flresp=filelist(vauthdata['auth_token'],vauthdata['hasura_id'])

        if request.content_type == 'application/json':
            respo = make_response(resp.content+flresp)
            respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
            respo.set_cookie(vauthdata['auth_token'], vauthdata['username'] )

        else:
            respo = make_response(render_template('homedrive.html', name=vauthdata['username'], msg= resp.content, response1=flresp))
            respo.set_cookie(CLUSTER_NAME, vauthdata['auth_token'])
            respo.set_cookie(vauthdata['auth_token'], vauthdata['username'] )

        return respo
    else:
        return resp.content

@app.route("/fupload", methods = ['POST'])
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
    vhid = request.headers.get('X-Hasura-User-Id')

    # Setting headers
    headers = {
        "Authorization": "Bearer " + vauth
    }


    # Open the file and make the query
#    with open(request.files['hvfname'], 'rb') as file_image:
    if request.method =='POST':

        fileup = request.files['hvfname']
        if fileup and allowed_file(fileup.filename):
            filename = secure_filename(fileup.filename)
#            fileup.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    resp = requests.post(url, data=fileup, headers=headers)
#    resp = requests.post(url, data=fileup)

    # resp.content contains the json response.
    print("file upload")
    print(resp.content)
    if(resp.status_code >= 200 and resp.status_code < 300):
        vfileupload = resp.json()
        print(vfileupload['file_id'])
        print(vfileupload['user_id'])
        print(vfileupload['user_role'])
        print(vfileupload['content_type'])
        print(vfileupload['file_status'])
        print(vfileupload['created_at'])
        print(vfileupload['file_size'])

        # This is the url to which the query is made
        url1 = "https://data." + CLUSTER_NAME + ".hasura-app.io/v1/query"

        # This is the json payload for the query
        requestPayload1 = {
        "type": "insert",
        "args": {
            "table": "user_files",
            "objects": [
                {
                    "user_id": vfileupload['user_id'],
                    "file_path_id": "1",
                    "file_name": filename,
                    "file_id": vfileupload['file_id']
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
        flresp=filelist(vauth,vhid)

        if request.content_type == 'application/json':
            respo = make_response(resp.content+resp1.content)
        else:
            respo = make_response(render_template('homedrive.html',name=vuser, msg= resp.content, response1=flresp))

        return respo
    else:
        return resp.content


# Handling all other request and robots.txt request
@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404