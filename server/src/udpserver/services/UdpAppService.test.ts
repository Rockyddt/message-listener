import { Container, decorate, injectable } from "inversify";
import "reflect-metadata";
import TYPES from "../../common/constant/Types";
import UdpAppService from "./UdpAppService";

describe("UdpAppService", () => {
  let appService: UdpAppService;
  let container: Container | null;

  const decoderMock = jest.fn();
  const publisherMock = jest.fn();

  class DecoderMock {
    public decode = decoderMock;
  }
  // tslint:disable-next-line: max-classes-per-file
  class PublisherMock {
    public send = publisherMock;
  }

  decorate(injectable(), DecoderMock);
  decorate(injectable(), PublisherMock);

  beforeEach(() => {
    container = new Container();

    container.bind(TYPES.IDecoder).to(DecoderMock);
    container.bind(TYPES.IPublisher).to(PublisherMock);
    container.bind<UdpAppService>(TYPES.UdpAppService).to(UdpAppService);

    appService = container.get<UdpAppService>(TYPES.UdpAppService);
  });

  describe("handleMessage", () => {
    test("should decode and publish", async () => {
      await appService.handleMessage(Buffer.from("test"));
      expect(decoderMock.mock.calls.length).toBe(1);
      expect(decoderMock.mock.calls.length).toBe(1);
    });
  });

  afterEach(() => {
    container = null;
  });
});
