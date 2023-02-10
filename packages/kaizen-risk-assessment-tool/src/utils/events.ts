export enum Events {
  UPDATE_SETTING = 'UPDATE_SETTING',
}
export const EventEmitter = {
  _events: {},
  dispatch(event: Events, data: any) {
    if (!this._events?.[event]) return;
    this._events[event].forEach((callback) => callback(data));
  },
  subscribe(event: Events, callback: (data: any) => any) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event: Events) {
    if (!this._events[event]) return;
    delete this._events[event];
  },
};
