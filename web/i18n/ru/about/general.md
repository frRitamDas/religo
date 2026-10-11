<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
    import ReliGoReleasePanel from "$components/about/ReliGoReleasePanel.svelte";
</script>

<ReliGoReleasePanel locale="ru" />

<section id="summary">
<SectionHeading
    title={$t("about.heading.summary")}
    sectionId="summary"
/>

ReliGo — простой инструмент для сохранения медиа по поддерживаемым публичным ссылкам. Вставь ссылку, выбери доступный вариант и сохрани видео, аудио, фото или GIF.

Интерфейс адаптируется к телефонам, планшетам и компьютерам, чтобы основной процесс загрузки оставался понятным и удобным.
</section>

<section id="motivation">
<SectionHeading
    title={$t("about.heading.motivation")}
    sectionId="motivation"
/>

ReliGo разрабатывает и поддерживает **Ritam Das**. Цель проекта — чистый, доступный и удобный интерфейс для сохранения медиа с поддерживаемых сервисов, а также понятная информация о проекте и исходном коде.

Список поддерживаемых сервисов и доступных форматов может меняться вслед за обновлениями внешних платформ.
</section>

<section id="privacy-efficiency">
<SectionHeading
    title={$t("about.heading.privacy_efficiency")}
    sectionId="privacy-efficiency"
/>

Если браузер поддерживает нужные функции, обработка может выполняться прямо на устройстве. Когда требуется серверная обработка, запрос отправляется к API-инстансу ReliGo, настроенному для этого сайта.

При серверной обработке ссылки на медиа и зашифрованные данные туннеля могут временно обрабатываться сервером. Перед использованием прочитай [информацию о приватности](/about/privacy) и не отправляй личные или конфиденциальные ссылки.
</section>

<section id="community">
<SectionHeading
    title={$t("about.heading.community")}
    sectionId="community"
/>

Изучай проект, сообщай об ошибках и следи за изменениями кода в [репозитории ReliGo на GitHub](https://github.com/frRitamDas/religo).

**Версия сайта:** 11.3

**Версия API:** 11.3

**Разработчик:** Ritam Das

ReliGo использует компоненты с открытым исходным кодом. Применимые лицензии и уведомления об авторских правах сохранены в репозитории.
</section>
