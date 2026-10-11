<script lang="ts">
    import { browser } from "$app/environment";
    import SmallDialog from "$components/dialog/SmallDialog.svelte";
</script>

{#if !browser}
    <noscript style="display: contents">
        <div id="nojs-ack">
            <SmallDialog
                id="nojs-dialog"
                meowbalt="error"
                bodyText={
                    "ReliGo uses JavaScript for API requests and interface interactions, but JavaScript is unavailable in your browser. "
                    + "You can still navigate around ReliGo, but most features will not work."
                }
                buttons={[
                    {
                        text: "got it",
                        main: true,
                        action: () => {},
                        link: "#nojs-ack"
                    },
                ]}
            />
            <div id="nojs-dialog-backdrop"></div>
        </div>
    </noscript>
{/if}

<style>
    :global(#nojs-ack) {
        display: contents;
    }

    :global(#nojs-ack:target) {
        display: none;
    }

    #nojs-dialog-backdrop {
        opacity: 1;
    }
</style>
