import { EventHubClient } from "@azure/event-hubs";
import AzureEventHubPublisher from "./AzureEventHubPublisher";
import IPublisher from "./IPublisher";

jest.mock("@azure/event-hubs");

describe("AzureEventHubPublisher", () => {
  let publisher: IPublisher;
  const mockCallback = jest.fn();
  EventHubClient.createFromConnectionString = jest.fn().mockImplementation(() => {
    return {
      send: mockCallback,
    };
  });

  beforeEach(() => {
    publisher = new AzureEventHubPublisher();
    mockCallback.mockClear();
  });

  describe("send", () => {
    test("should call client once", () => {
      expect(publisher).toBeInstanceOf(AzureEventHubPublisher);
      publisher.send("test");
      expect(mockCallback.mock.calls.length).toBe(1);
    });
  });
});
