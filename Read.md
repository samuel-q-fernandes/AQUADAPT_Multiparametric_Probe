# Development of a Cost-Effective Multiparametric Probe for Continuous, Real-Time Monitoring of Aquatic Environments

**AQUADAPT | AQUA-V1** is an open-source platform for in-situ water-quality/quantity monitoring (**pH, electrical conductivity (EC), temperature, and water level**). The system targets robust, long-term field deployments with an emphasis on reproducibility, traceability, and low total cost.

The hardware integrates an **ESP32** controller (LILYGO® T-Call with **SIM800L**) for data acquisition and processing, plus **GSM/GPRS** telemetry, **microSD** logging, and **solar power** support (MPPT + Li-ion). Firmware duty-cycles sensing and transmission, then enters **deep sleep** between cycles to minimize average power consumption, enabling multi-day autonomy and continuous operation under normal sunlight.

![Multiparameter probe overview](Documentation/Images/Multiparameter%20Probe.jpeg)

This repository provides the full stack: **KiCad** design files, **Arduino/C++** firmware, a **PHP API** for authenticated data ingest, the **SQL schema** to bootstrap the database, and a **web dashboard** for data visualization. Documentation includes wiring, configuration, deployment notes, and server setup.

To support transparent metrology, the docs also detail the complete measurement workflow and a **GUM-conforming uncertainty budget** (expanded uncertainties reported at *k* = 2), making results auditable across deployments. A link to the peer-reviewed manuscript will be added here upon acceptance.

Software is released under the **MIT License** (see `LICENSE`). 
**A link to the peer-reviewed manuscript will be added here upon acceptance by the journal.**


## Bill of Materials (BOM)

*A summarized BOM based on the components described in the manuscript. 

> **Target cost:** sub-€1,000 (sensor/probe choices and enclosure options drive most of the variation).

| Subsystem | Item / Model | Qty | Notes |
|---|---|---:|---|
| **MCU, comms & logging** | **LILYGO® TTGO T-Call v1.4** (ESP32 + SIM800L) | 1 | ESP32 controller with integrated GSM/GPRS modem; UART to modem, SPI to microSD. |
|  | **microSD module + 16 GB microSD card** | 1 | On-device redundant logging (CSV/JSON). |
| **Analog / digital interfaces** | **EZO™ Isolator / isolated carrier (pH)** | 1 | Electrical isolation to reduce ground/EMI coupling into pH front-end. |
|  | **EZO™ Conductivity (EC) Circuit** | 1 | Digital EC interface (I²C/UART); temperature aware as configured. |
|  | **MT3608 DC–DC boost converter** | 1 | Boost supply (e.g., 5 V → 12–36 V) for the level/pressure sensor. |
| **Sensors** | **Mini Lab-grade pH probe (ENV-20-pH)** | 1 | Glass electrode; used with Nernst temperature compensation. |
|  | **Mini Conductivity probe K = 1.0 (ENV-20-EC-K1.0)** | 1 | EC probe; three-point calibration via cell constant. |
|  | **DS18B20 temperature sensor** | 1 | 12-bit (0.0625 °C); OneWire; **4.7 kΩ** pull-up to Vcc. |
|  | **Industrial submersible pressure/level sensor (0–5 m)** | 1 | Analog output; hydrostatic level; powered via MT3608 boost. |
| **Custom PCB** | **Main carrier PCB (≈100 × 100 mm)** | 1 | Breakouts and headers for pH/EC/level/DS18B20, modem, power rails, and microSD. |
| **Power** | **PV panel (≈6 V / 5 W)** | 1 | Solar charging for autonomous operation. |
|  | **MPPT charge/power manager (≈900 mA charge)** | 1 | Manages PV → Li-ion charging and system power. |
|  | **Li-ion battery (3.7 V, ~4000 mAh)** | 1 | Energy storage; supports multi-day duty cycle. |
| **Cabling & enclosure** | **IP-rated enclosure with cable glands** | 1 | Houses electronics; strain relief and desiccant recommended. |
|  | **Sensor cable harness (~7 m)** | 2 | Extends probes from housing to water column. |
| **Passives** | **4.7 kΩ resistor** | 1 | DS18B20 pull-up. |
|  | **Sense resistor ~120 Ω (level channel)** | 1 | Per level/pressure readout design. |
| **Calibration materials** | **pH buffers (e.g., pH 4, 7, 9, 10; traceable)** | set | Used for multi-point pH calibration at measurement temperature. |
|  | **EC standards (e.g., 1413, 12 880, 80 000 µS/cm)** | set | Used to estimate cell constant and verify linearity. |

### Sourcing and integration notes
- **Region & connectivity:** confirm 2G/GPRS availability; if unavailable, substitute LTE-M/NB-IoT modem with matching firmware and power profile.  
- **Power budget:** size PV and battery for sampling + telemetry duty cycle and local insolation; include winter/cloud margins.  
- **EMI & grounding:** keep high-impedance pH paths short and away from digital lines; consider shielded cables and star-grounding.  
- **Calibration traceability:** document buffer/standard lot numbers, temperatures, and dates; store calibration IDs in firmware/config.

