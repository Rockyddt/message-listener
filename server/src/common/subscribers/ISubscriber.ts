interface ISubscriber {
  registerNotifier(notifier: any): void;
  subscribe(): void;
}
export default ISubscriber;
