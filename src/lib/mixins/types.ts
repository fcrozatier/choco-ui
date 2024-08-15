import type { HTMLAttributes } from "svelte/elements";

// TS Mixin constructor constraint
// https://www.typescriptlang.org/docs/handbook/mixins.html#constrained-mixins
export type Constructor<Class> = new (...options: any[]) => Class;

/**
 * Custom utility type to Omit a supertype from a type
 */
export type OmitSupertype<T extends S, S> = Omit<Defined<T>, keyof Defined<S>> & {
  [K in keyof S as K extends keyof T
    ? T[K] extends Record<PropertyKey, any> | undefined
      ? K
      : never
    : never]?: K extends keyof T
    ? T[K] extends Record<PropertyKey, any> | undefined
      ? OmitSupertype<T[K], S[K]>
      : Omit<T[K], K>
    : never;
};

type Defined<T> = T extends undefined ? never : T;

export type Orientation = "horizontal" | "vertical";
export type Timeout = ReturnType<typeof setTimeout>;

// https://github.com/Microsoft/TypeScript/issues/27024
type Equals<X, Y> =
  (<T>() => T extends X ? 1 : 0) extends <U>() => U extends Y ? 1 : 0 ? true : false;

type WritableKeys<T> = {
  [K in keyof T]: Equals<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }> extends true ? K : never;
}[keyof T];

export type Attributes<T extends HTMLElement> = Partial<
  {
    [K in keyof Omit<
      HTMLAttributes<HTMLElement>,
      `on:${string}` | `bind:${string}` | "children"
    >]?: HTMLAttributes<HTMLElement>[K];
  } & {
    [K in WritableKeys<T> as K extends keyof TNonGlobalAttributes
      ? K
      : never]?: K extends keyof TNonGlobalAttributes
      ? (TNonGlobalAttributes[K] & T[K]) | undefined | null
      : T[K] | undefined | null;
  }
>;

export type Required<T, K extends keyof T> = {
  [P in keyof T as P extends K ? P : never]-?: T[P];
} & Omit<T, K>;

type TNonGlobalAttributes = {
  accept: string;
  action: string;
  allow: string;
  alt: string;
  as: string;
  async: boolean;
  autocomplete: string;
  autoplay: boolean;
  capture: "user" | "environment";
  charset: string;
  checked: boolean;
  cite: string;
  cols: number;
  colspan: number;
  content: string;
  controls: boolean;
  coords: string;
  crossorigin: string;
  data: string;
  datetime: string;
  decoding: "async" | "auto" | "sync";
  default: boolean;
  defer: boolean;
  dirname: string;
  disabled: boolean;
  download: string;
  enctype: string;
  for: string;
  form: string;
  formaction: string;
  formenctype: string;
  formmethod: string;
  formnovalidate: boolean;
  formtarget: string;
  headers: string;
  high: number;
  href: string;
  hreflang: string;
  "http-equiv": string;
  integrity: string;
  ismap: boolean;
  kind: string;
  label: string;
  loading: "eager" | "lazy";
  list: string;
  loop: boolean;
  low: number;
  max: number | string;
  maxlength: number;
  minlength: number;
  media: string;
  method: string;
  min: number | string;
  multiple: boolean;
  muted: boolean;
  name: string;
  novalidate: boolean;
  open: boolean;
  optimum: number;
  pattern: string;
  ping: string;
  placeholder: string;
  playsinline: boolean;
  poster: string;
  preload: string;
  readonly: boolean;
  referrerpolicy: ReferrerPolicy;
  rel: string;
  required: boolean;
  reversed: boolean;
  rows: number;
  rowspan: number;
  sandbox: string;
  scope: string;
  selected: boolean;
  shape: string;
  size: number;
  sizes: string;
  span: number;
  src: string;
  srcdoc: string;
  srclang: string;
  srcset: string;
  start: number;
  step: number | string;
  target: string;
  type: string;
  usemap: string;
  value: string | string[] | number;
  wrap: string;
};
