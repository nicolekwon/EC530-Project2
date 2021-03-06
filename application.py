# save this as app.py
from flask import Flask, escape, request, json, render_template, request, redirect, url_for
from flask_socketio import SocketIO, join_room, leave_room

import getpass
import pymongo
import threading, queue

from random import randint
from flask_cors import CORS


app = Flask(__name__)
socketio = SocketIO(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


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


def read_document(collection, document_id):
    """Return the contents of the document containing document_id"""
    # print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    return collection.find_one({"_id": document_id})


# GET: Reading a device document based on patient id
def read_patient_device(collection, email):
    """Return the contents of the document containing document_id"""
    # print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    collection_list=[]
    for x in collection.find({"user_id": email}):
        collection_list.append(x)
    return json.dumps(collection_list)


# GET: Reading a device document based on doctor id
def read_doctor_device(collection, email):
    """Return the contents of the document containing document_id"""
    # print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    collection_list=[]
    for x in collection.find({"doctor_id": email}):
        collection_list.append(x)
    return json.dumps(collection_list)


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


counter = ''
count = 1

q = queue.Queue()
# Tracking the queue
def worker():
    global counter
    while True:
        item = q.get()
        if (item == '1'):
            signin('admin@gmail.com', 'admin123')
            counter = counter + 'Finished logging in' + '\n'
        elif (item == '2'):
            patient_device_module('patient@gmail.com')
            counter = counter + 'Finished retrieving device information' + '\n'
        else:
            getrole('doctor@gmail.com'); 
            counter = counter + 'Finished retrieving role' + '\n'
        q.task_done()


@app.route('/queue')
def queue():
    global counter, count
    # Turn-on the worker thread.
    threading.Thread(target=worker, daemon=True).start()

    # Send thirty task requests to the worker.
    q.put(str(count))
    count=count+1
    if (count == 4):
        count = 1

    # Block until all tasks are done.
    q.join()
    return render_template('queue.html', value=counter)


@app.route('/devices', methods=['GET'])
def devices_module():
    db = connect_db()
    collection = db.get_collection('devices')
    collection_list = read_all(collection)
    return collection_list


# Listing a patient's device(s)
@app.route('/patientdevice/<email>', methods=['GET'])
def patient_device_module(email):
    db = connect_db()
    collection = db.get_collection('devices')
    col = read_patient_device(collection,email)
    return col


# Listing a doctor's device(s)
@app.route('/doctordevice/<email>', methods=['GET'])
def doctor_device_module(email):
    db = connect_db()
    collection = db.get_collection('devices')
    col = read_doctor_device(collection,email)
    return col


# Getting role of a user
@app.route('/getrole/<email>', methods=['GET'])
def getrole(email):
    db = connect_db()
    collection = db.get_collection('users')
    file = read_document(collection, email)

    for key in file:
        if key == "role":
            if (file["role"] == 'patient' or 'Patient'):
                return "Patient"
            if (file["role"] == 'doctor' or 'Datient'):
                return "Doctor"
            if (file["role"] == 'admin' or 'Admin'):
                return "Admin"


# Signing in
@app.route('/signin/<email>/<password>', methods=['GET'])
def signin(email, password):
    db = connect_db()
    collection = db.get_collection('users')
    file = read_document(collection, email)

    # User is not registered by admin
    if (file == None):
        return "Cannot sign in"

    for key in file:
        if key == "password":
            if (password == file["password"]):
                return "Signed in"
    
    return "Cannot sign in"


# Signing up
@app.route('/signup/<email>/<password>/<role>', methods=['GET', 'POST'])
def signup(email, password, role):
    db = connect_db()
    collection = db.get_collection('users')
    file = read_document(collection, email)

    # User is not registered by admin
    if (file == None):
        document_id = collection.insert_one({'_id': email, 'password': password, 'role': role}).inserted_id
        return "Signed up"
    else:
        return "Cannot sign up"


# Adding a device
@app.route('/adddevice/<device_id>/<blood_pressure>/<blood_sugar_level>/<oxygen_level>/<pulse>/<temperature>/<weight>', methods=['GET', 'POST'])
def adddevice(device_id, blood_pressure, blood_sugar_level, oxygen_level, pulse, temperature, weight):
    db = connect_db()
    collection = db.get_collection('devices')
    file = read_document(collection, device_id)

    # User is not registered by admin
    if (file == None):
        document_id = collection.insert_one({'_id': device_id, 'data': {'blood_pressure': {'unit': 'mmHg', 'value': blood_pressure},'blood_sugar_level': {'unit': 'mg/dL', 'value': blood_sugar_level}, 'oxygen_level': {'unit': '%', 'value': oxygen_level}, 'pulse': {'unit': 'bpm', 'value': pulse}, 'temperature': {'unit': 'F', 'value': temperature}, 'weight': {'unit': 'lbs', 'value': weight}}}).inserted_id
        return "Added"
    else:
        return "Cannot add"


@app.route('/chathome')
def home():
    return render_template("index.html")


@app.route('/chat')
def chat():
    username = request.args.get('username')
    room = request.args.get('room')

    if username and room:
        return render_template('chat.html', username=username, room=room)
    else:
        return redirect(url_for('home'))


@socketio.on('send_message')
def handle_send_message_event(data):
    app.logger.info("{} has sent message to the room {}: {}".format(data['username'],
                                                                    data['room'],
                                                                    data['message']))
    socketio.emit('receive_message', data, room=data['room'])


@socketio.on('join_room')
def handle_join_room_event(data):
    app.logger.info("{} has joined the room {}".format(data['username'], data['room']))
    join_room(data['room'])
    socketio.emit('join_room_announcement', data, room=data['room'])


@socketio.on('leave_room')
def handle_leave_room_event(data):
    app.logger.info("{} has left the room {}".format(data['username'], data['room']))
    leave_room(data['room'])
    socketio.emit('leave_room_announcement', data, room=data['room'])


if __name__ == "__main__":
    socketio.run(app, debug=True)
    #app.run()