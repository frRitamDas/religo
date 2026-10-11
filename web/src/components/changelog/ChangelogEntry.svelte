<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import type { Optional } from "$lib/types/generic";

    import Skeleton from "$components/misc/Skeleton.svelte";
    import { officialApiURL } from "$lib/env";

    type Props = {
        version: string;
        title?: string;
        date?: string;
        banner?: Optional<{ file: string; alt: string }>;
        skeleton?: boolean;
        children?: Snippet
    };

    const { version, title, date, banner, skeleton, children }: Props = $props();

    let bannerLoaded = $state(false);
    let hideSkeleton = $state(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const months = ["January", "February", "March", "April", "May",
                        "June", "July", "August", "September", "October",
                        "November", "December"];

        return [
            months[date.getMonth()],
            date.getDate() + ",",
            date.getFullYear(),
        ].join(" ");
    };

    const loaded = () => {
        bannerLoaded = true;

        // remove the skeleton after the image is done fading in
        setTimeout(() => {
            hideSkeleton = true;
        }, 200)
    }

    onMount(() => {
        const to_focus: HTMLElement | null =
            document.querySelector("[data-first-focus]");
        to_focus?.focus();

        // Route historical links to ReliGo, never to the original product's community.
        const upstreamRepo = "https://github.com/imputnet/cobalt";
        const religoRepo = "https://github.com/frRitamDas/religo";
        const legacySiteLinks = [
            { base: "https://api.cobalt.tools", replacement: officialApiURL },
            { base: "http://api.cobalt.tools", replacement: officialApiURL },
            { base: "https://cobalt.tools", replacement: window.location.origin },
            { base: "http://cobalt.tools", replacement: window.location.origin },
            { base: "https://co.wukko.me", replacement: window.location.origin },
        ];
        const retiredCommunityLinks = [
            "https://twitter.com/justusecobalt",
            "https://x.com/justusecobalt",
            "https://discord.gg/pQPt8HBUPu"
        ];
        document.querySelectorAll<HTMLAnchorElement>("#changelog-parent .changelog-body a").forEach((link) => {
            const legacySite = legacySiteLinks.find(({ base }) => link.href.startsWith(base));
            if (legacySite) {
                const suffix = link.href.slice(legacySite.base.length);
                link.href = legacySite.replacement + suffix;
                link.rel = "noopener noreferrer";
            } else if (link.href.startsWith(upstreamRepo)) {
                const suffix = link.href.slice(upstreamRepo.length);
                const obsoleteResource = [
                    "/issues/", "/pull/", "/pulls/", "/commit/", "/commits/",
                    "/compare/", "/pkgs/", "/actions/"
                ].some((prefix) => suffix.startsWith(prefix));
                link.href = obsoleteResource ? religoRepo : religoRepo + suffix;
                link.rel = "noopener noreferrer";
            } else if (retiredCommunityLinks.some((url) => link.href.startsWith(url))) {
                link.href = religoRepo;
                link.rel = "noopener noreferrer";
            }
        });

        // Present historical release notes under the current ReliGo identity.
        const changelogRoot = document.querySelector("#changelog-parent");
        if (changelogRoot) {
            const walker = document.createTreeWalker(changelogRoot, NodeFilter.SHOW_TEXT);
            let node: Node | null;
            while ((node = walker.nextNode())) {
                if (node.nodeValue) {
                    node.nodeValue = node.nodeValue
                        .replace(/@justusecobalt/gi, "ReliGo")
                        .replace(/cobalt/gi, "ReliGo")
                        .replace(/\bimput\b/gi, "ReliGo")
                        .replace(/meowbalt/gi, "ReliGo");
                }
            }

            changelogRoot.querySelectorAll<HTMLElement>("[alt]").forEach((element) => {
                const alt = element.getAttribute("alt");
                if (alt) {
                    element.setAttribute("alt", alt.replace(/cobalt/gi, "ReliGo").replace(/meowbalt/gi, "ReliGo"));
                }
            });
        }
    });
</script>

<main id="changelog-parent">
    <div id="changelog-header" class:no-padding={!banner && !skeleton}>
        <div class="changelog-info">
            <div
                class="changelog-version"
                data-first-focus
                tabindex="-1"
            >
                {version}
            </div>
            <div class="changelog-date">
                {#if skeleton}
                    <Skeleton width="8em" height="16px" />
                {:else if date}
                    {formatDate(date)}
                {/if}
            </div>
        </div>
        {#if skeleton}
            <Skeleton width="100%" height="27.59px" />
        {:else}
            <h1 class="changelog-title">{title}</h1>
        {/if}
    </div>
    <div class="changelog-content">
        {#if banner}
            <div class="changelog-banner-container">
                <img
                    src={`/update-banners/${banner.file}`}
                    alt={banner.alt}
                    class:loading={!bannerLoaded}
                    onload={loaded}
                    class="changelog-banner"
                />
                <Skeleton class="big changelog-banner" hidden={hideSkeleton} />
            </div>
        {/if}

        {#if skeleton}
            <Skeleton class="big changelog-banner" width="100%" />
        {/if}
        <div class="changelog-body long-text">
            {#if skeleton}
                {#each { length: 3 + Math.random() * 5 } as _}
                    <p>
                        <Skeleton
                            width="100%"
                            height={Math.random() * 84 + 16 + "px"}
                        />
                    </p>
                {/each}
            {:else}
                {@render children?.()}
            {/if}
        </div>
    </div>
</main>

<style>
    #changelog-parent {
        overflow-x: hidden;
    }

    #changelog-header {
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: calc(var(--padding) / 2);
        padding-bottom: 1em; /* match default <p> padding */
    }

    #changelog-header.no-padding {
        padding-bottom: 0;
    }

    .changelog-info {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 14px;
    }

    .changelog-version {
        padding: 3px 8px;
        border-radius: 6px;
        background-color: var(--secondary);
        color: var(--primary);
        font-size: 18px;
        font-weight: 500;
    }

    .changelog-date {
        font-size: 13px;
        font-weight: 500;
        color: var(--gray);
    }

    .changelog-title {
        padding: 0;
        line-height: 1.2;
        font-size: clamp(1.4rem, 4.5vw, 2rem);
        user-select: text;
        -webkit-user-select: text;
    }

    .changelog-banner-container {
        object-fit: cover;
        max-height: 350pt;
        min-height: 180pt;
        width: 100%;
        aspect-ratio: 16/9;
        position: relative;
    }

    :global(.changelog-banner) {
        object-fit: cover;
        width: 100%;
        height: 100%;
        aspect-ratio: 16/9;
        border-radius: var(--padding);
        pointer-events: all;

        opacity: 1;
        transition: opacity 0.15s;

        position: absolute;
        z-index: 2;
    }

    :global(.skeleton.changelog-banner) {
        z-index: 1;
        position: relative;
    }

    .changelog-banner.loading {
        opacity: 0;
    }

    .changelog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .changelog-body {
        width: 100%;
        line-height: 1.7;
        overflow-wrap: anywhere;
    }

    :global(.changelog-body h2) {
        margin: 1.8em 0 0.55em;
        font-size: clamp(1.25rem, 3.3vw, 1.65rem);
        line-height: 1.2;
        letter-spacing: -0.02em;
    }

    :global(.changelog-body h3) {
        margin: 1.35em 0 0.4em;
        font-size: clamp(1.05rem, 2.8vw, 1.25rem);
        line-height: 1.3;
    }

    :global(.changelog-body > p) {
        max-width: 72ch;
        margin-inline: auto;
    }

    :global(.changelog-body img) {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: calc(var(--padding) / 2);
    }

    :global(.changelog-body ul),
    :global(.changelog-body ol) {
        padding-inline-start: 1.35rem;
    }

    :global(.changelog-body a) {
        text-underline-offset: 0.2em;
        text-decoration-thickness: 1px;
        overflow-wrap: anywhere;
    }
</style>
