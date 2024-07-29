/// <reference types="svelte" />
import type { TemplateNode } from "svelte/compiler";

type WalkerContext = {
  skip: () => void;
  remove: () => void;
  replace: (node: Node) => void;
};

type SyncHandler<Node extends TemplateNode> = (
  this: WalkerContext,
  node: Node,
  parent: Node | null,
  key: string | number | symbol | null | undefined,
  index: number | null | undefined,
) => void;

export type WalkerArgs = {
  enter?: SyncHandler<TemplateNode>;
  leave?: SyncHandler<TemplateNode>;
};

export declare const chocoPreprocess: () => {
  name: string;
  markup: ({ content, filename }: { content: string; filename?: string | undefined }) => {
    code: string;
  };
};
