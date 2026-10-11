<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import { officialApiURL } from "$lib/env";
    import Omnibox from "$components/save/Omnibox.svelte";
    import Meowbalt from "$components/misc/Meowbalt.svelte";
    import SupportedServices from "$components/save/SupportedServices.svelte";

    let apiState: "checking" | "online" | "offline" = "checking";
    let apiVersion = "";

    const checkApi = async () => {
        try {
            const response = await fetch(`${officialApiURL}/status`, {
                cache: "no-store",
                signal: AbortSignal.timeout(6500),
            });
            if (!response.ok) throw new Error("API unavailable");
            const status = await response.json();
            apiVersion = status.apiVersion ?? status.version ?? "";
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
    <meta name="description" content="A calmer, more considered workspace for your media links. Simple tools, thoughtful details, and control when you need it." />
</svelte:head>

<div class="home">
    <div class="grain" aria-hidden="true"></div>
    <div class="ambient ambient-a" aria-hidden="true"></div>
    <div class="ambient ambient-b" aria-hidden="true"></div>

    <header class="masthead">
        <div class="identity">
            <span class="identity-mark" aria-hidden="true"><span></span><span></span><span></span></span>
            <span class="identity-name">ReliGo</span>
            <span class="identity-divider"></span>
            <span class="identity-edition">MEDIA WORKSPACE</span>
        </div>
        <a class="service-state" href="/status" aria-label="Open ReliGo system status">
            <span class="state-dot" class:offline={apiState === "offline"} class:checking={apiState === "checking"}></span>
            <span>{apiState === "online" ? "All systems ready" : apiState === "offline" ? "Service status" : "Connecting"}</span>
            <span class="state-arrow" aria-hidden="true">↗</span>
        </a>
    </header>

    <main class="stage">
        <section class="intro" aria-labelledby="main-title">
            <div class="edition"><span class="edition-line"></span> A LITTLE LESS FRICTION. A LOT MORE FLOW.</div>
            <h1 id="main-title">Your media.<br /><span>Your way.</span></h1>
            <p class="lead">One place to turn a link into what you need. Thoughtfully simple on the surface, with the tools and control to do more underneath.</p>
        </section>

        <section class="workbench" aria-label="Media link workspace">
            <div class="workbench-top">
                <div class="workbench-title">
                    <span class="workbench-index">01</span>
                    <div><h2>Start with a link</h2><p>Paste a supported media URL to get started.</p></div>
                </div>
                <span class="secure-label"><span aria-hidden="true">✳</span> YOUR WORKFLOW</span>
            </div>
            <div class="service-list"><SupportedServices /></div>
            <main id="cobalt-save" tabindex="-1" data-first-focus>
                <div class="mascot-wrap"><div class="mascot-halo"></div><Meowbalt emotion="smile" /></div>
                <Omnibox />
            </main>
            <div class="workbench-bottom">
                <span><span class="micro-dot"></span> Clean, focused, ready when you are.</span>
                <span>LINK <span class="tiny-separator">/</span> FORMAT <span class="tiny-separator">/</span> GO</span>
            </div>
        </section>

        <section class="quick-access" aria-label="Quick access">
            <div class="quick-heading"><span>MADE TO WORK TOGETHER</span><span class="quick-heading-note">EXPLORE RELIGO <span aria-hidden="true">↘</span></span></div>
            <div class="quick-grid">
                <a class="quick-link" href="/remux">
                    <span class="quick-symbol">↗</span>
                    <span class="quick-copy"><strong>Remux studio</strong><small>Repackage compatible media</small></span>
                    <span class="quick-arrow">↗</span>
                </a>
                <a class="quick-link" href="/settings/appearance">
                    <span class="quick-symbol">◐</span>
                    <span class="quick-copy"><strong>Your preferences</strong><small>Appearance, language and access</small></span>
                    <span class="quick-arrow">↗</span>
                </a>
                <a class="quick-link" href="/status">
                    <span class="quick-symbol">⌁</span>
                    <span class="quick-copy"><strong>System status</strong><small>{apiState === "online" ? `API ${apiVersion || "online"} · responding` : "Live service information"}</small></span>
                    <span class="quick-arrow">↗</span>
                </a>
            </div>
        </section>
    </main>

    <footer class="footer">
        <span>MADE WITH CARE. BUILT TO STAY OUT OF YOUR WAY.</span>
        <div><a href="/about">ABOUT RELIGO</a><span class="footer-separator"></span><a href="/updates">WHAT'S NEW</a></div>
    </footer>
</div>

<style>
    .home {
        --ink: #20201f;
        --muted: #777773;
        --line: rgba(30,30,28,.105);
        --panel: rgba(255,255,253,.66);
        position: relative;
        isolation: isolate;
        display: flex;
        flex-direction: column;
        width: min(100%, 1120px);
        min-height: 100%;
        margin: 0 auto;
        padding: clamp(12px,2vw,26px) clamp(2px,1vw,10px) 12px;
        box-sizing: border-box;
        color: var(--secondary);
    }
    :global([data-theme="dark"]) .home { --ink:#f0f0ed; --muted:#9b9b96; --line:rgba(255,255,255,.12); --panel:rgba(24,24,23,.68); }
    .grain { position:absolute; z-index:-1; inset:0; opacity:.14; pointer-events:none; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.22'/%3E%3C/svg%3E"); mix-blend-mode:soft-light; }
    .ambient { position:absolute; z-index:-2; width:clamp(220px,35vw,430px); aspect-ratio:1; border-radius:50%; filter:blur(75px); opacity:.12; pointer-events:none; animation:drift 24s ease-in-out infinite alternate; }
    .ambient-a { top:2%; right:-8%; background:#9eb8e8; }
    .ambient-b { top:38%; left:-15%; width:clamp(170px,24vw,300px); background:#c5b5a1; animation-delay:-12s; }
    @keyframes drift { from { transform:translate3d(-8px,-10px,0) scale(.96); } to { transform:translate3d(12px,16px,0) scale(1.04); } }
    .masthead,.identity,.service-state,.workbench-top,.workbench-title,.workbench-bottom,.quick-heading,.quick-link,.quick-copy,.footer,.footer>div { display:flex; align-items:center; }
    .masthead { justify-content:space-between; gap:14px; min-height:42px; padding:0 2px; }
    .identity { gap:11px; min-width:0; }
    .identity-mark { display:flex; align-items:center; gap:2px; height:20px; }
    .identity-mark span { display:block; width:3px; border-radius:4px; background:var(--secondary); }
    .identity-mark span:nth-child(1) { height:10px; opacity:.55; }
    .identity-mark span:nth-child(2) { height:19px; }
    .identity-mark span:nth-child(3) { height:14px; opacity:.72; }
    .identity-name { font-size:16px; font-weight:850; letter-spacing:-.055em; }
    .identity-divider { width:1px; height:16px; background:var(--line); margin:0 3px; }
    .identity-edition { font-size:9px; font-weight:750; letter-spacing:.14em; color:var(--muted); }
    .service-state { gap:8px; padding:9px 12px; border:1px solid var(--line); border-radius:999px; background:var(--panel); backdrop-filter:blur(18px) saturate(1.3); -webkit-backdrop-filter:blur(18px) saturate(1.3); text-decoration:none; font-size:10px; font-weight:700; white-space:nowrap; transition:background .2s ease,border-color .2s ease; }
    .service-state:hover { border-color:rgba(100,130,180,.38); }
    .state-dot,.micro-dot { width:6px; height:6px; flex:0 0 auto; border-radius:50%; background:#2aaf78; box-shadow:0 0 0 3px rgba(42,175,120,.12); }
    .state-dot.offline { background:#d75a5a; box-shadow:0 0 0 3px rgba(215,90,90,.12); }
    .state-dot.checking { background:#c7a45c; box-shadow:0 0 0 3px rgba(199,164,92,.12); }
    .state-arrow { opacity:.55; font-size:13px; }
    .stage { width:100%; max-width:920px; margin:clamp(28px,5vh,56px) auto 0; }
    .intro { max-width:690px; padding:0 clamp(4px,1vw,10px); }
    .edition { display:flex; align-items:center; gap:10px; font-size:9px; letter-spacing:.18em; font-weight:800; color:var(--muted); }
    .edition-line { display:inline-block; width:22px; height:1px; background:var(--muted); opacity:.65; }
    h1 { margin:22px 0 0; font-size:clamp(48px,8vw,88px); line-height:.96; letter-spacing:-.082em; font-weight:780; color:var(--ink); }
    h1 span { color:var(--muted); font-weight:500; }
    .lead { max-width:490px; margin:20px 0 0; font-size:clamp(13px,1.5vw,15px); line-height:1.8; letter-spacing:-.012em; color:var(--muted); }
    .workbench { position:relative; margin-top:clamp(27px,5vh,48px); border:1px solid var(--line); border-radius:25px; background:var(--panel); backdrop-filter:blur(28px) saturate(1.28); -webkit-backdrop-filter:blur(28px) saturate(1.28); box-shadow:0 22px 70px rgba(20,20,20,.045),inset 0 1px 0 rgba(255,255,255,.48); overflow:hidden; }
    :global([data-theme="dark"]) .workbench { box-shadow:0 22px 70px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.035); }
    .workbench-top { justify-content:space-between; gap:16px; padding:22px 25px 17px; border-bottom:1px solid var(--line); }
    .workbench-title { gap:13px; min-width:0; }
    .workbench-index { display:grid; place-items:center; width:33px; height:33px; border:1px solid var(--line); border-radius:11px; color:var(--muted); font-size:10px; font-weight:800; flex:0 0 auto; }
    .workbench-title h2 { margin:0; font-size:16px; font-weight:780; letter-spacing:-.045em; }
    .workbench-title p { margin:5px 0 0; color:var(--muted); font-size:11px; line-height:1.5; }
    .secure-label { display:flex; align-items:center; gap:7px; font-size:8px; letter-spacing:.12em; font-weight:800; color:var(--muted); white-space:nowrap; }
    .secure-label span { font-size:12px; }
    .service-list { padding:16px 24px 0; }
    #cobalt-save { display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; box-sizing:border-box; gap:8px; padding:3px 24px 22px; }
    .mascot-wrap { position:relative; display:grid; place-items:center; width:88px; height:72px; margin:0 auto; }
    .mascot-halo { position:absolute; width:60px; height:60px; border-radius:50%; background:radial-gradient(circle,rgba(130,145,168,.17),transparent 70%); }
    #cobalt-save :global(img) { position:relative; width:auto; max-width:80px; max-height:68px; object-fit:contain; filter:drop-shadow(0 7px 12px rgba(0,0,0,.08)); animation:mascotArrive .7s cubic-bezier(.2,.8,.2,1) both; }
    @keyframes mascotArrive { from { opacity:0; transform:translateY(7px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    .workbench-bottom { justify-content:space-between; gap:12px; padding:13px 24px; border-top:1px solid var(--line); color:var(--muted); font-size:9px; }
    .workbench-bottom>span:first-child { display:flex; align-items:center; gap:8px; }
    .workbench-bottom .micro-dot { width:5px; height:5px; box-shadow:none; }
    .tiny-separator { margin:0 6px; opacity:.45; }
    .quick-access { margin-top:clamp(28px,4vh,40px); }
    .quick-heading { justify-content:space-between; gap:12px; padding:0 4px 13px; color:var(--muted); font-size:9px; font-weight:800; letter-spacing:.14em; }
    .quick-heading-note { font-size:8px; letter-spacing:.09em; opacity:.8; }
    .quick-heading-note span { margin-left:5px; }
    .quick-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; }
    .quick-link { min-width:0; gap:12px; padding:16px; border:1px solid var(--line); border-radius:17px; background:var(--panel); text-decoration:none; transition:transform .22s ease,border-color .22s ease,background .22s ease; }
    .quick-link:hover { transform:translateY(-2px); border-color:rgba(110,130,160,.35); background:var(--button); }
    .quick-symbol { display:grid; place-items:center; width:36px; height:36px; flex:0 0 auto; border-radius:12px; border:1px solid var(--line); font-size:17px; color:var(--ink); }
    .quick-copy { align-items:flex-start; flex-direction:column; gap:5px; min-width:0; flex:1; }
    .quick-copy strong { font-size:11px; font-weight:780; letter-spacing:-.025em; }
    .quick-copy small { font-size:9px; color:var(--muted); line-height:1.5; }
    .quick-arrow { font-size:12px; opacity:.45; align-self:flex-start; }
    .footer { justify-content:space-between; gap:14px; margin-top:auto; padding:30px 3px 3px; color:var(--muted); font-size:8px; letter-spacing:.1em; font-weight:700; }
    .footer>div { gap:10px; }
    .footer a { text-decoration:none; transition:opacity .2s ease; }
    .footer a:hover { opacity:.65; }
    .footer-separator { width:3px; height:3px; border-radius:50%; background:currentColor; opacity:.5; }
    @media(max-width:760px) { .stage { margin-top:34px; } .quick-grid { grid-template-columns:1fr; gap:8px; } .quick-link { padding:13px 14px; } .quick-symbol { width:33px; height:33px; } .quick-arrow { align-self:center; } .quick-copy { gap:3px; } .footer { padding-top:24px; } }
    @media(max-width:535px) { .home { padding-top:2px; } .identity-edition,.identity-divider { display:none; } .service-state { padding:8px 10px; font-size:9px; } .stage { margin-top:36px; } .edition { font-size:8px; letter-spacing:.12em; } h1 { margin-top:20px; font-size:clamp(47px,13vw,68px); } .lead { margin-top:16px; font-size:13px; line-height:1.75; } .workbench { margin-top:28px; border-radius:20px; } .workbench-top { padding:17px 16px 15px; } .workbench-title { gap:10px; } .workbench-title h2 { font-size:14px; } .workbench-title p { font-size:10px; } .secure-label { display:none; } .service-list { padding:13px 14px 0; } #cobalt-save { padding:6px 14px 17px; } .mascot-wrap { height:65px; } .workbench-bottom { padding:12px 15px; font-size:8px; } .workbench-bottom>span:last-child { display:none; } .quick-heading { font-size:8px; } .quick-heading-note { display:none; } .footer { flex-direction:column; align-items:flex-start; gap:12px; padding-top:25px; font-size:8px; } }
    @media(prefers-reduced-motion:reduce) { .ambient,#cobalt-save :global(img) { animation:none; } .quick-link,.service-state,.footer a { transition:none; } .quick-link:hover { transform:none; } }
    :global([data-reduce-motion="true"]) .ambient,:global([data-reduce-motion="true"]) #cobalt-save :global(img) { animation:none; }
    :global([data-reduce-transparency="true"]) .workbench,:global([data-reduce-transparency="true"]) .service-state,:global([data-reduce-transparency="true"]) .quick-link { backdrop-filter:none; -webkit-backdrop-filter:none; background:var(--primary); }
</style>
