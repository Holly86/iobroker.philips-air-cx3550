# ioBroker Philips Air CX3550 Fork

This ioBroker adapter fork is based on `ioBroker.philips-air` and adds production-clean local CoAP support for the Philips/Versuni CX3550/01 fan.

The adapter talks directly to the device in the local network via CoAP. It does not use a Philips, Versuni or HomeID cloud API.

## Supported devices

- Existing Philips Air devices supported by the upstream `ioBroker.philips-air` adapter
- Philips/Versuni CX3550/01 fan, model family `Trident`

Observed CX3550/01 identifiers:

- `D01S03`: `Ventilator`
- `D01S04`: `Trident`
- `D01S05`: `CX3550/01`
- `D01S12`: firmware version, observed `0.1.7`
- WiFi version observed: `AWS_Philips_AIR_Combo@86`

## CX3550/01 features

Tested local CoAP functions:

- Power on/off
- Fan speed 1, 2 and 3
- Sleep mode
- Natural breeze
- Oscillation on/off
- Beep on/off
- Status reading via local CoAP
- Timer status reading

Timer control is intentionally not supported. The CX3550/01 accepts local timer write payloads, but its firmware then sets `D03102` to `0`, which switches the fan off. The adapter therefore exposes timer information only as read-only status.

## CX3550/01 states

Known CX3550/01 parameters used by this fork:

- `D03102`: power, `1 = on`, `0 = off`
- `D03105`: fan percent, typically `100`
- `D0310C`: fan mode, `1 = speed1`, `2 = speed2`, `3 = speed3`, `17 = sleep`, `-126 = naturalBreeze`
- `D0310D`: reported current fan speed, `0 = off`, `1 = speed1`, `2 = speed2`, `3 = speed3`
- `D0320F`: oscillation, read `23040 = on`, write `90 = on`, `0 = off`
- `D03110`: timer code, read-only
- `D03211`: timer minutes, read-only
- `D03130`: beep, `100 = on`, `0 = off`

## Installation from GitHub

After uploading this folder to GitHub, install the adapter in ioBroker Admin:

1. Open **Adapters**.
2. Choose **Install from custom URL**.
3. Paste the GitHub repository URL of your fork.
4. Install and create or restart the adapter instance.

Recommended CX3550/01 configuration:

- Protocol: `coap`
- Host: fixed IP address or hostname of the fan
- Alive timeout: `60000`
- Reconnect interval: `180000`
- CoAP subscribe timeout: `180000`

## Development

Install dependencies and run the syntax checks:

```sh
npm install
npm test
```

For a quick local check without installing dependencies:

```sh
node --check main.js
node --check lib/coap.js
node --check lib/http.js
node --check lib/httpClient.js
node --check lib/mapping.js
```

## Preparing an upstream pull request

1. Create a branch from the current upstream `master` of `iobroker-community-adapters/ioBroker.philips-air`.
2. Reapply the CX3550/01 commits from this fork.
3. Keep timer control read-only unless a safe firmware-compatible write sequence has been confirmed.
4. Run `npm install` and `npm test`.
5. Test at least one existing Philips Air purifier path and the CX3550/01 CoAP path.
6. Open a pull request with the tested model, firmware, supported functions and timer limitation documented.

## License

MIT, same as the upstream adapter.
