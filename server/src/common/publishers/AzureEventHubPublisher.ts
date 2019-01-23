import { EventHubClient } from "@azure/event-hubs";
import { injectable } from "inversify";
import "reflect-metadata";
import * as log from "../log";
import IPublisher from "./IPublisher";

@injectable()
class AzureEventHubPublisher implements IPublisher {
  private client;

  constructor() {
    this.client = EventHubClient.createFromConnectionString(
      process.env.EVENTHUB_CONNECTION_STRING || "",
      process.env.EVENTHUB_NAME,
    );
  }

  public async send(message: any) {
    await this.client.send(message);
    log.logInfo("message sent successfully.");
  }
}

export default AzureEventHubPublisher;
