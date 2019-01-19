

import { inject, injectable } from 'inversify';

import IPublisher from '../../common/publishers/IPublisher';
import TYPES from '../../udpserver/constant/Types';
import IDecoder from '../../common/decoders/IDecoder';

@injectable()
class App{
    private decoder: IDecoder;
    private publisher:IPublisher;    
    
    constructor(
        @inject(TYPES.IDecoder) decoder: IDecoder,
        @inject(TYPES.IPublisher) publisher: IPublisher){
        this.decoder = decoder;
        this.publisher = publisher;
    }

    async handleMessage(msg: Buffer){
        var message = this.decoder.decode(msg.toString("utf-8"));
        await this.publisher.send(message);        
        return "OK";
    }
}

export default App;