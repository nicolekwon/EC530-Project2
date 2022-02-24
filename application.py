# save this as app.py
from flask import Flask, escape, request

import azure.cosmos.cosmos_client as cosmos_client
import azure.cosmos.exceptions as exceptions
from azure.cosmos.partition_key import PartitionKey

import config

HOST = config.settings['host']
MASTER_KEY = config.settings['master_key']
DATABASE_ID = config.settings['database_id']
CONTAINER_ID = config.settings['container_id']


def find_container(db, id):
    print('1. Query for Container')

    containers = list(db.query_containers(
        {
            "query": "SELECT * FROM r WHERE r.id=@id",
            "parameters": [
                { "name":"@id", "value": id }
            ]
        }
    ))

    if len(containers) > 0:
        print('Container with id \'{0}\' was found'.format(id))
    else:
        print('No container with id \'{0}\' was found'. format(id))
   

def read_Container(db, id):
    print("\n4. Get a Container by id")

    try:
        container = db.get_container_client(id)
        container.read()
        print('Container with id \'{0}\' was found, it\'s link is {1}'.format(container.id, container.container_link))

    except exceptions.CosmosResourceNotFoundError:
        print('A container with id \'{0}\' does not exist'.format(id))
        
    return container.id


app = Flask(__name__)


@app.route('/')
def hello():
    name = request.args.get("name", "World")
    client = cosmos_client.CosmosClient(HOST, {'masterKey': MASTER_KEY} )
    db = client.get_database_client(DATABASE_ID)     
    cid = read_Container(db, CONTAINER_ID)
    
    return f'Hello, {escape(name)}! {escape(cid)}'


if __name__ == "__main__":
       app.run()
