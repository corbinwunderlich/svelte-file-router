import type { Component } from "svelte";

import { RouterEngine } from "@svelte-router/core";

import { basename, dirname } from "path-browserify";

function getParamsFromRoute(route: string): string[] {
    const params: string[] = [];
    const regex = /\/:([a-zA-Z_][a-zA-Z0-9_]*)/g;
    let match;

    while ((match = regex.exec(route)) !== null) {
        params.push(match[1]);
    }

    return params;
}

function getRouteFromPath(path: string) {
    const baseRoutesPath = "./routes";

    let basePath = path.startsWith(baseRoutesPath) ?
            path.substring(baseRoutesPath.length) :
        path;

    const fileSuffix = ".svelte";

    if (basePath.endsWith(fileSuffix)) {
        basePath = basePath.substring(
            0,
            basePath.length - fileSuffix.length
        );
    }

    if (
        basename(basePath.replace(".[", "/[")).startsWith("[...") &&
        basename(basePath).endsWith("]")
    ) {
        return "fallback:" + dirname(basePath.replace(".[", "/["));
    }

    basePath = basePath.replaceAll("]", "");
    basePath = basePath.replaceAll("[", ":");

    if (basename(basePath) === "index") {
        return dirname(basePath);
    }

    basePath = basePath.replaceAll(".", "/");

    return basePath;
}

export type RouteComponentType = Record<string, { default: Component } & Record<string, unknown>>;

export function getRoutes(files: () => RouteComponentType) {
    const routes: Record<string, Component> = {};

    const parentRouter = new RouterEngine();
    const routers: Record<string, RouterEngine> = {};

    for (const route in files()) {
        const component = files()[route].default;

        const path = getRouteFromPath(route);

        const params = getParamsFromRoute(path);

        const props: Record<string, string> = {};

        for (const param of params) {
            props[param];
        }

        routes[path] = component;

        const fallbackText = "fallback:";

        if (dirname(path) === "/") {
            parentRouter.routes[path] = { path };
            continue;
        }

        if (dirname(path) === ".") {
            continue;
        }

        if (
            !routers[dirname(path)] &&
            !routers[dirname(path).substring(fallbackText.length)]
        ) {
            if (path.startsWith(fallbackText)) {
                routers[path.substring(fallbackText.length)] = new RouterEngine(
                    { parent: parentRouter }
                );

                continue;
            }

            routers[dirname(path)] = new RouterEngine({
                parent: parentRouter
            });
        }

        routers[dirname(path)].routes[path] = {
            path
        };
    }

    return {
        parentRouter,
        routers,
        routes
    };
}
