<script lang="ts">
    import { onMount } from "svelte";
    import { officialApiURL } from "$lib/env";

    type StatusPayload = {
        service?: string;
        status?: string;
        version?: string;
        apiVersion?: string;
        uptimeSeconds?: number;
        startedAt?: string;
        checkedAt?: string;
        services?: string[];
        runtime?: { node?: string; environment?: string };
        note?: string;
    };

    let payload: StatusPayload | null = null;
    let loading = true;
    let error = "";
    let lastChecked = "";
    let refreshTimer: ReturnType<typeof setInterval>;

    const checkStatus = async () => {
        try {
            const response = await fetch(`${officialApiURL}/status`, {
                cache: "no-store",
                signal: AbortSignal.timeout(9000),
            });
            if (!response.ok) throw new Error(`Status endpoint returned HTTP ${response.status}`);
            payload = await response.json();
            error = "";
            lastChecked = new Date().toLocaleTimeString();
        } catch (e) {
            error = e instanceof Error ? e.message : "Unable to reach the ReliGo API.";
        } finally {
            loading = false;
        }
    };

    const formatUptime = (seconds = 0) => {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return days ? `${days}d ${hours}h` : hours ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    onMount(() => {
        checkStatus();
        refreshTimer = setInterval(checkStatus, 30000);
        return () => clearInterval(refreshTimer);
    });
</script>

<svelte:head>
    <title>System status · ReliGo</title>
    <meta name="description" content="Live ReliGo website API status, service metadata, and health information." />
</svelte:head>

<main class="status-page">
    <header class="status-hero">
        <div class="eyebrow"><span class="pulse"></span> RELIGO SYSTEMS</div>
        <h1>Everything, <span>in sync.</span></h1>
        <p>Live status from the ReliGo API itself. The data below is served by the running API instance, not a hard-coded status badge.</p>
        <div class="hero-actions">
            <button class="refresh" on:click={checkStatus} disabled={loading}>↻ {loading ? "Checking…" : "Refresh status"}</button>
            <a href={`${officialApiURL}/status`} target="_blank" rel="noreferrer">Open raw JSON ↗</a>
        </div>
    </header>

    <section class="summary-card" aria-live="polite">
        <div class="summary-copy">
            <span class="muted">API SERVICE</span>
            <h2>{payload?.service ?? "ReliGo API"}</h2>
            <p>{error ? "The live status endpoint could not be reached." : payload?.note ?? "Connecting to the live status endpoint…"}</p>
        </div>
        <div class:offline={!!error} class="status-pill"><span></span>{error ? "Unreachable" : loading ? "Checking" : payload?.status ?? "Unknown"}</div>
    </section>

    {#if error}
        <section class="error-card">
            <strong>We couldn't confirm API health.</strong>
            <p>{error}. This may be a temporary network issue or a sleeping free-tier instance. Try refreshing in a moment.</p>
        </section>
    {/if}

    <section class="metrics" aria-label="API metrics">
        <article class="metric"><span>API VERSION</span><strong>{payload?.apiVersion ?? payload?.version ?? "—"}</strong><small>Reported by the server</small></article>
        <article class="metric"><span>UPTIME</span><strong>{payload ? formatUptime(payload.uptimeSeconds) : "—"}</strong><small>Current process uptime</small></article>
        <article class="metric"><span>ENABLED SERVICES</span><strong>{payload?.services?.length ?? "—"}</strong><small>Configured providers</small></article>
        <article class="metric"><span>LAST CHECK</span><strong>{lastChecked || "—"}</strong><small>Auto-refreshes every 30 seconds</small></article>
    </section>

    <section class="details">
        <div class="section-heading"><div><span class="muted">LIVE TELEMETRY</span><h2>Instance details</h2></div><span class="source">Source: API JSON</span></div>
        <div class="detail-row"><span>Service status</span><strong>{error ? "Could not verify" : payload?.status ?? "Waiting for response"}</strong></div>
        <div class="detail-row"><span>Process started</span><strong>{payload?.startedAt ? new Date(payload.startedAt).toLocaleString() : "—"}</strong></div>
        <div class="detail-row"><span>Runtime</span><strong>{payload?.runtime?.node ?? "—"}</strong></div>
        <div class="detail-row"><span>Environment metadata</span><strong>{payload?.runtime?.environment ?? "—"}</strong></div>
        <div class="provider-list">
            <h3>Configured services</h3>
            {#if payload?.services?.length}
                <div class="chips">{#each payload.services as service}<span>{service}</span>{/each}</div>
            {:else}
                <p class="muted">Service list will appear when the API responds.</p>
            {/if}
        </div>
    </section>

    <footer>ReliGo 11.4 · Status reflects the API process and configured services. Upstream providers may experience separate outages.</footer>
</main>

<style>
    .status-page { width:100%; max-width:1100px; margin:0 auto; padding:clamp(12px,2.4vw,28px); box-sizing:border-box; color:var(--secondary); }
    .status-hero { position:relative; overflow:hidden; padding:clamp(24px,5vw,58px); border:1px solid var(--glass-border); border-radius:30px; background:radial-gradient(ellipse at 80% 0%,rgba(80,140,255,.2),transparent 42%),linear-gradient(135deg,var(--glass-surface),var(--button)); box-shadow:0 20px 70px rgba(0,0,0,.08),inset 0 1px rgba(255,255,255,.4); }
    .eyebrow,.muted,.metric>span { font-size:11px; letter-spacing:.13em; font-weight:800; opacity:.68; }
    .eyebrow { display:flex; align-items:center; gap:9px; }
    .pulse,.status-pill span { display:inline-block; width:8px; height:8px; border-radius:50%; background:#35c979; box-shadow:0 0 0 5px rgba(53,201,121,.13); }
    h1 { margin:24px 0 12px; font-size:clamp(38px,7vw,76px); letter-spacing:-.065em; line-height:.98; font-weight:850; }
    h1 span { color:var(--blue); }
    .status-hero>p { max-width:620px; line-height:1.7; opacity:.72; font-size:clamp(14px,1.5vw,17px); }
    .hero-actions { display:flex; flex-wrap:wrap; align-items:center; gap:14px; margin-top:25px; }
    .refresh { border:0; border-radius:999px; padding:12px 18px; background:var(--secondary); color:var(--primary); font-weight:800; }
    .hero-actions a { padding:10px 0; font-size:13px; font-weight:700; }
    .summary-card,.details,.metric,.error-card { border:1px solid var(--glass-border); border-radius:24px; background:var(--glass-surface); box-shadow:0 12px 40px rgba(0,0,0,.045),inset 0 1px rgba(255,255,255,.22); }
    .summary-card { margin-top:18px; padding:24px; display:flex; justify-content:space-between; align-items:center; gap:20px; }
    .summary-card h2 { font-size:clamp(20px,3vw,29px); margin:8px 0; letter-spacing:-.04em; }
    .summary-card p,.error-card p { margin:0; max-width:700px; opacity:.65; line-height:1.6; font-size:13px; }
    .status-pill { display:flex; align-items:center; gap:10px; white-space:nowrap; padding:10px 14px; border-radius:999px; background:rgba(53,201,121,.12); color:#159653; font-size:12px; font-weight:800; text-transform:capitalize; }
    .status-pill.offline { background:rgba(237,34,54,.12); color:#ed2236; }
    .status-pill.offline span { background:#ed2236; box-shadow:none; }
    .metrics { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-top:12px; }
    .metric { padding:20px; min-width:0; }
    .metric>span { display:block; font-size:10px; }
    .metric strong { display:block; font-size:clamp(20px,2.8vw,32px); letter-spacing:-.05em; margin:15px 0 8px; overflow-wrap:anywhere; }
    .metric small { opacity:.58; font-size:11px; line-height:1.5; }
    .details { margin-top:12px; padding:clamp(18px,3vw,28px); }
    .section-heading { display:flex; align-items:end; justify-content:space-between; gap:12px; margin-bottom:18px; }
    .section-heading h2 { margin:7px 0 0; font-size:clamp(22px,3vw,30px); letter-spacing:-.04em; }
    .source { font-size:11px; opacity:.6; }
    .detail-row { display:flex; justify-content:space-between; gap:18px; padding:15px 0; border-bottom:1px solid var(--glass-border); font-size:13px; }
    .detail-row span { opacity:.65; }
    .detail-row strong { text-align:right; overflow-wrap:anywhere; }
    .provider-list { padding-top:22px; }
    .provider-list h3 { font-size:14px; margin:0 0 14px; }
    .chips { display:flex; flex-wrap:wrap; gap:8px; }
    .chips span { border:1px solid var(--glass-border); background:var(--button); padding:8px 12px; border-radius:999px; font-size:12px; font-weight:700; }
    .error-card { margin-top:12px; padding:20px; border-color:rgba(237,34,54,.3); }
    .error-card strong { display:block; margin-bottom:8px; }
    footer { text-align:center; padding:24px 12px 12px; font-size:11px; opacity:.56; line-height:1.6; }
    @media(max-width:760px) { .metrics { grid-template-columns:repeat(2,minmax(0,1fr)); } .summary-card { align-items:flex-start; flex-direction:column; } }
    @media(max-width:400px) { .status-page { padding:4px; } .status-hero { border-radius:22px; padding:23px 18px; } .metric { padding:14px; } .metric strong { font-size:21px; } .detail-row { font-size:12px; } }
    @media(prefers-reduced-motion:reduce) { .pulse { animation:none; } }
</style>