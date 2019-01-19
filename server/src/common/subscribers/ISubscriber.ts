
interface ISubscriber {
    registerNotifier(notifier: any);
    subscribe();
}
export default ISubscriber;