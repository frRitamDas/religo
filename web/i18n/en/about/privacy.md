<script lang="ts">
    import env from "$lib/env";
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="general">
<SectionHeading
    title={$t("about.heading.general")}
    sectionId="general"
/>

ReliGo is a website connected to a separately hosted processing API. Data handling depends on the active API instance and its hosting configuration, so this page does not promise universal zero-logging.

The web host and API operator may receive basic technical information needed to deliver requests, diagnose faults, prevent abuse, and keep the service available. Do not submit private, confidential, or access-token-bearing URLs.
</section>

<section id="local">
<SectionHeading
    title={$t("about.heading.local")}
    sectionId="local"
/>

When the browser supports on-device processing and the selected task permits it, the relevant processing can happen locally on your device. Media content processed entirely on-device does not need to be uploaded to the ReliGo API for that processing step.
</section>

<section id="saving">
<SectionHeading
    title={$t("about.heading.saving")}
    sectionId="saving"
/>

Some downloads require the processing API to fetch, proxy, remux, or transcode media. In those cases, the API may create a temporary tunnel and hold the minimal encrypted tunnel information needed to deliver the result. The default tunnel lifetime in this codebase is 90 seconds, although an API operator may configure it differently.

Temporary tunnel information can include the source service, media URLs, generated filename, and processing parameters. Media is processed as required to complete the request; this is not a guarantee that every upstream provider or hosting layer retains no operational logs.
</section>

<section id="encryption">
<SectionHeading
    title={$t("about.heading.encryption")}
    sectionId="encryption"
/>

The tunnel implementation uses encryption for sensitive tunnel details, with access information carried in the generated link. Treat download links as private: anyone who receives an active link may be able to access the corresponding result until it expires.
</section>

{#if env.PLAUSIBLE_ENABLED}
<section id="plausible">
<SectionHeading
    title={$t("about.heading.plausible")}
    sectionId="plausible"
/>

This deployment has an analytics endpoint configured. The exact analytics processing and retention practices depend on that endpoint and its operator. You can check [privacy settings](/settings/privacy#analytics) to see whether analytics can be disabled in this build.
</section>
{/if}

<section id="hosting">
<SectionHeading
    title="Hosting and request data"
    sectionId="hosting"
/>

The public ReliGo website is hosted separately from the processing API. Network requests therefore pass through the relevant hosting providers. Their own privacy policies and technical logs may apply in addition to this project's code.

For source code and issue reporting, visit the [ReliGo repository](https://github.com/frRitamDas/religo).
</section>
