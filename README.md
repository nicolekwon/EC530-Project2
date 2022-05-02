# EC530-Project2

> This ReadMe details Nicole Kwon's Project 2 for EC530. Click [here](https://ec530-project2-nicolekwon.azurewebsites.net/) to access where the backend code is running. 

---


## Table of Contents

- [Descriptions of Project and Phases](#descriptions)
- [Development Process](#process)

---

## Descriptions

#### Project 2

Phase 0:   (Due 2/13)
- [x] Setup your Agile environment for the project (including project, GitHub, testing, etc.).
- [x] Setup your branching strategy.

Phase 1:   Device Module (Due 2/13)
- [x] Define Interface for devices to ingest data into the system.
- [x] Implement Shell of the device interface.
- [x] Implement Unit Tests for the module.
- [x] Implement a simulation to send data via an example program to help users of your system.
- [x] Document the interface well.

Phase 2:   (Due 2/22)
- [x] Use Flask or Django as your WEB service platform
- [x] Integrate your module to become a RESTFUL system
- [x] Deploy your system to free [AWS](https://aws.amazon.com/free/?all-free-tier.sort-by=item.additionalFields.SortRank&all-free-tier.sort-order=asc) services or any free cloud of your choosing
- [x] Develop simple WEB applications to test your system.
- [x] Document your REST APIs on your Github

Phase 3:   (Due 3/4)
- [x] Focus on Chat module
- [x] Develop...
  - API User Stories for Chat module
  - API definitions for Chat Module
  - REST APIs fro Chat Module
  - Data Model for Chat Module
- [x] Select best database for such module (document or SQL) and explain why
- [x] Add it to your project

Phase 4:   (Due 4/19)
- [x] Setup your REACT Native Environment
- [x] Go through REACT native Tutorial
- [x] Use your REST APIs to build part of the application (add register a user, define a user as a medical professional or patient, have the medical professional add a patient to her/his patient list)
- [x] Define database model for chat and users
- [x] Use your device API to send health data to your backend

#### Project 4

Build Queue System
- [x] Step 1: Develop a queue system that can exercise your requirements with stub functions 
- [x] Step 2: Test it with different parameters, include tracking interface to show how many processes are going on and success of each

---

## Process

#### Branching Strategy

The branches will be based off of the requirements in different phases. This emulates tasks assigned in sprints in Agile development. These requirements will be defined in Github Issues, with the naming convention of "P" and number to represent the certain phase, followed by "T" and number to represent the certain task. For example, editing the README to add this strategy is done in the "T0T2" branch. The main branch should be looked at during the deadlines of all the phases, as the other branches will be merged into it by then. 

#### Schema

##### Device
| Attribute | Description |
| --- | --- |
| Device_ID | Device ID, to identify specific devices |
| User_ID | User ID, to identify specific person |
| Doctor_ID | Doctor ID, to identify specific doctor |
| Data | Values and units related to the user's health (ex. temperature) |

##### Calendar
| Attribute | Description |
| --- | --- |
| Date_List | Date list, to filter through what a user does on certain days |
| Appointment_List | Appointment list, to store appointments and show open time slots |

##### Alerts
| Attribute | Description |
| --- | --- |
| Role_ID | Role ID, to determine privileges and stored in an array because users can have multiple roles |
| BP_Alert | Blood pressure alert, to make sure the patient measures daily |
| Temperature_Alert | Temperature alert, to notify the patient if temperature is outside acceptable range |

##### Chat
| Attribute | Description |
| --- | --- |
| User_ID | User ID, to identify specific person |
| Role_ID | Role ID, to determine privileges and stored in an array because users can have multiple roles |
| Date_List | Date list, to filter through what a user does on certain days |
| Text_List | Text list, to store different texts from chat |
| Voice_List | Voice list, to store different voice messages from chat |
| Video_List | Video list, to store different videos from chat |

##### Voice Transcriber
| Attribute | Description |
| --- | --- |
| User_ID | User ID, to identify specific person |
| Role_ID | Role ID, to determine privileges and stored in an array because users can have multiple roles |
| Date_List | Date list, to filter through what a user does on certain days |
| Text_List | Text list, to store different texts from chat |
| Voice_List | Voice list, to store different voice messages from chat |
| Video_List | Video list, to store different videos from chat |
| Transcript_List | Transcript list, for medical professionals to read and search for keywords |

##### Administrative
| Attribute | Description |
| --- | --- |
| User_ID | User ID, to identify specific person |
| Role_ID | Role ID, to determine privileges and stored in an array because users can have multiple roles |
| App_On | Application on, to enable/disable device maker |

##### Data Management
| Attribute | Description |
| --- | --- |
| Patient_List | Patient list, for medical professionals to be able to browse through patients |
| Measurement_List | Measurements list, to store patients’ input |

##### Application Interfaces
| Attribute | Description |
| --- | --- |
| User_ID | User ID, to identify specific person |
| Role_ID | Role ID, to determine privileges and stored in an array because users can have multiple roles |
| Measurement_List | Measurements list, to store patients’ input |
| App_On | Application on, to enable/disable device maker |

#### Devices
The devices module utilizes MongoDB from Azure Cosmos DB to store JSON files with information about a specific device. It holds _id, which is an identifier for the device, user_id, which is an identifier for the user whose data from the device is being stored, and data, which then holds different values and units measured by the device. 

###### GET: Reading a document based on id
By utilizing the unique ids of the collection and document (in this case, devices and _id), the MongoDB database is accessed and returns the document.
```
def read_document(collection, document_id):
    """Return the contents of the document containing document_id"""
    print("Found a document with _id {}: {}".format(document_id, collection.find_one({"_id": document_id})))
    return collection.find_one({"_id": document_id})
```
###### GET: Reading all documents in a collection
By utilizing the unique id of the collection (in this case, devices), the MongoDB database is accessed; the collection is iterated through, and this is returned as a list.
```
def read_all(collection):
    collection_list=[]
    for x in collection.find():
        collection_list.append(x)
    return collection_list
```

#### Chat 
User stories include being able to create a conversation with a doctor or nurse as a patient to get medical advice or vice versa, as well as sending text, photos, videos, or voice messages for convenience. 

###### SOCKET.IO 
By utilizing this specific library, two users can connect to the same room at once. Below are the 3 main event handlers:
```
@socketio.on('join_room')
def handle_join_room_event(data):
    app.logger.info("{} has joined the room {}".format(data['username'], data['room']))
    join_room(data['room'])
    socketio.emit('join_room_announcement', data, room=data['room'])
```
```
@socketio.on('send_message')
def handle_send_message_event(data):
    app.logger.info("{} has sent message to the room {}: {}".format(data['username'],
                                                                    data['room'],
                                                                    data['message']))
    socketio.emit('receive_message', data, room=data['room'])
```
```
@socketio.on('leave_room')
def handle_leave_room_event(data):
    app.logger.info("{} has left the room {}".format(data['username'], data['room']))
    leave_room(data['room'])
    socketio.emit('leave_room_announcement', data, room=data['room'])
```

#### Database
I decided to go with MongoDB was my database due to the flexibility behind their schemas and connected this to Azure. I created two collections: "users" to store their login credentials and roles and "devices" to store who has access to them and their data. 

#### Frontend
I decided to go with React for my frontend, as I wanted to create my application as a web app. The user can sign up or log in, followed by being able to see their device data. Sign up or sign in using the following credentials to also see device data: 
```
Email: patient@gmail.com
Password: patient123
```
```
Email: doctor@gmail.com
Password: doctor123
```

---

[Back to the Top](#EC530-Project2)
