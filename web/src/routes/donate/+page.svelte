<script lang="ts">
    import { t } from "$lib/i18n/translations";
</script>

<svelte:head>
    <title>{$t("tabs.donate")} ~ ReliGo</title>
    <meta property="og:title" content="Support ReliGo" />
    <meta name="description" content="Support ReliGo by sharing feedback, reporting issues, and following project updates." />
</svelte:head>

<div id="reli-support-page">
    <header class="support-hero">
        <div class="eyebrow">RELIGO · VERSION 11.3</div>
        <h1>Support ReliGo's development</h1>
        <p>ReliGo is maintained by Ritam Das. The most useful support right now is helping test the experience, reporting problems clearly, and following development.</p>
        <div class="version-line">WEBSITE 11.3 <span>·</span> API 11.3 <span>·</span> RITAM DAS</div>
    </header>

    <section class="support-grid" aria-label="Ways to support ReliGo">
        <article class="support-card">
            <div class="number">01</div>
            <h2>Explore the source</h2>
            <p>Review the code, follow changes, and share ReliGo with people who may find it useful.</p>
            <a class="button" href="https://github.com/frRitamDas/religo" target="_blank" rel="noreferrer">
                Open GitHub repository <span aria-hidden="true">↗</span>
            </a>
        </article>

        <article class="support-card">
            <div class="number">02</div>
            <h2>Report a problem</h2>
            <p>When a supported link fails, include the service, a clear error description, and steps to reproduce it. Never include private URLs or access tokens.</p>
            <a class="button" href="https://github.com/frRitamDas/religo/issues" target="_blank" rel="noreferrer">
                Report an issue <span aria-hidden="true">↗</span>
            </a>
        </article>
    </section>

    <aside class="donation-note">
        <strong>Official donations are not enabled yet.</strong>
        <p>ReliGo does not currently publish its own verified payment channels. Donation links to unrelated projects are intentionally not shown.</p>
    </aside>
</div>

<style>
    #reli-support-page {
        width: 100%;
        max-width: 920px;
        margin: 0 auto;
        padding: var(--padding);
        display: flex;
        flex-direction: column;
        gap: 18px;
        overflow-wrap: anywhere;
    }

    .support-hero {
        position: relative;
        overflow: hidden;
        padding: clamp(24px, 5vw, 42px);
        border: 1px solid color-mix(in srgb, var(--secondary) 18%, transparent);
        border-radius: 24px;
        background:
            radial-gradient(ellipse at 88% 8%, color-mix(in srgb, #8c83ff 25%, transparent), transparent 45%),
            linear-gradient(135deg, color-mix(in srgb, var(--secondary) 12%, var(--background)), var(--background));
    }

    .eyebrow {
        color: var(--gray);
        font-size: 12px;
        font-weight: 750;
        letter-spacing: .16em;
    }

    .support-hero h1 {
        max-width: 16ch;
        margin: 16px 0 12px;
        font-size: clamp(1.8rem, 5.5vw, 3rem);
        line-height: 1.08;
        letter-spacing: -.035em;
    }

    .support-hero p {
        max-width: 58ch;
        line-height: 1.7;
    }

    .version-line {
        margin-top: 24px;
        color: var(--gray);
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .12em;
    }

    .version-line span {
        padding: 0 6px;
        opacity: .55;
    }

    .support-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px;
    }

    .support-card {
        min-width: 0;
        padding: 22px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        border-radius: 20px;
        border: 1px solid color-mix(in srgb, var(--secondary) 15%, transparent);
        background: color-mix(in srgb, var(--secondary) 5%, var(--background));
    }

    .number {
        color: var(--gray);
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .12em;
    }

    .support-card h2 {
        margin: 2px 0;
        font-size: clamp(1.15rem, 3vw, 1.35rem);
    }

    .support-card p {
        flex: 1;
        line-height: 1.65;
    }

    .support-card a {
        margin-top: 8px;
        text-decoration: none;
    }

    .donation-note {
        padding: 18px 20px;
        border-left: 3px solid var(--secondary);
        background: color-mix(in srgb, var(--secondary) 5%, var(--background));
        border-radius: 0 12px 12px 0;
    }

    .donation-note p {
        margin: 6px 0 0;
        color: var(--gray);
        line-height: 1.6;
    }

    @media (max-width: 640px) {
        .support-grid {
            grid-template-columns: 1fr;
        }

        .support-card {
            padding: 18px;
        }
    }
</style>
