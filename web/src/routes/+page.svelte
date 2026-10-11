<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { officialApiURL } from "$lib/env";
    import Omnibox from "$components/save/Omnibox.svelte";
    import Meowbalt from "$components/misc/Meowbalt.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    let apiState: "checking" | "online" | "offline" = "checking";
    let apiVersion = "—";

    const checkApi = async () => {
        try {
            const response = await fetch(`${officialApiURL}/status`, {
                cache: "no-store",
                signal: AbortSignal.timeout(6500),
            });
            if (!response.ok) throw new Error("API unavailable");
            const status = await response.json();
            apiVersion = status.apiVersion ?? status.version ?? "—";
            apiState = "online";
        } catch {
            apiState = "offline";
        }
    };

    if (typeof window !== "undefined") checkApi();
</script>

<svelte:head>
    <title>ReliGo — media, in motion</title>
    <meta property="og:title" content="ReliGo — media, in motion" />
    <meta name="description" content="A cleaner, faster ReliGo experience for media links, processing tools, and live service status." />
</svelte:head>

<div class="home-shell">
    <section class="hero">
        <div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>
        <div class="hero-top"><span class="eyebrow"><span class="spark"></span> RELIGO ECOSYSTEM · 11.4</span><a class="status-link" href="/status"><span class:offline={apiState === "offline"} class="status-dot"></span> API {apiState === "online" ? "online" : apiState === "offline" ? "unreachable" : "checking"} <span>↗</span></a></div>
        <div class="hero-grid">
            <div class="hero-copy">
                <h1>Media,<br /><span>without friction.</span></h1>
                <p>A focused workspace for turning media links into the files and formats you need. Fast to reach, easy to control, built to stay out of your way.</p>
                <div class="hero-tags"><span>01 · Paste a link</span><span>02 · Choose a format</span><span>03 · Get moving</span></div>
            </div>
            <div class="hero-mark"><div class="mark-orbit orbit-a"></div><div class="mark-orbit orbit-b"></div><div class="mark-core"><Meowbalt emotion="smile" /></div><span class="mark-caption">RELIABLE BY DESIGN</span></div>
        </div>
        <div class="hero-bottom"><span>YOUR MEDIA WORKFLOW, REFINED.</span><span>11.4 / ECOSYSTEM REFRESH</span></div>
    </section>

    <section class="workspace">
        <div class="section-intro"><div><span class="kicker">THE WORKSPACE</span><h2>Start with a link.</h2></div><p>Paste a supported URL below to begin processing.</p></div>
        <div class="link-panel"><SupportedServices /><main id="cobalt-save" tabindex="-1" data-first-focus><Omnibox /></main><div class="privacy-note"><span>✳</span> Your settings stay yours. Processing depends on your device and selected API instance.</div></div>
        <div class="section-intro tools-heading"><div><span class="kicker">MORE CONTROL</span><h2>Tools that work together.</h2></div><p>Quick paths to the rest of ReliGo.</p></div>
        <div class="tool-grid">
            <a class="tool-card" href="/remux"><span class="tool-icon">↗</span><span class="tool-label">FORMAT TOOL</span><h3>Remux studio</h3><p>Repackage compatible media without an unnecessary full re-encode.</p><span class="tool-arrow">Explore tool ↗</span></a>
            <a class="tool-card" href="/settings/appearance"><span class="tool-icon">◉</span><span class="tool-label">PERSONALIZATION</span><h3>Your experience</h3><p>Choose appearance and language, then tune accessibility and motion preferences.</p><span class="tool-arrow">Open settings ↗</span></a>
            <a class="tool-card" href="/status"><span class="tool-icon">⌁</span><span class="tool-label">LIVE TELEMETRY</span><h3>System status</h3><p>Check the API version, process uptime, configured services, and live JSON.</p><span class="tool-arrow">View status ↗</span></a>
            <a class="tool-card" href="/updates"><span class="tool-icon">✳</span><span class="tool-label">RELEASE NOTES</span><h3>What's new</h3><p>Explore the 11.4 refresh and previous release notes.</p><span class="tool-arrow">Read updates ↗</span></a>
        </div>
        <div class="system-strip"><div><span class="system-light" class:offline={apiState === "offline"}></span><div><strong>{apiState === "online" ? "ReliGo API responding" : apiState === "offline" ? "API response not confirmed" : "Checking ReliGo API"}</strong><small>{apiVersion === "—" ? "Live service information is loading" : `API version ${apiVersion} · verified from the server`}</small></div></div><a href={`${officialApiURL}/status`} target="_blank" rel="noreferrer">API JSON ↗</a></div>
    </section>
</div>

<style>
    .home-shell { width:100%; max-width:1240px; margin:0 auto; padding:clamp(6px,1.4vw,18px); box-sizing:border-box; }
    .hero { position:relative; overflow:hidden; isolation:isolate; border:1px solid var(--glass-border); border-radius:32px; padding:clamp(22px,4vw,46px); background:radial-gradient(ellipse at 75% 5%,rgba(89,120,255,.2),transparent 36%),radial-gradient(ellipse at 0% 100%,rgba(50,205,180,.12),transparent 40%),linear-gradient(135deg,var(--glass-surface),var(--button)); box-shadow:0 24px 90px rgba(0,0,0,.07),inset 0 1px 0 rgba(255,255,255,.38); }
    .hero-top,.hero-bottom,.hero-grid,.hero-tags,.section-intro,.system-strip,.system-strip>div { display:flex; align-items:center; justify-content:space-between; gap:18px; }
    .hero-top,.hero-bottom { position:relative; z-index:1; }
    .eyebrow,.kicker,.tool-label,.hero-bottom { font-size:10px; letter-spacing:.14em; font-weight:850; opacity:.65; }
    .eyebrow { display:flex; align-items:center; gap:9px; }
    .spark { width:7px; height:7px; background:var(--blue); border-radius:50%; box-shadow:0 0 0 5px rgba(47,138,249,.14); }
    .status-link { display:flex; align-items:center; gap:8px; padding:10px 13px; border:1px solid var(--glass-border); background:var(--glass-surface); border-radius:999px; text-decoration:none; font-size:11px; font-weight:750; white-space:nowrap; }
    .status-dot,.system-light { width:7px; height:7px; border-radius:50%; background:#25bb72; flex:0 0 auto; box-shadow:0 0 0 4px rgba(37,187,114,.13); }
    .status-dot.offline,.system-light.offline { background:#e94c5d; box-shadow:0 0 0 4px rgba(233,76,93,.12); }
    .hero-grid { position:relative; z-index:1; align-items:center; min-height:300px; }
    .hero-copy { max-width:680px; padding:25px 0 32px; }
    h1 { margin:0; font-size:clamp(42px,7.4vw,88px); font-weight:900; line-height:.95; letter-spacing:-.075em; }
    h1 span { color:var(--blue); }
    .hero-copy>p { max-width:550px; font-size:clamp(14px,1.4vw,17px); line-height:1.75; opacity:.68; margin:24px 0; }
    .hero-tags { justify-content:flex-start; flex-wrap:wrap; gap:8px; }
    .hero-tags span { padding:9px 11px; border-radius:999px; background:var(--glass-surface); border:1px solid var(--glass-border); font-size:10px; font-weight:700; }
    .hero-mark { position:relative; width:clamp(180px,24vw,290px); aspect-ratio:1; flex:0 0 auto; display:grid; place-items:center; margin-right:clamp(0px,3vw,40px); }
    .mark-orbit { position:absolute; inset:8%; border:1px solid var(--glass-border); border-radius:50%; }
    .orbit-a { transform:rotate(-24deg) scaleY(.72); border-style:dashed; }
    .orbit-b { inset:0; transform:rotate(28deg) scaleY(.78); }
    .mark-core { width:58%; aspect-ratio:1; display:grid; place-items:center; border-radius:32%; background:var(--glass-surface); border:1px solid var(--glass-border); box-shadow:0 25px 65px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.55); }
    .mark-core :global(img) { max-width:76%; max-height:76%; object-fit:contain; }
    .mark-caption { position:absolute; bottom:3%; font-size:9px; letter-spacing:.16em; font-weight:800; opacity:.5; }
    .hero-bottom { border-top:1px solid var(--glass-border); padding-top:17px; }
    .workspace { padding:clamp(22px,4vw,46px) 0; }
    .section-intro { align-items:end; margin:10px 2px 18px; }
    .section-intro h2 { font-size:clamp(25px,3.5vw,39px); letter-spacing:-.055em; margin:7px 0 0; font-weight:850; }
    .section-intro>p { font-size:12px; opacity:.58; max-width:310px; line-height:1.6; margin:0; }
    .link-panel { border:1px solid var(--glass-border); border-radius:26px; padding:clamp(16px,3vw,28px); background:var(--glass-surface); box-shadow:0 15px 50px rgba(0,0,0,.04),inset 0 1px rgba(255,255,255,.3); }
    #cobalt-save { width:100%; }
    .privacy-note { display:flex; gap:8px; align-items:center; justify-content:center; text-align:center; font-size:10px; opacity:.58; padding-top:16px; }
    .privacy-note span { color:var(--blue); font-size:14px; }
    .tools-heading { margin-top:42px; }
    .tool-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
    .tool-card { min-width:0; padding:22px; border:1px solid var(--glass-border); border-radius:23px; background:var(--glass-surface); text-decoration:none; transition:transform 180ms ease,border-color 180ms ease,box-shadow 180ms ease; box-shadow:inset 0 1px rgba(255,255,255,.28); }
    .tool-card:hover { transform:translateY(-3px); border-color:rgba(47,138,249,.4); box-shadow:0 15px 40px rgba(0,0,0,.07); }
    .tool-icon { display:grid; place-items:center; width:42px; height:42px; border-radius:14px; background:var(--button); font-size:22px; margin-bottom:25px; }
    .tool-label { font-size:9px; }
    .tool-card h3 { font-size:clamp(17px,2vw,22px); margin:9px 0; letter-spacing:-.04em; }
    .tool-card p { font-size:12px; line-height:1.7; opacity:.62; min-height:60px; }
    .tool-arrow { display:block; font-size:11px; font-weight:800; margin-top:18px; }
    .system-strip { border:1px solid var(--glass-border); border-radius:20px; margin-top:14px; padding:17px 20px; background:var(--button); }
    .system-strip>div { justify-content:flex-start; }
    .system-strip strong,.system-strip small { display:block; }
    .system-strip strong { font-size:12px; }
    .system-strip small { margin-top:4px; font-size:10px; opacity:.58; }
    .system-strip>a { font-size:11px; font-weight:800; white-space:nowrap; }
    @media(max-width:950px) { .tool-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } .hero-mark { width:180px; margin-right:0; } }
    @media(max-width:620px) { .hero { border-radius:24px; padding:20px 17px; } .hero-grid { min-height:0; } .hero-mark { display:none; } .hero-copy { padding:38px 0 30px; } .hero-bottom { font-size:8px; letter-spacing:.08em; } .section-intro { align-items:flex-start; flex-direction:column; gap:7px; } .section-intro>p { max-width:none; } .tool-grid { gap:9px; } .tool-card { padding:16px; border-radius:18px; } .tool-icon { margin-bottom:18px; } .tool-card p { min-height:100px; font-size:11px; } .system-strip { align-items:flex-start; padding:15px; } }
    @media(max-width:360px) { .tool-grid { grid-template-columns:1fr; } .tool-card p { min-height:0; } .hero-tags span { font-size:9px; } }
    @media(prefers-reduced-motion:reduce) { .tool-card { transition:none; } .tool-card:hover { transform:none; } }
</style>