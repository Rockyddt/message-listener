import 'reflect-metadata';
import { EventHubClient } from '@azure/event-hubs';
import * as log from '../log';
import IPublisher from './IPublisher';
import { injectable } from 'inversify';

@injectable()

class AzureEventHubPublisher implements IPublisher {
    private client;

    constructor(){                              
        this.client = EventHubClient.createFromConnectionString(
            process.env["EVENTHUB_CONNECTION_STRING"] || "", 
            process.env["EVENTHUB_NAME"]);        
    }

    async send(message: any) {        
        await this.client.send(message);        
        log.logInfo("message sent successfully.");        
    }


}

export default AzureEventHubPublisher;