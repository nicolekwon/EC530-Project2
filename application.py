# save this as app.py
from flask import Flask, escape, request

import getpass
import pymongo

from random import randint


app = Flask(__name__)


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
    print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    return collection.find_one({"_id": document_id})


# GET : Reading all documents in a collection
def read_all(collection):
    collection_list=[]
    for x in collection.find():
        collection_list.append(x)
    return collection_list


@app.route('/devices', methods=['GET'])
def hello():
    name = request.args.get("name", "World")
    
    db = connect_db()
    collection = db.get_collection('devices')
    document_id = 123
    
    file = read_document(collection, document_id)
    collection_list = read_all(collection)
    
    return f'{escape(collection_list)}'


if __name__ == "__main__":
       app.run()
