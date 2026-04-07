import { initCore, type InitOptions, type Hash, LocationLite, StockHistoryApi } from "@svelte-router/core";

export let initialized = false;

export let basePath = "./routes";

export function init(options?: Omit<InitOptions, "defaultHash"> & {
    defaultHash?: Exclude<Hash, true | string>;
    basePath?: string;
}) {
    if (options?.defaultHash !== false && options?.defaultHash !== undefined) {
        throw new Error("svelte-router-file requires path mode. Setting defaultHash to anything but false is not allowed.");
    }

    basePath = options?.basePath ?? "./routes";

    const core = initCore(new LocationLite(new StockHistoryApi()), {
        defaultHash: false,
        disallowHashRouting: true,
        ...options
    });

    initialized = true;

    return core;
}
