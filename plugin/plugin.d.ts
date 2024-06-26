export declare const expandMacro: ({ filename, content }: {
    filename: string;
    content: string;
}) => {
    code: string;
} | null;
export declare const autoSync: () => {
    name: string;
    enforce: "pre";
    transform(this: import("rollup").TransformPluginContext, content: string, id: string): {
        code: string;
    } | null | undefined;
};
