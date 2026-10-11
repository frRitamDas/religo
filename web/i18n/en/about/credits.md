<script lang="ts">
    import { docs, contacts } from "$lib/env";
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="project">
<SectionHeading
    title="ReliGo project"
    sectionId="project"
/>

ReliGo is developed and maintained by **Ritam Das**.

**Website version:** 11.3

**API version:** 11.3

**Project:** ReliGo

**Source code:** [github.com/frRitamDas/religo]({contacts.github})

</section>

<section id="source">
<SectionHeading
    title="Source code and updates"
    sectionId="source"
/>

The ReliGo repository is the main place for source code, release notes, issue reports, and project changes. Links in this About section point to ReliGo's own repository rather than an unrelated project page.

The processing API is deployed separately from the static website. Availability can depend on external media platforms and the current API instance configuration.
</section>

<section id="licenses">
<SectionHeading
    title={$t("about.heading.licenses")}
    sectionId="licenses"
/>

The frontend is licensed under [CC-BY-NC-SA 4.0]({docs.webLicense}). The processing API is licensed under [AGPL-3.0]({docs.apiLicense}).

ReliGo uses adapted open-source components. Required original attribution, copyright notices, licence terms, and third-party obligations are retained in the repository. The ReliGo mark and 11.3 release artwork are now part of the project's own user-facing identity.
</section>