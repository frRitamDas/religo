# ReliGo web

The ReliGo frontend is a static web app built with [SvelteKit](https://kit.svelte.dev/) and [Vite](https://vitejs.dev/).

**Website version:** 11.4  
**API version:** 11.3  
**Developer:** Ritam Das

## Configuring
- Run the development environment with `pnpm run dev`.
- Build the frontend with `pnpm run build`.

## Environment variables
`WEB_DEFAULT_API` is required and should point to an API instance you own or are authorized to use.

| Name | Example | Description |
|---|---|---|
| `WEB_HOST` | `your-religo-domain.example` | Frontend hostname used for metadata and optional analytics. |
| `WEB_PLAUSIBLE_HOST` | `plausible.io` | Optional Plausible analytics receiver. |
| `WEB_DEFAULT_API` | `https://your-authorized-api.example/` | API URL used by frontend clients. |
| `ENABLE_DEPRECATED_YOUTUBE_HLS` | `true` | Enables the legacy YouTube HLS preference. |

## Link prefill
To prefill the link box, pass a media URL after `#`, for example:
```
https://your-religo-domain.example/#https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## License and attribution
The frontend is licensed under [CC-BY-NC-SA-4.0](LICENSE). ReliGo is derived from the open-source Cobalt project; retain required upstream attribution, original copyright notices, and licence obligations. ReliGo's user-facing logo and 11.3 release artwork use the ReliGo identity.

## Open-source acknowledgments
ReliGo uses SvelteKit, Vite, libav.js, Tabler Icons, Fluent Emoji, Noto Sans Mono, IBM Plex Mono, Redaction, and other open-source packages. Review individual licenses before redistribution or commercial use.
