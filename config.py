import os

settings = {
    'host': os.environ.get('ACCOUNT_HOST', 'https://ec530-project2.documents.azure.com:443/'),
    'master_key': os.environ.get('ACCOUNT_KEY', '9FyPgF6Zjac3Bg5zbk3gMBYXMPIBpxRI37HN1a9j7mVTfRMtFMsKN5SEJVsfbqZNnZ50UgQIsngOAzuOqSvmig=='),
    'database_id': os.environ.get('COSMOS_DATABASE', 'ec530-project2'),
    'container_id': os.environ.get('COSMOS_CONTAINER', 'devices'),
}
