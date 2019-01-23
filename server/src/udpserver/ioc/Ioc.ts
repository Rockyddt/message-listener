import { Container } from "inversify";
import "reflect-metadata";
import TYPES from "../../common/constant/Types";
import Decoder from "../../common/decoders/Decoder";
import IDecoder from "../../common/decoders/IDecoder";
import AzureEventHubs from "../../common/publishers/AzureEventHubPublisher";
import IPublisher from "../../common/publishers/IPublisher";
import UdpAppService from "../services/UdpAppService";

const container = new Container();

container.bind<IDecoder>(TYPES.IDecoder).to(Decoder);
container.bind<IPublisher>(TYPES.IPublisher).to(AzureEventHubs).inSingletonScope();
container.bind<UdpAppService>(TYPES.UdpAppService).to(UdpAppService);

const AppService = container.get<UdpAppService>(TYPES.UdpAppService);

export {container, AppService};
