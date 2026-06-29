# Changelog

## 1.6.0-cx3550.2

- Mark the device connection as connected immediately after a successful CoAP sync response.
- This fixes ioBroker showing `Verbunden mit Geraet oder Dienst` as false while the CX3550/01 is reachable and has returned a valid session key.

## 1.6.0-cx3550.1

- Avoid repeated CoAP subscribe timeout errors on CX3550/01 when sync succeeds but the observe stream stays quiet.
- Keep the observe request open so later status packets can still update ioBroker states.
- Real sync and network failures are still reported as connection errors.

## 1.6.0-cx3550.0

- Added production-clean local CoAP support for Philips/Versuni CX3550/01.
- Added CX3550/01 controls for power, fan modes, sleep mode, natural breeze, oscillation and beep.
- Added read-only CX3550/01 timer status states.
- Removed experimental timer control paths because local timer writes can switch the CX3550/01 off.
- Removed raw CX3550 test controls and verbose reverse-engineering diagnostics from productive code.
- Kept existing Philips Air mapping and control paths unchanged.

## 1.5.0

- Upstream `ioBroker.philips-air` baseline with CoAP stability fixes and adapter checker cleanup.
