import { test, expect } from "vitest";

import { init, initialized } from "$lib/init.js";

test("init", () => {
    expect(initialized).toEqual(false);

    init();

    expect(initialized).toEqual(true);
});
