# ReliGo API

The ReliGo API is the Express-based media-processing service used by the ReliGo frontend.

**Version:** 1.1  
**Developer:** Ritam Das

## Running an instance
Follow the [instance deployment guide](../docs/run-an-instance.md). The API is a long-running service and must be deployed separately from the static frontend.

## API documentation
See the [API documentation](../docs/api.md) and [API environment-variable reference](../docs/api-env-variables.md).

## Supported services
ReliGo supports multiple public media services, including YouTube. Availability depends on upstream provider behavior and the API instance configuration; YouTube may temporarily fail when its anti-bot protections change.

## License and attribution
The API code remains licensed under [AGPL-3.0](LICENSE). ReliGo is based on the open-source Cobalt project. Preserve the applicable original copyright and license notices and review all license files before redistribution.
