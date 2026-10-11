<script lang="ts">
    import { onMount } from "svelte";
    import settings, { updateSetting } from "$lib/state/settings";

    let supported = false;
    let permission = "default";
    let busy = false;
    let message = "";

    onMount(() => {
        supported = "Notification" in window;
        if (supported) permission = Notification.permission;
    });

    const enableNotifications = async () => {
        if (!supported) {
            message = "System notifications are not supported in this browser.";
            return;
        }
        busy = true;
        try {
            permission = await Notification.requestPermission();
            if (permission === "granted") {
                updateSetting({ accessibility: { enableNotifications: true } });
                message = "Notifications enabled for this browser.";
                new Notification("ReliGo notifications enabled", {
                    body: "You can control this preference in Accessibility settings.",
                });
            } else {
                updateSetting({ accessibility: { enableNotifications: false } });
                message = permission === "denied"
                    ? "Notifications are blocked in browser settings."
                    : "Notification permission was not granted.";
            }
        } finally {
            busy = false;
        }
    };

    const disableNotifications = () => {
        updateSetting({ accessibility: { enableNotifications: false } });
        message = "ReliGo notification preference is off. Browser permission is unchanged.";
    };
</script>

<section class="notification-card">
    <div class="notification-icon">⌁</div>
    <div class="notification-copy">
        <strong>Soft system notifications</strong>
        <p>Enable browser permission and save your preference. This release sends a confirmation notice; routine background alerts are not active yet. Your browser controls final permission.</p>
        <small>{!supported ? "Not supported in this browser" : `Browser permission: ${permission}`}</small>
        {#if message}<div class="message" role="status">{message}</div>{/if}
    </div>
    {#if $settings.accessibility.enableNotifications && permission === "granted"}
        <button class="control" on:click={disableNotifications}>Turn off</button>
    {:else}
        <button class="control" on:click={enableNotifications} disabled={busy || !supported}>{busy ? "Please wait…" : "Enable"}</button>
    {/if}
</section>

<style>
    .notification-card { display:flex; align-items:center; gap:14px; padding:17px; border:1px solid var(--glass-border); border-radius:20px; background:var(--glass-surface); }
    .notification-icon { display:grid; place-items:center; flex:0 0 42px; height:42px; border-radius:14px; background:var(--button); font-size:24px; }
    .notification-copy { flex:1; min-width:0; }
    .notification-copy strong { font-size:13px; }
    .notification-copy p { margin:6px 0; opacity:.64; font-size:11px; line-height:1.6; }
    .notification-copy small,.message { font-size:10px; opacity:.72; }
    .message { margin-top:7px; color:var(--blue); }
    .control { flex:0 0 auto; border-radius:999px; padding:10px 14px; background:var(--secondary); color:var(--primary); font-size:11px; font-weight:800; }
    @media(max-width:550px) { .notification-card { align-items:flex-start; flex-wrap:wrap; } .notification-copy { flex-basis:calc(100% - 60px); } .control { margin-left:56px; } }
</style>