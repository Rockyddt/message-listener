import { EventProcessorHost} from "@azure/event-processor-host";
import { injectable } from "inversify";
import "reflect-metadata";
import * as log from "../log";
import ISubscriber from "./ISubscriber";

@injectable()
class AzureEventHubSubscriber implements ISubscriber {
    private eventHubProcessor;
    private receivedMessageCount: number;
    private notifiers: any[];

    constructor() {
        this.receivedMessageCount = 0;

        this.eventHubProcessor = EventProcessorHost.createFromConnectionString(
            EventProcessorHost.createHostName(),
            process.env.STORAGE_CONNECTION_STRING || "",
            process.env.STORAGE_CONTAINER_NAME_EVENTHUB || "",
            process.env.EVENTHUB_CONNECTION_STRING || "",
            {
                eventHubPath: process.env.EVENTHUB_NAME,
            },
        );
        this.notifiers = [];
    }

    public subscribe = async () => {
        await this.eventHubProcessor.start(this.onMessage, this.onError);
    }

    public registerNotifier = async (notifier) => {
        this.notifiers.push(notifier);
    }

    public onError = (err) => {
        log.logInfo(`Received Error: ${err}`);
    }

    public onMessage = async (context, data) => {
        log.logInfo(`Receive message from '${context.partitionId}': '${data.body}'`);
        this.notifiers.forEach((n) => {
            n.notify(data.body);
        });

        this.receivedMessageCount++;

        // let us checkpoint every 10th message that is received across all the partitions.
        if (this.receivedMessageCount % 10 === 0) {
            this.receivedMessageCount /= 10;
            log.logInfo("Check point reached");
            return await context.checkpoint();
        }
    }
}

export default AzureEventHubSubscriber;
