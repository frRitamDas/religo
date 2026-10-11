<script lang="ts">
    import "@fontsource/redaction-10/400.css";
    import { t } from "$lib/i18n/translations";
    import DonateBanner from "$components/donate/DonateBanner.svelte";
    import DonateShareCard from "$components/donate/DonateShareCard.svelte";
    import DonateOptionsCard from "$components/donate/DonateOptionsCard.svelte";
    import DonateAltItem from "$components/donate/DonateAltItem.svelte";
    import IconDiamond from "@tabler/icons-svelte/IconDiamond.svelte";
</script>

<svelte:head>
    <title>{$t("tabs.donate")} ~ ReliGo</title>
    <meta property="og:title" content="Support ReliGo" />
    <meta name="description" content="Support ReliGo by sharing feedback, reporting issues, and following project updates." />
</svelte:head>

<div id="donate-page-wrapper">
    <main id="donate-page">
        <DonateBanner />

        <section id="support-options">
            <DonateOptionsCard />
            <DonateShareCard />
        </section>

        <section id="motivation" class="long-text">
            <p>{$t("donate.body.motivation")}</p>
            <p>{$t("donate.body.no_bullshit")}</p>
            <p>{$t("donate.body.keep_going")}</p>
        </section>

        <section id="crypto">
            <div id="crypto-section-header">
                <IconDiamond />
                <h3 id="crypto-title">{$t("donate.alternative.title")}</h3>
            </div>
            <div id="wallet-grid">
                <DonateAltItem type="open" name="GitHub repository" address="https://github.com/frRitamDas/religo" title="Source code, releases, and project updates" />
                <DonateAltItem type="open" name="Report an issue" address="https://github.com/frRitamDas/religo/issues" title="Feedback and reproducible bug reports" />
            </div>
        </section>
    </main>
</div>

<style>
    #donate-page-wrapper {
        display: flex;
        width: 100%;
        height: max-content;
        justify-content: center;
        overflow-y: scroll;
        overflow-x: hidden;
        padding: var(--padding);
    }

    #donate-page {
        --donate-border-radius: 24px;
        --donate-border-opacity: 0.1;
        --donate-gradient-start: #1a1a1a;
        --donate-gradient-end: #404040;
        max-width: 100%;
        width: 900px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    :global([data-theme="dark"]) #donate-page {
        --donate-border-opacity: 0.05;
        --donate-gradient-start: #111111;
        --donate-gradient-end: #2a2a2a;
    }

    #support-options {
        display: flex;
        flex-direction: row;
        gap: 15px;
        width: 100%;
    }

    #motivation,
    #crypto {
        padding: 0 12px;
    }

    #crypto {
        margin-bottom: 12px;
    }

    #crypto-section-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 14px;
    }

    #crypto-section-header :global(svg) {
        width: 22px;
        height: 22px;
        stroke-width: 1.8px;
    }

    #wallet-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }

    #motivation p:first-child {
        margin-block-start: 10px;
    }

    @media screen and (max-width: 760px) {
        #support-options {
            flex-direction: column;
        }
        #wallet-grid {
            grid-template-columns: 1fr;
        }
        #motivation,
        #crypto {
            padding: 0 6px;
        }
    }

    #donate-page-wrapper { padding: clamp(8px,2vw,24px); align-items:flex-start; }
    #donate-page { width:min(100%,980px); gap:clamp(18px,3vw,30px); }
    #support-options { gap:18px; }
    #motivation, #crypto { border-radius:22px; border:1px solid var(--button-stroke); background:var(--button); padding:clamp(18px,3vw,30px); box-shadow:0 10px 32px rgba(20,20,30,.035); }
    #motivation p { line-height:1.75; }
    #crypto-section-header { margin-bottom:18px; }
    #wallet-grid { gap:12px; }
    @media(max-width:600px) { #support-options { grid-template-columns:minmax(0,1fr); } }
 
</style>
