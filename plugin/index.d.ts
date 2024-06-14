import type { Plugin } from "vite";

type Params = {
	filename: string;
	content: string;
};

export declare const expandMacro: (params: Params) => null | { code: string };

declare const _default: () => Plugin;

export default _default;
