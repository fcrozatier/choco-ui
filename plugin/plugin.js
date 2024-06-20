import { expand } from "./transformer.js";
var script = /<script.*>((.|\r?\n)*)<\/script>/;
var svelte = /\.svelte$/;
var svelteModule = /\.svelte(\.ts)?$/;
var callsBind = /(^|[^.\w])bind\(/;
export var expandMacro = function (_a) {
    var _b;
    var filename = _a.filename, content = _a.content;
    var scriptTag;
    var source = content;
    if (svelte.test(filename)) {
        scriptTag = (_b = content.match(script)) === null || _b === void 0 ? void 0 : _b[1];
        if (!scriptTag)
            return null;
        source = scriptTag;
    }
    var code = expand({ filename: filename, content: source });
    if (!scriptTag)
        return { code: code };
    return { code: content.replace(scriptTag, code) };
};
export var autoSync = function () {
    return {
        name: "vite-plugin-auto-sync",
        enforce: "pre",
        transform: function (content, id) {
            if (svelteModule.test(id) && callsBind.test(content)) {
                return expandMacro({
                    filename: id,
                    content: content,
                });
            }
        },
    };
};
