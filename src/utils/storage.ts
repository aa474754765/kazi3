export const starKey: Key = "stars";
type Key = string;
interface Data<T> {
  value: T;
}

export class Storager {
  static set<T>(key: Key, data: Data<T>[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  static get<T>(key: Key): Data<T>[] {
    const value = localStorage.getItem(key);
    return (value && JSON.parse(value)) || [];
  }

  static add<T>(key: Key, data: Data<T>): void {
    const result = this.get(key) || [];
    result.push(data);
    this.set(key, result);
  }

  static remove<T>(key: Key, data: Data<T>): void {
    const result = this.get(key) || [];
    const index = result.findIndex((i) => i.value == data.value);
    if (index >= 0) {
      result.splice(index, 1);
    }
    this.set(key, result);
  }

  static clear(): void {
    localStorage.clear();
  }
}
