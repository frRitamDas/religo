<script lang="ts">
    import { officialApiURL } from "$lib/env";
    import Omnibox from "$components/save/Omnibox.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    let apiState: "checking" | "online" | "offline" = "checking";

    const checkApi = async () => {
        try {
            const response = await fetch(`${officialApiURL}/status`, {
                cache: "no-store",
                signal: AbortSignal.timeout(6000),
            });
            if (!response.ok) throw new Error("Service unavailable");
            apiState = "online";
        } catch {
            apiState = "offline";
        }
    };

    if (typeof window !== "undefined") checkApi();
</script>

<svelte:head>
    <title>ReliGo — Make more of every link</title>
    <meta property="og:title" content="ReliGo — Make more of every link" />
    <meta name="description" content="A beautifully simple space to process media links. Fast, focused tools for the way you use the web." />
    <meta name="theme-color" content="#f5f5f7" />
</svelte:head>

<div class="landing">
    <div class="ambient ambient-one" aria-hidden="true"></div>
    <div class="ambient ambient-two" aria-hidden="true"></div>

    <header class="topline">
        <a class="wordmark" href="/" aria-label="ReliGo home">
            <span class="brand-symbol" aria-hidden="true"><i></i><i></i><i></i></span>
            <span>ReliGo</span>
        </a>
        <div class="topline-right">
            <a class="quiet-link" href="/about">Our approach</a>
            <a class="quiet-link" href="/updates">What's new</a>
            <a class="status-link" href="/status"><span class="status-dot" class:offline={apiState === "offline"} class:checking={apiState === "checking"}></span>{apiState === "online" ? "Systems ready" : apiState === "offline" ? "Service status" : "Connecting"}</a>
        </div>
    </header>

    <main>
        <section class="hero" aria-labelledby="hero-title">
            <div class="eyebrow"><span class="eyebrow-rule"></span> A BETTER WAY TO WORK WITH MEDIA LINKS</div>
            <h1 id="hero-title">Less searching.<br /><span>More getting done.</span></h1>
            <p class="hero-copy">The tools you need, without the noise. Drop in a link, choose what matters, and let ReliGo take it from there.</p>

            <div class="link-panel">
                <div class="panel-head">
                    <div class="panel-title"><span class="panel-number">01</span><div><strong>Start with a link</strong><small>Paste a URL from a supported service</small></div></div>
                    <span class="panel-status"><span class="status-dot" class:offline={apiState === "offline"}></span> {apiState === "online" ? "READY" : "LIVE SERVICE"}</span>
                </div>
                <div class="supported"><SupportedServices /></div>
                <div class="input-stage"><Omnibox /></div>
                <div class="panel-foot"><span>Private by design. Simple by default.</span><span class="shortcut"><kbd>↵</kbd> TO CONTINUE</span></div>
            </div>

            <div class="trust-line"><span class="trust-mark">✳</span> Built for everyday use <span class="trust-divider"></span> Thoughtful on every screen <span class="trust-divider"></span> No clutter, just control</div>
        </section>

        <section class="tools" aria-labelledby="tools-title">
            <div class="section-heading"><div><span class="section-kicker">THE ESSENTIALS</span><h2 id="tools-title">Everything in its place.</h2></div><span class="section-aside">DESIGNED AROUND YOUR WORKFLOW</span></div>
            <div class="tool-grid">
                <a href="/remux" class="tool-card remux-card"><div class="tool-visual visual-remux" aria-hidden="true"><span class="format-chip">MP4</span><span class="visual-arrow">↗</span><span class="format-chip secondary-chip">MKV</span></div><div class="tool-meta"><div><h3>Remux studio</h3><p>Change containers. Keep the quality.</p></div><span class="card-arrow">↗</span></div></a>
                <a href="/settings/appearance" class="tool-card settings-card"><div class="tool-visual visual-settings" aria-hidden="true"><span class="setting-orb orb-a"></span><span class="setting-orb orb-b"></span><span class="setting-orb orb-c"></span></div><div class="tool-meta"><div><h3>Your space, your rules.</h3><p>Appearance, accessibility and preferences.</p></div><span class="card-arrow">↗</span></div></a>
                <a href="/status" class="tool-card status-card"><div class="tool-visual visual-status" aria-hidden="true"><span class="pulse-line"></span><span class="pulse-line line-two"></span><span class="pulse-line line-three"></span><span class="live-label"><span class="status-dot" class:offline={apiState === "offline"}></span>{apiState === "online" ? "OPERATIONAL" : "SERVICE STATUS"}</span></div><div class="tool-meta"><div><h3>Know at a glance.</h3><p>Live service information, whenever you need it.</p></div><span class="card-arrow">↗</span></div></a>
            </div>
        </section>
    </main>

    <footer class="footer"><a class="footer-brand" href="/">ReliGo</a><span>MADE TO FEEL SIMPLE.</span><div><a href="/about">About</a><a href="/donate">Support ReliGo</a><a href="/updates">Release notes</a></div></footer>
</div>

<style>
    .landing {
        --paper:#f5f5f7; --ink:#1d1d1f; --muted:#6e6e73; --line:rgba(29,29,31,.12);
        position:relative; isolation:isolate; width:100%; min-height:100%; overflow:hidden;
        box-sizing:border-box; padding:0 clamp(20px,5.4vw,82px) 20px; color:var(--ink);
        background:linear-gradient(180deg,#f5f5f7 0%,#fafafc 54%,#f1f1f3 100%);
    }
    :global([data-theme="dark"]) .landing { --paper:#080809; --ink:#f5f5f7; --muted:#a1a1a6; --line:rgba(245,245,247,.13); background:linear-gradient(180deg,#080809 0%,#101012 54%,#080809 100%); }
    .ambient { position:absolute; z-index:-1; border-radius:50%; pointer-events:none; filter:blur(75px); opacity:.17; }
    .ambient-one { width:380px;height:380px;top:70px;left:calc(50% - 300px);background:#c9d9ff; }
    .ambient-two { width:320px;height:320px;top:380px;right:-100px;background:#ead8ca;opacity:.14; }
    .topline { height:64px; max-width:1240px; margin:0 auto; display:flex;align-items:center;justify-content:space-between;gap:24px;border-bottom:1px solid var(--line); }
    .wordmark { display:flex;align-items:center;gap:10px;color:var(--ink);text-decoration:none;font-size:19px;font-weight:750;letter-spacing:-.055em; }
    .brand-symbol { display:flex;align-items:center;gap:2px;height:20px; }
    .brand-symbol i { display:block;width:3px;border-radius:4px;background:currentColor; }
    .brand-symbol i:nth-child(1){height:10px;opacity:.5}.brand-symbol i:nth-child(2){height:19px}.brand-symbol i:nth-child(3){height:14px;opacity:.72}
    .topline-right { display:flex;align-items:center;gap:clamp(14px,2.6vw,34px); }
    .quiet-link,.status-link { color:var(--muted);font-size:12px;text-decoration:none;white-space:nowrap;transition:color .2s ease; }
    .quiet-link:hover,.footer a:hover { color:var(--ink); }
    .status-link { display:flex;align-items:center;gap:8px;padding:9px 12px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.34); }
    :global([data-theme="dark"]) .status-link { background:rgba(255,255,255,.04); }
    .status-dot { display:inline-block;width:6px;height:6px;flex:0 0 auto;border-radius:50%;background:#28a36a;box-shadow:0 0 0 3px rgba(40,163,106,.11); }
    .status-dot.offline { background:#d45b5b;box-shadow:0 0 0 3px rgba(212,91,91,.12); }.status-dot.checking { background:#c59a43; }
    .hero { width:100%;max-width:900px;margin:clamp(38px,7vh,76px) auto 0;text-align:center; }
    .eyebrow { display:flex;align-items:center;justify-content:center;gap:10px;color:var(--muted);font-size:9px;font-weight:750;letter-spacing:.16em; }
    .eyebrow-rule { width:22px;height:1px;background:currentColor;opacity:.7; }
    h1 { margin:23px 0 0;font-size:clamp(48px,7.4vw,88px);line-height:.99;letter-spacing:-.078em;font-weight:760;color:var(--ink); }
    h1 span { color:var(--muted);font-weight:520; }
    .hero-copy { max-width:530px;margin:20px auto 0;font-size:clamp(14px,1.45vw,17px);line-height:1.65;letter-spacing:-.015em;color:var(--muted); }
    .link-panel { max-width:730px;margin:clamp(28px,4.5vh,44px) auto 0;text-align:left;border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.67);box-shadow:0 24px 70px rgba(28,32,42,.075),inset 0 1px 0 rgba(255,255,255,.9);backdrop-filter:blur(24px) saturate(145%);-webkit-backdrop-filter:blur(24px) saturate(145%);overflow:visible; }
    :global([data-theme="dark"]) .link-panel { background:rgba(24,24,27,.78);box-shadow:0 24px 70px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.045); }
    .panel-head { display:flex;align-items:center;justify-content:space-between;gap:16px;padding:19px 23px 15px;border-bottom:1px solid var(--line); }
    .panel-title { display:flex;align-items:center;gap:12px; }.panel-number { display:grid;place-items:center;width:31px;height:31px;border:1px solid var(--line);border-radius:10px;font-size:10px;font-weight:750;color:var(--muted); }
    .panel-title strong,.panel-title small { display:block; }.panel-title strong { font-size:14px;font-weight:740;letter-spacing:-.03em; }.panel-title small { margin-top:4px;font-size:11px;color:var(--muted); }
    .panel-status { display:flex;align-items:center;gap:8px;font-size:8px;font-weight:800;letter-spacing:.12em;color:var(--muted);white-space:nowrap; }
    .supported { padding:10px 20px 0; }.input-stage { padding:0 20px 15px; }
    .panel-foot { display:flex;justify-content:space-between;align-items:center;gap:12px;padding:12px 22px;border-top:1px solid var(--line);font-size:10px;color:var(--muted); }
    .shortcut { display:flex;align-items:center;gap:7px;font-size:8px;font-weight:750;letter-spacing:.09em;white-space:nowrap; }
    kbd { display:grid;place-items:center;width:19px;height:19px;border:1px solid var(--line);border-radius:5px;font:inherit; }
    .trust-line { display:flex;justify-content:center;align-items:center;flex-wrap:wrap;gap:12px;margin:22px auto 0;color:var(--muted);font-size:10px; }
    .trust-mark { color:#7b8aa8;font-size:13px; }.trust-divider { height:3px;width:3px;border-radius:50%;background:currentColor;opacity:.55; }
    .tools { max-width:1050px;margin:clamp(58px,8vh,88px) auto 0; }
    .section-heading { display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:18px; }
    .section-kicker { font-size:8px;font-weight:800;letter-spacing:.15em;color:var(--muted); }
    h2 { margin:8px 0 0;font-size:clamp(23px,3.2vw,34px);line-height:1.1;letter-spacing:-.06em;font-weight:730; }
    .section-aside { font-size:8px;letter-spacing:.1em;font-weight:750;color:var(--muted);padding-bottom:4px; }
    .tool-grid { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px; }
    .tool-card { display:flex;flex-direction:column;min-width:0;text-decoration:none;color:var(--ink);border:1px solid var(--line);border-radius:18px;overflow:hidden;background:rgba(255,255,255,.42);transition:transform .25s ease,border-color .25s ease,background .25s ease; }
    :global([data-theme="dark"]) .tool-card { background:rgba(255,255,255,.025); }
    .tool-card:hover { transform:translateY(-3px);border-color:rgba(105,125,160,.38);background:rgba(255,255,255,.75); }
    :global([data-theme="dark"]) .tool-card:hover { background:rgba(255,255,255,.055); }
    .tool-visual { position:relative;display:flex;align-items:center;justify-content:center;height:105px;overflow:hidden;border-bottom:1px solid var(--line); }
    .visual-remux { gap:16px;background:linear-gradient(135deg,rgba(191,207,230,.22),rgba(245,238,230,.36)); }
    .format-chip { padding:10px 13px;border:1px solid rgba(110,125,150,.28);border-radius:9px;background:rgba(255,255,255,.58);font-size:11px;font-weight:800;letter-spacing:.06em;box-shadow:0 8px 20px rgba(25,30,45,.06); }
    .secondary-chip { transform:translateY(10px);opacity:.75; }.visual-arrow { color:var(--muted);font-size:22px; }
    .visual-settings { background:linear-gradient(135deg,rgba(222,218,245,.5),rgba(246,232,221,.42)); }
    .setting-orb { position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.8);box-shadow:inset 0 1px 10px rgba(255,255,255,.4),0 12px 25px rgba(50,40,80,.08); }
    .orb-a { width:66px;height:66px;left:calc(50% - 56px);background:rgba(174,176,228,.6); }.orb-b { width:54px;height:54px;left:calc(50% - 10px);background:rgba(242,207,174,.62); }.orb-c { width:34px;height:34px;left:calc(50% + 22px);background:rgba(185,210,206,.72); }
    .visual-status { gap:6px;background:linear-gradient(135deg,rgba(208,229,215,.4),rgba(222,230,241,.5)); }
    .pulse-line { width:4px;height:24px;border-radius:8px;background:rgba(48,137,96,.45); }.line-two { height:42px; }.line-three { height:32px; }.live-label { position:absolute;right:12px;bottom:10px;display:flex;align-items:center;gap:6px;font-size:7px;letter-spacing:.09em;font-weight:800;color:#548069; }
    .tool-meta { display:flex;justify-content:space-between;align-items:center;gap:12px;padding:16px; }.tool-meta h3 { margin:0;font-size:13px;font-weight:730;letter-spacing:-.035em; }.tool-meta p { margin:6px 0 0;font-size:10px;line-height:1.5;color:var(--muted); }.card-arrow { font-size:14px;color:var(--muted);align-self:flex-start; }
    .footer { max-width:1240px;margin:46px auto 0;padding:16px 0 2px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:16px;color:var(--muted);font-size:9px; }
    .footer-brand { color:var(--ink)!important;font-size:14px;font-weight:800;letter-spacing:-.05em; }.footer div { display:flex;gap:18px; }.footer a { color:var(--muted);text-decoration:none;transition:color .2s ease; }
    @media(max-width:760px) { .landing { padding:0 20px 18px; }.topline { height:58px; }.topline-right { gap:12px; }.quiet-link { display:none; }.hero { margin-top:42px; }.tools { margin-top:54px; }.tool-grid { gap:9px; }.tool-visual { height:85px; }.tool-meta { padding:12px; }.tool-meta h3 { font-size:12px; }.tool-meta p { font-size:9px; }.section-aside { display:none; } }
    @media(max-width:535px) { .landing { padding:0 16px calc(86px + env(safe-area-inset-bottom)); }.topline { height:54px; }.wordmark { font-size:17px; }.status-link { padding:7px 9px;font-size:9px; }.hero { margin-top:36px; }.eyebrow { font-size:7px;letter-spacing:.1em;gap:7px; }.eyebrow-rule { width:15px; } h1 { margin-top:19px;font-size:clamp(42px,11.7vw,58px); }.hero-copy { margin-top:14px;font-size:13px;line-height:1.6; }.link-panel { margin-top:24px;border-radius:18px; }.panel-head { padding:15px 14px 12px; }.panel-title { gap:9px; }.panel-title strong { font-size:13px; }.panel-title small { font-size:9px; }.panel-number { width:28px;height:28px; }.panel-status { font-size:7px; }.supported { padding:8px 12px 0; }.input-stage { padding:0 12px 12px; }.panel-foot { padding:10px 13px;font-size:9px; }.shortcut { display:none; }.trust-line { gap:8px;font-size:8px;margin-top:15px; }.tools { margin-top:46px; }.section-heading { margin-bottom:14px; }.tool-grid { grid-template-columns:1fr;gap:10px; }.tool-card { display:grid;grid-template-columns:100px minmax(0,1fr);min-height:90px; }.tool-visual { height:100%;min-height:90px;border-bottom:0;border-right:1px solid var(--line); }.format-chip { padding:7px 8px;font-size:9px; }.visual-arrow { font-size:15px; }.secondary-chip { display:none; }.orb-a { width:45px;height:45px;left:calc(50% - 32px); }.orb-b { width:38px;height:38px;left:calc(50% - 5px); }.orb-c { width:24px;height:24px;left:calc(50% + 12px); }.tool-meta { padding:13px; }.tool-meta h3 { font-size:12px; }.tool-meta p { font-size:9px; }.footer { margin-top:34px;flex-wrap:wrap; }.footer>span { display:none; }.footer div { gap:13px;font-size:9px; } }
    @media(prefers-reduced-motion:reduce) { .tool-card,.quiet-link,.footer a { transition:none; }.tool-card:hover { transform:none; } }
    :global([data-reduce-motion="true"]) .tool-card { transition:none; }
    :global([data-reduce-transparency="true"]) .link-panel,:global([data-reduce-transparency="true"]) .status-link { backdrop-filter:none;-webkit-backdrop-filter:none;background:var(--primary); }
</style>
