import { initCore, location, type InitOptions, type Hash } from "@svelte-router/core";

export let initialized = false;

export function init(options?: Omit<InitOptions, "defaultHash"> & {
    defaultHash?: Exclude<Hash, true | string>;
}) {
    if (options?.defaultHash !== false && options?.defaultHash !== undefined) {
        throw new Error("svelte-file-router requires path mode. Setting defaultHash to anything but false is not allowed.");
    }

    const core = initCore(location, {
        defaultHash: false,
        disallowHashRouting: true,
        ...options
    });

    initialized = true;

    return core;
}
