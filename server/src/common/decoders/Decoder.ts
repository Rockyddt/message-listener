import IDecoder from "./IDecoder";
import { injectable } from "inversify";


@injectable()
class Decoder implements IDecoder {
    
    async decode(msg: string): Promise<any>{     
        var decodedMsg = {
            body: msg
        }
        return decodedMsg;
    }
}

export default Decoder;