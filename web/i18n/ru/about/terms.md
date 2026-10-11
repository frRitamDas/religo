<script lang="ts">
    import { t } from "$lib/i18n/translations";
    import SectionHeading from "$components/misc/SectionHeading.svelte";
</script>

<section id="general">
<SectionHeading
    title={$t("about.heading.general")}
    sectionId="general"
/>

Эти условия применяются при использовании API-инстанса ReliGo, настроенного для этого сайта. Для другого API-инстанса уточни условия и правила обработки данных у его оператора.
</section>

<section id="saving">
<SectionHeading
    title={$t("about.heading.saving")}
    sectionId="saving"
/>

ReliGo помогает сохранять медиа по поддерживаемым публичным ссылкам. Ты отвечаешь за то, чтобы использование сохранённого контента соответствовало закону, условиям исходной платформы и применимым лицензиям.

Некоторые запросы обрабатываются локально в браузере. Другие требуют, чтобы API получил, проксировал, ремуксировал или транскодировал медиа. API может временно обрабатывать исходные URL, параметры обработки и зашифрованные данные туннеля. Хостинг-провайдеры и внешние сервисы могут обрабатывать базовые технические данные запросов. Подробнее — в [политике конфиденциальности](/about/privacy). Не отправляй личные ссылки, пароли, токены доступа или другую конфиденциальную информацию.
</section>

<section id="responsibility">
<SectionHeading
    title={$t("about.heading.responsibility")}
    sectionId="responsibility"
/>

Ты отвечаешь за то, как используешь и распространяешь сохранённый контент. Уважай права авторов, правила платформ и лицензии; указывай авторство и получай разрешение там, где это требуется.
</section>

<section id="abuse">
<SectionHeading
    title={$t("about.heading.abuse")}
    sectionId="abuse"
/>

Сообщить о технической проблеме можно через [трекер ошибок ReliGo на GitHub](https://github.com/frRitamDas/religo/issues). Не публикуй в открытых сообщениях личные URL, токены доступа или персональные данные. Ответы предоставляются по возможности и не гарантируются.
</section>
