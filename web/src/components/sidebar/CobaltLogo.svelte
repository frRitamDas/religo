<script>
    import IconCobalt from "$components/icons/Cobalt.svelte";
</script>

<div id="cobalt-logo" aria-label="ReliGo">
    <IconCobalt />
</div>

<style>
    #cobalt-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: calc(var(--sidebar-tab-padding) * 2);

        /* Preserve the original room for the scaling animation. */
        padding-bottom: calc(var(--sidebar-tab-padding) * 2 - var(--sidebar-inner-padding));
    }

    #cobalt-logo :global(svg) {
        width: 28px;
        height: 28px;
        flex: 0 0 auto;
    }

    @media screen and (max-width: 535px) {
        #cobalt-logo {
            display: none;
        }
    }
</style>
