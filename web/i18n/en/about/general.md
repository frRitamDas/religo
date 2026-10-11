<script lang="ts">
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

ReliGo helps you save media from supported websites: video, audio, photos, or GIFs. Paste a link to get started.

The interface is designed to be straightforward and usable across devices. Availability depends on the processing API configured for this ReliGo instance.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

ReliGo is a community-maintained fork based on the open-source Cobalt project. The upstream project and its licenses are available at https://github.com/imputnet/cobalt.

This deployment should use an API instance that its operator owns or is authorized to use. Features and availability may differ from the upstream service.
</section>

<section id="privacy-efficiency">
<SectionHeading
    title={$t("about.heading.privacy_efficiency")}
    sectionId="privacy-efficiency"
/>

Some media processing can happen directly in your browser. Requests that need server-side processing are sent to the API instance configured for this deployment.

Privacy and logging practices depend on that API operator. Review the operator's privacy policy before using a community instance, and avoid submitting private or sensitive URLs.

You can configure a different processing instance in settings if you have a trusted API URL.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

ReliGo's source code and project updates are available on GitHub at https://github.com/frRitamDas/religo. Suggestions and contributions are welcome.

**Version:** 1.1

**Developer:** Ritam Das

ReliGo is based on the open-source Cobalt project; upstream attribution and licensing information remain available at https://github.com/imputnet/cobalt.
</section>