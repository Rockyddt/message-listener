import 'reflect-metadata';
import { Container } from 'inversify';
import IPublisher from '../../common/publishers/IPublisher';
import AzureEventHubs from '../../common/publishers/AzureEventHubPublisher';
import App from '../services/App';
import Decoder from '../../common/decoders/Decoder';
import IDecoder from '../../common/decoders/IDecoder';
import TYPES from '../../common/constant/Types';

let container = new Container();

container.bind<IDecoder>(TYPES.IDecoder).to(Decoder); 
container.bind<IPublisher>(TYPES.IPublisher).to(AzureEventHubs).inSingletonScope();
container.bind<App>(TYPES.UdpAppService).to(App); 

let AppService = container.get<App>(TYPES.UdpAppService)

export {container, AppService};

