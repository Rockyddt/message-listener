import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, interfaces } from "inversify-express-utils";
import * as log from "../../common/log";

import TYPES from "../../common/constant/Types";
import IDecoder from "../../common/decoders/IDecoder";
import INotifier from "../../common/subscribers/INotifier";

@controller("/receive")
class ReceiveController implements interfaces.Controller {
  constructor(
    @inject(TYPES.INotificationService) private notificationService: INotifier,
    @inject(TYPES.IDecoder) private decoder: IDecoder,
  ) {}

  @httpPost("/")
  public async receive(req: Request, res: Response) {
    const data = req.body;
    log.logInfo(`Receive message: '${data.body}'`);
    const msg = await this.decoder.decode(data.body);
    this.notificationService.notify(msg.body);
    res.send("Ok");
  }
}

export default ReceiveController;
