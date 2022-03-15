# EC530-Project2

> This ReadMe details Nicole Kwon's Project 2 for EC530. Click [here](https://ec530-project2-nicolekwon.azurewebsites.net/) to access where the code is running. 

---


## Table of Contents


- [Descriptions of Project and Phases](#descriptions)
- [Agile Development Process](#process)
- [Explanations of Code Set-Up and Layout](#explanations)

---

## Descriptions

#### Project

...

#### Phases

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
- [ ] Focus on Chat module
- [ ] Develop...
  - API User Stories for Chat module
  - API definitions for Chat Module
  - REST APIs fro Chat Module
  - Data Model for Chat Module
- [ ] Select best database for such module (document or SQL) and explain why
- [ ] Add it to your project

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

---

## Explanations

#### Set-Up 

...

#### Layout

...

---

[Back to the Top](#EC530-Project2)
