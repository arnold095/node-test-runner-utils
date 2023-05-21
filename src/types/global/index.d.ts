declare module 'node:test/reporters' {
  import { NewableClass } from '../../Utils/NewableClass';
  /**
   * The `dot` reporter outputs the test results in a compact format, where each passing test is represented by a `.`, and each failing test is represented by a `X`
   */
  export const dot: () => void;
  /**
   * The `spec` reporter outputs the test results in a human-readable format.
   */
  export const spec: NewableClass<unknown>;
  /**
   * The `tap` reporter outputs the test results in a TAP format.
   */
  export const tap: () => void;
}
