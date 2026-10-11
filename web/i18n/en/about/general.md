<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
    import ReliGoReleasePanel from "$components/about/ReliGoReleasePanel.svelte";
</script>

<ReliGoReleasePanel locale="en" />

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

ReliGo is a straightforward media saver for supported public links. Paste a link, review the available options, and save a video, audio track, photo, or GIF.

The interface adapts to phones, tablets, and desktop screens, keeping the main download flow simple and easy to follow.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

ReliGo is developed and maintained by **Ritam Das**. The goal is a clean, accessible, and dependable experience for saving media from supported services, with clear project ownership and source-code links.

Supported services and available formats may change as external platforms update their systems.
</section>

<section id="privacy-efficiency">
<SectionHeading
    title={$t("about.heading.privacy_efficiency")}
    sectionId="privacy-efficiency"
/>

Where supported, processing can happen directly in your browser. When a task needs server processing, the request is sent to the ReliGo API instance configured for this deployment.

Server-side processing may temporarily handle media links and encrypted tunnel information. Review the [privacy notes](/about/privacy) before using the service, and avoid submitting private or sensitive URLs.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

Explore the project, report issues, and follow code updates in the [ReliGo GitHub repository](https://github.com/frRitamDas/religo).

**Website version:** 11.3

**API version:** 11.3

**Developer:** Ritam Das

ReliGo uses open-source components. Applicable license and copyright notices are retained in the source repository.
</section>
