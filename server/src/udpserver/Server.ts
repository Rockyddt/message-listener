import dgram from 'dgram';
import * as log from '../common/log';

import { AddressInfo } from 'net';
import { AppService} from "./ioc/Ioc";
import App from './services/App';


class Server {
	private server: dgram.Socket;
    private appService: App;
    
	constructor(appService: App){				
		this.server = dgram.createSocket('udp4');
		this.appService = appService;
		this.init();		
	}	

	init(){		
		this.server.on('listening', this.onListening);
		this.server.on('error', this.onError);		
		this.server.on('message', this.onMessage);
		this.server.bind(20500);
	}

	onListening = ()=>{
		const address:any = this.server.address();
		log.logInfo(`server listening ${address.address}:${address.port}`);
	}

	onError = (err)=>{
		log.logInfo(`server error:\n${err.stack}`);
		this.server.close();
	}

	onMessage = async(msg: Buffer, remote: AddressInfo)=>{
		let response = await this.appService.handleMessage(msg);
		log.logInfo(`server got: ${msg} from ${remote.address}:${remote.port}`);	

		this.server.send(response,0, response.length, remote.port, remote.address, (err)=>{
			if(err){
				throw err;
			} else {
				log.logInfo("OK sent to client");
			}		
		});
	}
}

export default new Server(AppService);



	