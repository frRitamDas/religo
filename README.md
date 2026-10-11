# ReliGo

ReliGo is a community-maintained media downloader based on the open-source [Cobalt project](https://github.com/imputnet/cobalt). Paste a supported public media link, choose the available options, and save the result.

This repository is a customized fork. The original upstream project and its licenses are credited here; see the [web license](web/LICENSE) and [API license](api/LICENSE) before redistributing or hosting it.

## Project structure

This monorepo includes the frontend, API, and related packages:

- [Frontend](web/) — SvelteKit + Vite static web application.
- [API](api/) — Express-based media processing service.
- [Shared packages](packages/).
- [Documentation](docs/).

## Deployment notes

The frontend can be built as a static site, but media downloads that require server processing need a compatible API instance. Configure the frontend with the `WEB_DEFAULT_API` environment variable pointing to an API instance you own or are authorized to use. The upstream public API is not a default service for unrelated deployments.

The API uses long-running streaming and media-processing behavior. Deploy it on infrastructure compatible with the project's API requirements; a static frontend deployment alone does not deploy the API.

## Attribution and licensing

ReliGo is based on [imputnet/cobalt](https://github.com/imputnet/cobalt). The original project's license terms apply to the relevant code. The upstream frontend license also states that Cobalt branding and assets are not included in the code license; the existing logo is retained temporarily as requested, but should be replaced before public redistribution of a rebranded derivative.

Please review all license files before making the project public or using it commercially.