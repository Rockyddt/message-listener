import 'reflect-metadata';
import { Container } from 'inversify';
import IPublisher from '../../common/publishers/IPublisher';
import AzureEventHubs from '../../common/publishers/AzureEventHubs';
import TYPES from '../constant/Types';
import App from '../services/App';
import Decoder from '../../common/decoders/Decoder';
import IDecoder from '../../common/decoders/IDecoder';

let container = new Container();

container.bind<IDecoder>(TYPES.IDecoder).to(Decoder); 
container.bind<IPublisher>(TYPES.IPublisher).to(AzureEventHubs).inSingletonScope();
container.bind<App>(TYPES.AppService).to(App); 

let AppService = container.get<App>(TYPES.AppService)

export {container, AppService};

