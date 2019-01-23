import http from "http";

interface INotificationService {
  listen(server: http.Server): void;
}
export default INotificationService;
