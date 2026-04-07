# What this is
This is a plugin package for [@svelte-router/core](https://github.com/WJSoftware/svelte-router), which should be installed. It follows the routing format established by [sv-router](https://sv-router.vercel.app/guide/file-based/route-definition).
# Usage
1. Initialize the library
2. Mount the FileRouter
## Initializing the library
Initialize the library in `main.js` or similar, before any FileRouter is mounted:

```js
import { init } from "svelte-router-file";

init(/* opts */);
```

Initializing this library means that you should not call the usual `init()` function of `@svelte-router/core`.

```js
// BAD:
import { init } from "@svelte-router/core";

init();
```
## Initializing the FileRouter
In the root component, like `App.svelte` or similar:

```svelte
<script lang="ts">
    import { FileRouter } from "svelte-router-file";

    let files = import.meta.glob("routes/**/*.ts");
</script>

<FileRouter files />
```
