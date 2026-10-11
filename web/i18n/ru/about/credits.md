<script lang="ts">
    import { docs, contacts } from "$lib/env";
    import { t } from "$lib/i18n/translations";

    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="project">
<SectionHeading
    title="Проект ReliGo"
    sectionId="project"
/>

ReliGo разрабатывает и поддерживает **Ritam Das**.

**Версия сайта:** 11.4

**Версия API:** 11.4

**Проект:** ReliGo

**Исходный код:** [github.com/frRitamDas/religo]({contacts.github})

</section>

<section id="source">
<SectionHeading
    title="Исходный код и обновления"
    sectionId="source"
/>

Репозиторий ReliGo — основное место для исходного кода, заметок о релизах, сообщений об ошибках и информации об изменениях проекта. Ссылки в этом разделе ведут в собственный репозиторий ReliGo.

API обработки размещён отдельно от статического сайта. Доступность зависит от внешних медиаплатформ и текущей конфигурации API-инстанса.
</section>

<section id="licenses">
<SectionHeading
    title={$t("about.heading.licenses")}
    sectionId="licenses"
/>

Фронтенд распространяется по лицензии [CC-BY-NC-SA 4.0]({docs.webLicense}). API обработки распространяется по лицензии [AGPL-3.0]({docs.apiLicense}).

ReliGo использует адаптированные компоненты с открытым исходным кодом. Требуемые уведомления об авторских правах, условия лицензий и обязательства перед сторонними проектами сохранены в репозитории. Фирменный знак ReliGo и иллюстрация версии 11.4 теперь используются в публичном интерфейсе проекта.
</section>