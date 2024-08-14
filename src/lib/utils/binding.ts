type Primitive = string | number | boolean | Primitive[];

export type Gettable<U extends Primitive> = U | (() => U);

export type StripThunks<A extends Record<string, unknown>> = {
  [Key in keyof A as Key extends `set${infer _}` ? never : Key]: A[Key] extends
    | Gettable<infer U>
    | undefined
    ? U
    : A[Key];
};

export const getValue = <U extends Primitive>(input: Gettable<U>) => {
  return typeof input === "function" ? input() : input;
};
