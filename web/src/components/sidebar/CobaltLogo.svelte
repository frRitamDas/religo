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
        padding: 5px 8px 5px 10px;
        border-right: 1px solid var(--glass-border);
    }

    #cobalt-logo :global(svg) {
        width: 25px;
        height: 25px;
        flex: 0 0 auto;
    }

    @media screen and (max-width: 535px) {
        #cobalt-logo {
            display: none;
        }
    }
</style>
