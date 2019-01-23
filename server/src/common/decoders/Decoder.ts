import { injectable } from "inversify";
import "reflect-metadata";
import IDecoder from "./IDecoder";

@injectable()
class Decoder implements IDecoder {

    public decode(msg: string): any {
        const decodedMsg = {
            body: msg,
        };
        return decodedMsg;
    }
}

export default Decoder;
