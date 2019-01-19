import 'reflect-metadata';
import IDecoder from './IDecoder';
import { injectable } from 'inversify';


@injectable()
class Decoder implements IDecoder {
    
    decode(msg: string): any{     
        var decodedMsg = {
            body: msg
        }
        return decodedMsg;
    }
}

export default Decoder;