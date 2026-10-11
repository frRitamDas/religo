<script lang="ts">
    import settings from "$lib/state/settings";

    import { t } from "$lib/i18n/translations";
    import { defaultNavPage } from "$lib/subnav";

    import CobaltLogo from "$components/sidebar/CobaltLogo.svelte";
    import SidebarTab from "$components/sidebar/SidebarTab.svelte";

    import IconDownload from "@tabler/icons-svelte/IconDownload.svelte";
    import IconSettings from "@tabler/icons-svelte/IconSettings.svelte";

    import IconRepeat from "@tabler/icons-svelte/IconRepeat.svelte";

    import IconComet from "@tabler/icons-svelte/IconComet.svelte";
    import IconHeart from "@tabler/icons-svelte/IconHeart.svelte";
    import IconInfoCircle from "@tabler/icons-svelte/IconInfoCircle.svelte";

    let screenWidth: number;
    let settingsLink = defaultNavPage("settings");
    let aboutLink = defaultNavPage("about");

    $: screenWidth,
        (settingsLink = defaultNavPage("settings")),
        (aboutLink = defaultNavPage("about"));
</script>

<svelte:window bind:innerWidth={screenWidth} />

<nav id="sidebar" aria-label={$t("a11y.tabs.tab_panel")}>
    <CobaltLogo />
    <div id="sidebar-tabs" role="tablist">
        <div id="sidebar-actions" class="sidebar-inner-container">
            <SidebarTab name="save" path="/" icon={IconDownload} />
            {#if !$settings.appearance.hideRemuxTab}
                <SidebarTab name="remux" path="/remux" icon={IconRepeat} beta />
            {/if}
        </div>
        <div id="sidebar-info" class="sidebar-inner-container">
            <SidebarTab name="settings" path={settingsLink} icon={IconSettings} />
            <SidebarTab name="donate" path="/donate" icon={IconHeart} />
            <SidebarTab name="updates" path="/updates" icon={IconComet} />
            <SidebarTab name="about" path={aboutLink} icon={IconInfoCircle} />
        </div>
    </div>
</nav>

<style>
    #sidebar,
    #sidebar-tabs,
    .sidebar-inner-container {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    #sidebar {
        position: fixed;
        z-index: 20;
        top: max(14px, env(safe-area-inset-top));
        left: 50%;
        transform: translateX(-50%);
        width: max-content;
        max-width: calc(100vw - 28px);
        height: auto;
        padding: 7px 9px;
        gap: 10px;
        border: 1px solid var(--glass-border);
        border-radius: 999px;
        background: var(--glass-surface);
        color: var(--secondary);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.14);
        backdrop-filter: blur(24px) saturate(160%);
        -webkit-backdrop-filter: blur(24px) saturate(160%);
    }

    #sidebar-tabs {
        height: auto;
        min-width: 0;
        justify-content: center;
        gap: 4px;
        padding: 0;
        overflow-x: auto;
        overflow-y: visible;
        scrollbar-width: none;
    }

    #sidebar-tabs::-webkit-scrollbar {
        display: none;
    }

    #sidebar :global(.sidebar-inner-container) {
        gap: 4px;
        padding: 0;
    }

    @media screen and (max-width: 535px) {
        #sidebar {
            top: auto;
            bottom: calc(10px + env(safe-area-inset-bottom));
            width: max-content;
            max-width: calc(100vw - 20px);
            padding: 6px 8px;
            gap: 0;
        }

        #sidebar::before { content: none; }

        #sidebar-tabs {
            max-width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            justify-content: flex-start;
        }

        #sidebar :global(.sidebar-inner-container) {
            flex: 0 0 auto;
            gap: 2px;
            padding: 0;
        }

        #sidebar :global(#cobalt-logo) { display: none; }
    }

    @media (prefers-reduced-transparency: reduce) {
        #sidebar {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: var(--sidebar-bg);
        }
    }

    @media screen and (orientation: landscape) {
        :global([data-iphone="true"]) #sidebar {
            left: calc(50% + (env(safe-area-inset-left) - env(safe-area-inset-right)) / 2);
        }
    }
</style>
