import http from 'http';

interface INotificationService {
    listen(server: http.Server);
}
export default INotificationService;