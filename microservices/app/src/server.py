import os
import sys
from src import app
import requests
from flask import jsonify, render_template, request, make_response, json, redirect, url_for

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

@app.route("/dlogin", methods = ['POST', 'GET'])
def login():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/login"
    print(request)
    print(request.headers)
    print(request.form)
    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)

    if request.method == 'POST':
        vuser = request.form['hvName']
        vpwd = request.form['hvPwd']

    content = request.get_json()
    print (content)
    if request.content_type == 'application/json':

        print (content['hvName'])
        print (content['hvPwd"'])

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
    return (render_template('homedrive.html',name = vuser,msg = resp.content))


@app.route("/dregister", methods = ['POST', 'GET'])
def dregister():

    # This is the url to which the query is made
    url = "https://auth." + CLUSTER_NAME + ".hasura-app.io/v1/signup"

    print(request)
    print(request.headers)
    print(request.form)
    print(request.content_type)
    print(request.data)
    print(request.json)
    print(request.is_json)


    if request.method == 'POST':
        vuser = request.form['hvName']
        vpwd = request.form['hvPwd']

    content = request.get_json()
    print (content)
    if request.content_type == 'application/json':

        print (content['hvName'])
        print (content['hvPwd"'])


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

    # Make the query and store response in resp
    resp = requests.request("POST", url, data=json.dumps(requestPayload), headers=headers)

    #  resp.content contains the json response.
    print (resp.content)
    return render_template('dlogin.html')

# Handling all other request and robots.txt request
@app.errorhandler(404)
def page_not_found(error):
    return render_template('page_not_found.html'), 404