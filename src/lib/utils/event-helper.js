let eventHelper;
class EventHelper {
  constructor() {
    /**
     * listener has表
     * {
     *  instance: {
     *              eventName: [...handlers],
     *            }
     * }
     */
    this._listener = new Map();
  }

  getHandler(vm, eventName) {
    return function(...args) {
      vm.$emit(eventName, ...args);
    };
  }
  addListener(vm, instance, eventName) {
    const handler = this.getHandler(vm, eventName);
    instance.on(eventName, handler, vm);
    if (!this._listener.get(instance)) this._listener.set(instance, {});
    let listenerMap = this._listener.get(instance);
    if (!listenerMap[eventName]) listenerMap[eventName] = [];
    listenerMap[eventName].push(handler);
  }
  removeListener(vm, instance, eventName) {
    if (!this._listener.get(instance) || !this._listener.get(instance)[eventName]) return;
    let listenerArr = this._listener.get(instance)[eventName];
    listenerArr.forEach(listener => instance.off(eventName, listener, vm));
    this._listener.get(instance)[eventName] = [];
  }
  addListenerOnce(vm, instance, eventName) {
    instance.on(eventName, this.getHandler(vm, eventName), vm, true);
  }
  clearListeners(vm, instance) {
    let listeners = this._listener.get(instance);
    if (!listeners) return;
    Object.keys(listeners).map(eventName => {
      this.removeListener(vm, instance, eventName);
    });
  }
}

eventHelper = eventHelper || new EventHelper();

export default eventHelper;
