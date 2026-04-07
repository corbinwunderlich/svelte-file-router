import { beforeAll, expect, test } from "vitest";

import { flushSync, mount } from "svelte";

import { location } from "@svelte-router/core";

import { init } from "$lib/init.js";

import FileRouter from "$lib/FileRouter.svelte";

// @vitest-environment happy-dom

beforeAll(() => {
    init({ basePath: "./exampleRoutes" });
});

function getHeaderText(body: HTMLElement) {
    return body.getElementsByTagName("h1").item(0)?.innerHTML;
}

function navigate(path: string) {
    location.navigate(path);

    flushSync();
}

test("routing works properly", async () => {
    mount(FileRouter, {
        target: document.body,
        props: { files: import.meta.glob("./exampleRoutes/**/*.svelte", { eager: true }) }
    });

    navigate("/");

    expect(getHeaderText(document.body)).toEqual("baseroute");

    navigate("/ljkdwaoiughjwrahj");

    flushSync();

    expect(getHeaderText(document.body)).toEqual("fallback");

    navigate("/foo");

    expect(getHeaderText(document.body)).toEqual("foo");

    const randomID = Math.trunc(Math.random() * 100);

    navigate(`/foo/${randomID.toString()}`);

    expect(getHeaderText(document.body)).toEqual(`id is ${randomID}`);

    navigate("/foo/bar");

    expect(getHeaderText(document.body)).toEqual("foo.bar");
});
