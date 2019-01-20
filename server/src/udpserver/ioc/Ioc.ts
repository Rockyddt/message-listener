import 'reflect-metadata';
import { Container } from 'inversify';
import IPublisher from '../../common/publishers/IPublisher';
import AzureEventHubs from '../../common/publishers/AzureEventHubPublisher';
import UdpAppService from '../services/UdpAppService';
import Decoder from '../../common/decoders/Decoder';
import IDecoder from '../../common/decoders/IDecoder';
import TYPES from '../../common/constant/Types';

let container = new Container();

container.bind<IDecoder>(TYPES.IDecoder).to(Decoder); 
container.bind<IPublisher>(TYPES.IPublisher).to(AzureEventHubs).inSingletonScope();
container.bind<UdpAppService>(TYPES.UdpAppService).to(UdpAppService); 

let AppService = container.get<UdpAppService>(TYPES.UdpAppService)

export {container, AppService};

