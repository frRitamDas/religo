<script lang="ts">import { t } from "$lib/i18n/translations"; import SectionHeading from "$components/misc/SectionHeading.svelte";</script>
<section id="general"><SectionHeading title={$t("about.heading.general")} sectionId="general" />
These terms apply when using the ReliGo instance configured for this website. For another API instance, contact its operator for the applicable terms and data-handling information.</section>
<section id="saving"><SectionHeading title={$t("about.heading.saving")} sectionId="saving" />
ReliGo helps save media from supported public links. You are responsible for ensuring that your use of downloaded content complies with applicable law, the source platform's terms, and relevant licences.

Some requests are processed locally in your browser. Others require the API to fetch, proxy, remux, or transcode media. The API may temporarily handle source URLs, processing parameters, and encrypted tunnel information. Hosting providers and upstream services may process basic operational request data. For details, read the [privacy policy](/about/privacy). Do not submit private URLs, passwords, access tokens, or other sensitive information.</section>
<section id="responsibility"><SectionHeading title={$t("about.heading.responsibility")} sectionId="responsibility" />
You are responsible for how you use and distribute saved content. Respect creators' rights, platform terms, and licences; give credit when required and obtain permission where applicable.</section>
<section id="abuse"><SectionHeading title={$t("about.heading.abuse")} sectionId="abuse" />
To report a technical issue, use the [ReliGo GitHub issue tracker](https://github.com/frRitamDas/religo/issues). Do not include private URLs, access tokens, or personal information in public reports. Responses are best-effort and are not guaranteed.</section>