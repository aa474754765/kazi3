class EventBus {
  static list: { [key: string]: Array<Function> } = {};

  static emit(name: string, data?: any) {
    if (this.list[name]) {
      this.list[name].forEach((fn) => {
        fn(data);
      });
    }
  }
  static on(name: string, fn: Function) {
    this.list[name] = this.list[name] || [];
    if (!this.list[name].find((i) => i === fn)) {
      this.list[name].push(fn);
    }
  }
  static off(name: string, fn?: Function) {
    if (!fn && this.list[name]) {
      this.list[name].length = 0;
    }
    const index = this.list[name].findIndex((i) => i === fn);
    if (index > -1) {
      this.list[name].splice(index, 1);
    }
  }
}
export default EventBus;
