import { EventProcessorHost } from "@azure/event-processor-host";
import AzureEventHubSubscriber from "./AzureEventHubSubscriber";
import ISubscriber from "./ISubscriber";

jest.mock("@azure/event-hubs");

describe("AzureEventHubSubscriber", () => {
  let subscriber: ISubscriber;
  const mockProcessor = jest.fn().mockImplementation(async (onMessage, onError) => {
    await onMessage(
      {
        partitionId: 0,
      },
      {
        body: "test",
      },
    );
  });

  beforeEach(() => {
    EventProcessorHost.createFromConnectionString = jest.fn().mockImplementation(() => {
      return {
        start: mockProcessor,
      };
    });
    subscriber = new AzureEventHubSubscriber();
    mockProcessor.mockClear();
  });

  describe("subscribe", () => {
    test("should start receiving data", () => {
      expect(subscriber).toBeInstanceOf(AzureEventHubSubscriber);
      subscriber.subscribe();
      expect(mockProcessor.mock.calls.length).toBe(1);
    });

    test("should call notifier when received data", async () => {
      const mockNotifier = {
        notify: jest.fn(),
      };
      subscriber.registerNotifier(mockNotifier);
      await subscriber.subscribe();
      const numberOfCalls = mockNotifier.notify.mock.calls.length;
      expect(numberOfCalls).toBe(1);
    });
  });

  describe("register", () => {
    test("should have no error", () => {
      expect(subscriber.registerNotifier).not.toThrowError();
    });
  });
});
