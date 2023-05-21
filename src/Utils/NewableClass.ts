export interface NewableClass<T> extends Function {
  new (...args: never[]): T;
}
