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
        margin: 0;
        translate: -50% 0;
        isolation: isolate;
        width: max-content;
        max-width: calc(100vw - 24px);
        box-sizing: border-box;
        height: auto;
        padding: 7px 9px;
        gap: 10px;
        border: 1px solid var(--glass-border);
        border-radius: 999px;
        background: var(--glass-surface);
        color: var(--secondary);
        box-shadow: 0 18px 54px rgba(0, 0, 0, 0.18), 0 3px 12px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.24);
        backdrop-filter: blur(32px) saturate(185%);
        -webkit-backdrop-filter: blur(32px) saturate(185%);
        transition: background-color 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
    }

    #sidebar-tabs {
        height: auto;
        min-width: 0;
        justify-content: center;
        gap: 4px;
        padding: 0;
        flex: 1 1 auto;
        overflow: hidden;
        scrollbar-width: none;
    }

    #sidebar :global(.sidebar-inner-container) {
        gap: 4px;
        padding: 0;
    }

    @media screen and (max-width: 535px) {
        #sidebar {
            top: auto;
            position: fixed;
            top: auto;
            left: 50%;
            translate: -50% 0;
            bottom: calc(10px + env(safe-area-inset-bottom));
            width: max-content;
            max-width: calc(100vw - 16px);
            padding: 7px 9px;
            gap: 0;
            backdrop-filter: blur(28px) saturate(180%);
            -webkit-backdrop-filter: blur(28px) saturate(180%);
        }

        #sidebar::before { content: none; }

        #sidebar-tabs {
            max-width: 100%;
            flex: 1 1 auto;
            overflow: hidden;
            justify-content: flex-start;
        }

        #sidebar :global(.sidebar-inner-container) {
            flex: 0 0 auto;
            gap: 2px;
            padding: 0;
        }

        #sidebar :global(#cobalt-logo) { display: none; }
    }


    @media screen and (min-width: 536px) and (max-width: 680px) {
        #sidebar {
            max-width: calc(100vw - 12px);
            padding: 6px;
            gap: 3px;
        }

        #sidebar :global(#cobalt-logo) {
            display: none;
        }

        #sidebar-tabs,
        #sidebar :global(.sidebar-inner-container) {
            gap: 1px;
        }

        #sidebar :global(.sidebar-tab) {
            gap: 5px;
            padding: 8px 9px;
            font-size: 12px;
        }
    }

    :global([data-reduce-transparency="true"]) #sidebar {
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        background: var(--sidebar-bg);
    }

    @media (prefers-reduced-transparency: reduce) {
        #sidebar {
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
            background: var(--sidebar-bg);
        }
    }

</style>
