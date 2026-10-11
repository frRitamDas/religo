<script lang="ts">
 import { officialApiURL, contacts } from "$lib/env";
 export let locale: "en" | "ru" = "en";
 type CopyStatus = "idle" | "copied" | "manual";
 let copyStatus: CopyStatus = "idle";
 let resetTimer: ReturnType<typeof setTimeout>;
 const copyEndpoint = async () => {
  if (resetTimer) clearTimeout(resetTimer);
  try { if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable"); await navigator.clipboard.writeText(officialApiURL); copyStatus = "copied"; }
  catch { copyStatus = "manual"; }
  resetTimer = setTimeout(() => copyStatus = "idle", 2600);
 };
</script>
<section class="release-panel" aria-labelledby="release-title">
 <div class="panel-topline"><span class="release-pill">{locale === "ru" ? "РЕЛИЗ · 11.3" : "RELEASE · 11.3"}</span><span class="release-date">{locale === "ru" ? "11 ОКТЯБРЯ 2026" : "11 OCT 2026"}</span></div>
 <div class="panel-heading"><img src="/religo-mark.svg" alt="ReliGo" width="56" height="56" /><div class="heading-copy"><h2 id="release-title">ReliGo <span>11.3</span></h2><p>{locale === "ru" ? "Обновлённый API. Улучшенный интерфейс. Единый стиль." : "Renewed API. Refined interface. One consistent identity."}</p></div></div>
 <div class="version-grid">
  <div class="version-cell"><span>{locale === "ru" ? "ВЕРСИЯ САЙТА" : "WEBSITE VERSION"}</span><strong>11.3</strong></div>
  <div class="version-cell"><span>{locale === "ru" ? "ВЕРСИЯ API" : "API VERSION"}</span><strong>11.3</strong></div>
  <div class="version-cell developer-cell"><span>{locale === "ru" ? "РАЗРАБОТЧИК" : "DEVELOPER"}</span><strong>Ritam Das</strong></div>
 </div>
 <div class="endpoint-card"><div class="endpoint-details"><span class="endpoint-label">{locale === "ru" ? "ОФИЦИАЛЬНЫЙ API" : "OFFICIAL API ENDPOINT"}</span><code>{officialApiURL}</code>
 {#if copyStatus === "manual"}<p class="copy-feedback" role="status">{locale === "ru" ? "Автокопирование недоступно — выделите адрес и скопируйте его вручную." : "Clipboard unavailable. Select the address and copy it manually."}</p>
 {:else if copyStatus === "copied"}<p class="copy-feedback" role="status">{locale === "ru" ? "Адрес API скопирован." : "API address copied."}</p>{/if}</div>
 <button type="button" class="copy-button" on:click={copyEndpoint}>{copyStatus === "copied" ? (locale === "ru" ? "Скопировано ✓" : "Copied ✓") : (locale === "ru" ? "Копировать API" : "Copy API URL")}</button></div>
 <footer class="panel-footer"><span>{locale === "ru" ? "СОЗДАНО RITAM DAS" : "DEVELOPED BY RITAM DAS"}</span><div class="panel-links"><a href={contacts.github} target="_blank" rel="noopener noreferrer">{locale === "ru" ? "Исходный код ↗" : "Source code ↗"}</a><a href={contacts.github + "/issues"} target="_blank" rel="noopener noreferrer">{locale === "ru" ? "Сообщить об ошибке ↗" : "Report an issue ↗"}</a></div></footer>
</section>
<style>
.release-panel{isolation:isolate;overflow:hidden;width:100%;box-sizing:border-box;margin:0 0 28px;padding:clamp(18px,3.5vw,30px);border:1px solid rgba(139,166,255,.26);border-radius:22px;color:#f4f7ff;background:radial-gradient(ellipse at 92% 0%,rgba(126,117,255,.25),transparent 44%),radial-gradient(ellipse at 0% 100%,rgba(71,210,255,.12),transparent 42%),linear-gradient(135deg,#080e20,#111b39 58%,#1a1237);box-shadow:0 16px 48px rgba(14,20,48,.14);font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
.panel-topline,.panel-footer,.panel-links{display:flex;align-items:center;justify-content:space-between;gap:12px}
.release-pill,.release-date,.version-cell>span,.endpoint-label,.panel-footer>span{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:10px;font-weight:650;line-height:1.5;letter-spacing:.11em}
.release-pill{display:inline-flex;align-items:center;min-height:25px;box-sizing:border-box;padding:4px 9px;border:1px solid rgba(112,230,255,.32);border-radius:999px;color:#a8efff;background:rgba(112,230,255,.08)}
.release-date{color:#93a2c9;text-align:right}
.panel-heading{display:flex;align-items:center;gap:16px;margin:24px 0}
.panel-heading img{flex:0 0 auto;width:56px;height:56px;object-fit:contain}.heading-copy{min-width:0}
.heading-copy h2{margin:0;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:clamp(25px,4vw,36px);line-height:1.08;font-weight:780;letter-spacing:-.045em;color:#fff;border:0}
.heading-copy h2 span{color:#a5dfff;letter-spacing:-.025em}.heading-copy p{margin:8px 0 0;color:#bdc9e8;font-size:clamp(12px,1.8vw,14px);line-height:1.5}
.version-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}
.version-cell{display:flex;flex-direction:column;gap:8px;min-width:0;padding:13px 14px;border:1px solid rgba(189,205,255,.15);border-radius:13px;background:rgba(255,255,255,.045)}
.version-cell>span{color:#98a8d2;overflow-wrap:anywhere}.version-cell strong{color:#fff;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:clamp(16px,2.5vw,20px);line-height:1.25;font-weight:730;overflow-wrap:anywhere}
.endpoint-card{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-top:12px;padding:15px;border:1px solid rgba(189,205,255,.16);border-radius:15px;background:rgba(3,8,23,.38)}.endpoint-details{min-width:0}
.endpoint-label{display:block;margin-bottom:7px;color:#98a8d2}.endpoint-details code{display:block;padding:0;color:#d8eaff;background:transparent;font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:12px;line-height:1.6;user-select:text;-webkit-user-select:text;overflow-wrap:anywhere}
.copy-feedback{margin:6px 0 0;color:#a8efff;font-size:11px;line-height:1.45}.copy-button{flex:0 0 auto;min-height:40px;padding:9px 13px;border:1px solid rgba(151,190,255,.38);border-radius:11px;color:#071329;background:linear-gradient(135deg,#b2f1ff,#c9caff);box-shadow:none;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:12px;font-weight:750;cursor:pointer;transition:transform .15s ease,filter .15s ease}
.copy-button:hover{filter:brightness(1.05);transform:translateY(-1px)}.copy-button:focus-visible{outline:2px solid #a8efff;outline-offset:3px}
.panel-footer{flex-wrap:wrap;margin-top:20px;padding-top:17px;border-top:1px solid rgba(189,205,255,.14)}.panel-footer>span{color:#93a2c9}.panel-links{justify-content:flex-end;flex-wrap:wrap}.panel-links a{color:#dce8ff;font-size:12px;font-weight:650;text-decoration:none;text-underline-offset:4px}.panel-links a:hover{color:#a8efff;text-decoration:underline}
@media(max-width:600px){.panel-topline{align-items:flex-start}.release-date{max-width:45%;font-size:9px}.panel-heading{gap:12px;margin:19px 0}.panel-heading img{width:46px;height:46px}.version-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.developer-cell{grid-column:1/-1}.endpoint-card{align-items:stretch;flex-direction:column}.copy-button{width:100%}.panel-footer{align-items:flex-start;flex-direction:column}.panel-links{justify-content:flex-start}}
@media(prefers-reduced-motion:reduce){.copy-button{transition:none}}
</style>