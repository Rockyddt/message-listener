import { inject } from 'inversify';
import {
    controller, httpPost, interfaces
  } from 'inversify-express-utils';

import { Request, Response } from 'express';
import * as log from '../../common/log';
import INotificationService from '../services/INotificationService';

import TYPES from '../constant/Types';
import IDecoder from '../../common/decoders/IDecoder';


@controller('/receive')
class ReceiveController implements interfaces.Controller  {
    constructor(
        @inject(TYPES.INotificationService) private notificationService: INotificationService,
        @inject(TYPES.IDecoder) private decoder: IDecoder
        ){

    }

    @httpPost('/')
    async receive(req: Request, res: Response) {
        var data = req.body;   
             
        log.logInfo(`Receive message: '${data.body}'`);        
        var msg = await this.decoder.decode(data.body);
        this.notificationService.notify(msg.body);                
        res.send('Ok');
    }
}

export default ReceiveController;