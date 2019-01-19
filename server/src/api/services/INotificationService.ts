import http from 'http';

interface INotificationService {
    notify(data: any);
    listen(server: http.Server);
}
export default INotificationService;