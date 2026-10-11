<script lang="ts">
    import { page } from "$app/stores";

    import { t } from "$lib/i18n/translations";

    export let name: string;
    export let path: string;
    export let icon: ConstructorOfATypedSvelteComponent;

    export let beta = false;

    $: currentTab = $page.url.pathname.split("/")[1];
    $: baseTabPath = path.split("/")[1];

    $: isTabActive = currentTab === baseTabPath;

</script>

<a
    id="sidebar-tab-{name}"
    class="sidebar-tab"
    class:active={isTabActive}
    href={path}
    role="tab"
    aria-selected={isTabActive}
>
    {#if beta}
        <div class="beta-sign" aria-label={$t("general.beta")}>β</div>
    {/if}

    <svelte:component this={icon} />
    <span class="tab-title">{$t(`tabs.${name}`)}</span>
</a>

<style>
    .sidebar-tab {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 7px;
        padding: 9px 12px;
        color: var(--sidebar-highlight);
        font-size: 13px;
        font-weight: 620;
        opacity: 0.76;
        height: fit-content;
        border-radius: var(--border-radius);
        transition: transform 0.2s;

        text-decoration: none;
        text-decoration-line: none;
        position: relative;

        cursor: pointer;
    }

    .sidebar-tab :global(svg) {
        stroke-width: 1.65px;
        height: 18px;
        width: 18px;
        flex: 0 0 auto;
    }

    :global([data-iphone="true"] .sidebar-tab svg) {
        will-change: transform;
    }

    .sidebar-tab.active {
        color: var(--glass-active-text, var(--primary));
        background: var(--glass-active, var(--secondary));
        opacity: 1;
        transform: none;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.10), inset 0 1px 0 rgba(255, 255, 255, 0.12);
        transition: background-color 180ms ease, color 180ms ease;
        animation: pressButton 0.3s;
        cursor: default;
    }

    .sidebar-tab:not(.active):active {
        transform: scale(0.95);
    }

    :global([data-reduce-motion="true"]) .sidebar-tab:active {
        transform: none;
    }

    .beta-sign {
        position: absolute;
        transform: translateX(16px) translateY(-6px);
        opacity: 0.7;
    }

    .tab-title {
        white-space: nowrap;
    }

    .sidebar-tab:active:not(.active) {
        opacity: 1;
    }

    @keyframes pressButton {
        0% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1.015);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (hover: hover) {
        .sidebar-tab:hover:not(.active) {
            background-color: var(--button-hover-transparent);
        }

        .sidebar-tab:active:not(.active),
        .sidebar-tab:focus:hover:not(.active) {
            background-color: var(--button-press-transparent);
        }

        .sidebar-tab:hover:not(.active) {
            opacity: 1;
        }

        .sidebar-tab:active:not(.active),
        .sidebar-tab:focus:hover:not(.active) {
            opacity: 1;
            box-shadow: 0 0 0 1px var(--sidebar-stroke) inset;
        }
    }

    @media screen and (max-width: 535px) {
        .sidebar-tab {
            flex-direction: column;
            gap: 3px;
            padding: 7px 10px;
            min-width: 48px;
            font-size: 10.5px;
        }

        .sidebar-tab :global(svg) {
            height: 19px;
            width: 19px;
        }

        .sidebar-tab.active {
            z-index: 2;
        }

        .sidebar-tab:active:not(.active) {
            transform: scale(0.9);
        }

        @keyframes pressButton {
            0% {
                transform: scale(0.8);
            }
            50% {
                transform: scale(1.02);
            }
            100% {
                transform: scale(1);
            }
        }
    }
</style>
