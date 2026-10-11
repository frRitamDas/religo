# ReliGo

ReliGo is a community-maintained media downloader based on the open-source [Cobalt project](https://github.com/imputnet/cobalt). Paste a supported public media link, choose the available options, and save the result.

**Version:** 1.1  
**Developer:** Ritam Das  
**Source code:** https://github.com/frRitamDas/religo

This repository is a customized fork. The original upstream project and its licenses are credited here; see the [web license](web/LICENSE) and [API license](api/LICENSE) before redistributing or hosting it.

## Project structure

This monorepo includes the frontend, API, and related packages:

- [Frontend](web/) — SvelteKit + Vite static web application.
- [API](api/) — Express-based media processing service.
- [Shared packages](packages/).
- [Documentation](docs/).

## Deployment notes

The frontend is hosted as a static site and requires a compatible API instance for server-side processing. Configure `WEB_DEFAULT_API` to an API instance you own or are authorized to use. The ReliGo API is deployed at https://religo-api.onrender.com.

## Attribution and licensing

ReliGo is based on [imputnet/cobalt](https://github.com/imputnet/cobalt). The original project's license terms apply to the relevant code. The upstream frontend license states that Cobalt branding and assets are not included in the code license; the existing logo is retained temporarily as requested and is planned to be replaced in a future patch.

Please review all license files before making the project public or using it commercially.
