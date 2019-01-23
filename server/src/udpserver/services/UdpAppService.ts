import { inject, injectable } from "inversify";
import TYPES from "../../common/constant/Types";
import IDecoder from "../../common/decoders/IDecoder";
import IPublisher from "../../common/publishers/IPublisher";

@injectable()
class UdpAppService {
  private decoder: IDecoder;
  private publisher: IPublisher;

  constructor(@inject(TYPES.IDecoder) decoder: IDecoder, @inject(TYPES.IPublisher) publisher: IPublisher) {
    this.decoder = decoder;
    this.publisher = publisher;
  }

  public async handleMessage(msg: Buffer) {
    const message = this.decoder.decode(msg.toString("utf-8"));
    await this.publisher.send(message);
    return "OK";
  }
}

export default UdpAppService;
