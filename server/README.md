[![Build Status](https://boxingday.visualstudio.com/Test%20project/_apis/build/status/Rockyddt.message-listener?branchName=master)](https://boxingday.visualstudio.com/Test%20project/_build/latest?definitionId=12?branchName=master)

## Get started 
The server project has two servers, UDP server and HTTP Server.
UDP server will listen udp messages and forward it http server using [Azure Eventhub](https://docs.microsoft.com/en-us/azure/event-hubs/) 

Before you can run the scripts, please do the following:

1. Create an .env file in src folder contains following data
    > EVENTHUB_CONNECTION_STRING="connection string to event hub" <br>
    > EVENTHUB_NAME="even hub name" <br>
    > STORAGE_CONNECTION_STRING="connection string to storage account" <br>
    > STORAGE_CONTAINER_NAME_EVENTHUB="storage container name to log event hub processing information" <br>
2. Run command tsc to compile typescript files to js. 

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the two servers in the development mode. <br>
* UDP Server is on port 20500 <br>
    Send ASCII text to 127.0.0.1:20500 <br>
    Example:
    > "test"
    
* Express Api Server is on port 5000 <br>
    Post JSON data to http://localhost:5000/receive <br>
    Example:
    > {"body": "test"}
    
### `npm test`
Run jest --coverage command to test all the test files. 

### `Build docker image`
![](./docs/docker-build.gif)

### `Start docker-compose`
![](./docs/docker-compose.gif)