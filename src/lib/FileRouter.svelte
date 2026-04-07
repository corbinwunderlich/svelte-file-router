<script lang="ts">
    import { Fallback, Route, Router } from "@svelte-router/core";

    import { getRoutes, type RouteComponentType } from "./router.ts";

    import { initialized } from "./init.ts";

    if (!initialized) {
        throw new Error(
            "Before mounting a FileRouter, you must call init() from svelte-router-file"
        );
    }

    type Props = {
        /**
         * Return type for eager import.meta.glob
         * @example
         * ```js
         * import.meta.glob("routes/*.svelte", { eager: true });
         * ```
         */
        files: RouteComponentType;
    };

    let { files }: Props = $props();

    const { parentRouter, routers, routes } = $state(getRoutes(() => files));
</script>

<Router router={parentRouter}>
    {#each Object.keys(routers) as path}
        <Router router={routers[path]}>
            {#each Object.keys(routers[path].routes) as route}
                <Route key={route}>
                    {#snippet children({ rp })}
                        {@const Content = routes[route]}
                        <Content {...rp} />
                    {/snippet}
                </Route>
            {/each}

            {#if routes[`fallback:${path}`]}
                <Fallback>
                    {@const Content = routes[`fallback:${path}`]}
                    <Content />
                </Fallback>
            {/if}
        </Router>
    {/each}

    {#each Object.keys(parentRouter.routes) as route}
        <Route key={route}>
            {#snippet children({ rp })}
                {@const Content = routes[route]}
                <Content {...rp} />
            {/snippet}
        </Route>
    {/each}

    {#if routes["fallback:/"]}
        <Fallback>
            {@const Content = routes["fallback:/"]}
            <Content />
        </Fallback>
    {/if}
</Router>
