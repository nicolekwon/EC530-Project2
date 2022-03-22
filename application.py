# save this as app.py
from flask import Flask, escape, request, json

import getpass
import pymongo

from random import randint
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


# Connecting to and returning MongoDB database
def connect_db():
    uri = "mongodb://ec530-project2:DEeOGAUO7d5NKBrebaRLbA8zAIlwTi2MaPMkXQ4SwCJweEpKxviEwWnFN41ngwiTPdvo0UwK93Vk2d9w74rbgw==@ec530-project2.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@ec530-project2@"
    client = pymongo.MongoClient(uri)
    try:
        client.server_info() # validate connection string
    except pymongo.errors.ServerSelectionTimeoutError:
        raise TimeoutError("Invalid API for MongoDB connection string or timed out when attempting to connect")

    db = client['ec530-project2']

    return db


# GET: Reading a document based on id
def read_document(collection, document_id):
    """Return the contents of the document containing document_id"""
    # print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    return collection.find_one({"_id": document_id})


# GET : Reading all documents in a collection
def read_all(collection):
    collection_list=[]
    for x in collection.find():
        collection_list.append(x)
    return json.dumps(collection_list)


@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return "<p>Hello, World!</p>"


@app.route('/devices', methods=['GET'])
def devices_module():
    db = connect_db()
    collection = db.get_collection('devices')
    document_id = 123

    file = read_document(collection, document_id)
    collection_list = read_all(collection)

    return f'{escape(collection_list)}'


@app.route('/device', methods=['GET'])
def device_module(document_id):
    db = connect_db()
    collection = db.get_collection('devices')

    file = read_document(collection, document_id)
    collection = read_all(collection)

    return f'{escape(collection)}'


@app.route('/checkuser/<document_id>', methods=['GET'])
def check_user(document_id):
    db = connect_db()
    collection = db.get_collection('users')
    file = read_document(collection, document_id)
    test1 = 1

    # User is not registered by admin
    if (file == None):
        return "User is not registered by admin"

    for key in file:
        if key == "password":
            test1 = 0
    
    # User can sign up
    if (test1):
        return "User can sign up"
    # User already signed up
    else:
        return "User is already signed up"


if __name__ == "__main__":
    app.run()