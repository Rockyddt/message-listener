import { Container, decorate, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../../common/constant/Types";
import WebAppService from "./WebAppService";

describe("WebAppService", () => {
  let appService: WebAppService;
  let container: Container | null;

  const notificationMock = jest.fn();
  const subscriberMock = jest.fn();
  const registerMock = jest.fn();
  const listenMock = jest.fn();

  class NotificationMock {
    public notify = notificationMock;
    public listen = listenMock;
  }
  // tslint:disable-next-line: max-classes-per-file
  class SubscriberMock {
    public registerNotifier = registerMock;
    public subscribe = subscriberMock;
  }

  decorate(injectable(), NotificationMock);
  decorate(injectable(), SubscriberMock);

  beforeEach(() => {
    container = new Container();
    container.bind(TYPES.INotificationService).to(NotificationMock);
    container.bind(TYPES.ISubscriber).to(SubscriberMock);
    container.bind<WebAppService>(TYPES.WebAppService).to(WebAppService);
    appService = container.get<WebAppService>(TYPES.WebAppService);
  });

  describe("startSubscribe", () => {
    test("subscriber should be called", async () => {
      appService.startSubscribe();
      expect(registerMock.mock.calls.length).toBe(1);
      expect(subscriberMock.mock.calls.length).toBe(1);
    });
  });

  describe("getNotificationService", () => {
    test("return notification service", async () => {
      const notifier = appService.getNotificationService();
      expect(notifier.listen).toEqual(listenMock);
    });
  });

  describe("get", () => {
    test("port should be 5000", async () => {
      expect(appService.get("port")).toEqual(5000);
    });
  });

  describe("getApp", () => {
    test("should throw no error", async () => {
      expect(() => {
        appService.getApp();
      }).not.toThrowError();
    });
  });

  afterEach(() => {
    container = null;
  });
});
