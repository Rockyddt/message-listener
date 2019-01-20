const TYPES = {    
    INotificationService: Symbol.for('INotificationService'),
    ISubscriber: Symbol.for('ISubscriber'),
    IDecoder: Symbol.for('IDecoder'),    
    IPublisher: Symbol.for('IPublisher'),
    WebAppService: Symbol.for('WebAppService'),    
    UdpAppService: Symbol.for('AppService'),
    EventHubClient: Symbol.for('EventHubClient'),
};

export default TYPES;