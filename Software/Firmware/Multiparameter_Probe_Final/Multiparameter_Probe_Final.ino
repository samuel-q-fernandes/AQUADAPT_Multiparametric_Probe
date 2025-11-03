#include <OneWire.h>
#include <Wire.h>
#include <DallasTemperature.h>
//#include <WiFi.h>
//#include <WiFiMulti.h>
//#include <HTTPClient.h>
#include <FirebaseESP32.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#include <driver/adc.h>
#include <esp_adc_cal.h>

#define ADC_PIN ADC1_CHANNEL_7  // Use GPIO36 (ADC1_CHANNEL_0) or another ADC pin

esp_adc_cal_characteristics_t *adc_chars;  // Declare adc_chars globally

// Your GPRS credentials (leave empty, if not needed)
const char apn[] = "";  // APN (example: internet.vodafone.pt) use https://wiki.apnchanger.org
const char gprsUser[] = "";             // GPRS User
const char gprsPass[] = "";             // GPRS Password

// SIM card PIN (leave empty, if not defined)
const char simPIN[] = "";
//const char simPIN[]   = "";

// Server details
// The server variable can be just a domain name or it can have a subdomain. It depends on the service you are using
const char server[] = "";                // domain name: example.com, maker.ifttt.com, etc
const char resource[] = "";  // resource path, for example: /post-data.php
const int port = 80;                                    // server port number



// Keep this API Key value to be compatible with the PHP code provided in the project page.
// If you change the apiKeyValue value, the PHP file /post-data.php also needs to have the same key
String apiKeyValue = "";

String idName = "AQUA_V1";

// TTGO T-Call pins
#define MODEM_RST 5
#define MODEM_PWKEY 4
#define MODEM_POWER_ON 23
#define MODEM_TX 27
#define MODEM_RX 26
#define I2C_SDA 21
#define I2C_SCL 22
// BME280 pins
#define I2C_SDA_2 18
#define I2C_SCL_2 19

// Set serial for debug console (to Serial Monitor, default speed 115200)
#define SerialMon Serial
// Set serial for AT commands (to SIM800 module)
#define SerialAT Serial1

// Configure TinyGSM library
#define TINY_GSM_MODEM_SIM800    // Modem is SIM800
#define TINY_GSM_RX_BUFFER 1024  // Set RX buffer to 1Kb

// Define the serial console for debug prints, if needed
//#define DUMP_AT_COMMANDS

#include <TinyGsmClient.h>

#ifdef DUMP_AT_COMMANDS
#include <StreamDebugger.h>
StreamDebugger debugger(SerialAT, SerialMon);
TinyGsm modem(debugger);
#else
TinyGsm modem(SerialAT);
#endif



// I2C for SIM800 (to keep it running when powered from battery)
TwoWire I2CPower = TwoWire(0);



// TinyGSM Client for Internet connection
TinyGsmClient client(modem);

#define uS_TO_S_FACTOR 1000000UL /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP 3600       /* Time ESP32 will go to sleep (in seconds) 3600 seconds = 1 hour */

#define IP5306_ADDR 0x75
#define IP5306_REG_SYS_CTL0 0x00

bool setPowerBoostKeepOn(int en) {
  I2CPower.beginTransmission(IP5306_ADDR);
  I2CPower.write(IP5306_REG_SYS_CTL0);
  if (en) {
    I2CPower.write(0x37);  // Set bit1: 1 enable 0 disable boost keep on
  } else {
    I2CPower.write(0x35);  // 0x37 is default reg value
  }
  return I2CPower.endTransmission() == 0;
}

#include "FS.h"
#include "SD.h"
#include "SPI.h"
//#include <WiFiClientSecure.h>

//Parametros cartao SD
#define SCK 18
#define MISO 19
#define MOSI 23
#define CS 5

SPIClass spi = SPIClass(VSPI);

// Variaveis sensor de pH
// #define USE_PULSE_OUT

#ifdef USE_PULSE_OUT
#include "ph_iso_grav.h"
Gravity_pH_Isolated pH = Gravity_pH_Isolated(33);
#else
#include "ph_grav.h"
Gravity_pH pH = Gravity_pH(33);
#endif

uint8_t user_bytes_received = 0;
const uint8_t bufferlen = 32;
char user_data[bufferlen];

//Variaveis sensor condutividade

#define address 100  //default I2C ID number for EZO EC Circuit.

char computerdata[32];            //we make a 32 byte character array to hold incoming data from a pc/mac/other.
byte received_from_computer = 0;  //we need to know how many characters have been received.
byte serial_event = 0;            //a flag to signal when data has been received from the pc/mac/other.
byte code = 0;                    //used to hold the I2C response code.
char ec_data[32];                 //we make a 32 byte character array to hold incoming data from the EC circuit.
byte in_char = 0;                 //used as a 1 byte buffer to store inbound bytes from the EC Circuit.
byte i = 0;                       //counter used for ec_data array.
int time_ = 570;                  //used to change the delay needed depending on the command sent to the EZO Class EC Circuit.

char *ec;   //char pointer used in string parsing.
char *tds;  //char pointer used in string parsing.
char *sal;  //char pointer used in string parsing.
char *sg;   //char pointer used in string parsing.

float ec_float;   //float var used to hold the float value of the conductivity.
float tds_float;  //float var used to hold the float value of the TDS.
float sal_float;  //float var used to hold the float value of the salinity.
float sg_float;   //float var used to hold the float value of the specific gravity.




////Definições relacionadas com a bateria

// Set serial for debug console (to Serial Monitor, default speed 115200)
#define SerialMon Serial
// Set serial for AT commands (to SIM800 module)
#define SerialAT Serial1

/*#define IP5306_ADDR 0x75
#define IP5306_REG_SYS_CTL0 0x00
#define IP5306_REG_SYS_CTL1 0x01*/

#define TINY_GSM_MODEM_SIM800

// I2C for SIM800 (to keep it running when powered from battery)
//TwoWire I2CPower = TwoWire(0);

//Temperature sensor properties
// GPIO where the DS18B20 is connected to
const int oneWireBus = 4;
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);

// Pass our oneWire reference to Dallas Temperature sensor
DallasTemperature sensors(&oneWire);

//Water level sensor properties

#define ANALOG_PIN 32
#define RANGE 5000         // Depth measuring range 5000mm (for water)
#define VREF 3300          // 1100 mV for ESP32 5000 // ADC's reference voltage on your Arduino,typical value:5000mV
#define CURRENT_INIT 2.80  // Current @ 0mm (uint: mA) was 4.00
#define DENSITY_WATER 1    // Pure water density normalized to 1
#define PRINT_INTERVAL 1000



int16_t dataVoltage;
float dataCurrent;  //unit:mA
unsigned long timepoint_measure;



// WiFi connect timeout per AP. Increase when connecting takes longer.
const uint32_t connectTimeoutMs = 10000;

float pHreading;
char *fileName;


bool signupOK = false;
unsigned long sendDataPrevMillis = 0;


#define IP5306_ADDR 0x75
#define IP5306_REG_SYS_CTL0 0x00
#define I2C_SDA 21
#define I2C_SCL 22

#define uS_TO_S_FACTOR 1000000 /* Conversion factor for micro seconds to seconds */
#define TIME_TO_SLEEP 36000    //120//300      /* Time ESP32 will go to sleep (in seconds) */
int timeSleepSeconds;



void setup() {
  adc1_config_width(ADC_WIDTH_BIT_12);                  // Set ADC width to 12 bits
  adc1_config_channel_atten(ADC_PIN, ADC_ATTEN_DB_11);  // Set attenuation for the channel

  adc_chars = (esp_adc_cal_characteristics_t *)calloc(1, sizeof(esp_adc_cal_characteristics_t));  // Allocate memory for adc_chars
  esp_adc_cal_value_t val_type = esp_adc_cal_characterize(ADC_UNIT_1, ADC_ATTEN_DB_11, ADC_WIDTH_BIT_12, 1100, adc_chars);


  Wire.begin();
  analogReadResolution(12);
  analogSetWidth(12);

  Serial.begin(115200);
  spi.begin(SCK, MISO, MOSI, CS);

  // analogSetAttenuation(ADC_2_5db);
  //   analogSetSamples(1);

  // Restart SIM800 module, it takes quite some time
  // To skip it, call init() instead of restart()
 // SerialMon.println("Initializing modem...");
 // modem.restart();
  // use modem.init() if you don't need the complete restart



  // Configure the wake up source as timer wake up
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);

  sensors.begin();
  //ADC pin water level sensor
  pinMode(ANALOG_PIN, INPUT);

  //Calibração do pH
  delay(200);
  Serial.println(F("Use commands \"CAL,7\", \"CAL,4\", and \"CAL,10\" to calibrate the circuit to those respective values"));
  Serial.println(F("Use command \"CAL,CLEAR\" to clear the calibration"));
  if (pH.begin()) {
    Serial.println("Loaded EEPROM");
  }

  //variaveis cartao SD



  if (!SD.begin(CS, spi, 80000000)) {
    Serial.println("Card Mount Failed");
    return;
  }
  uint8_t cardType = SD.cardType();

  if (cardType == CARD_NONE) {
    Serial.println("No SD card attached");
    return;
  }

  Serial.print("SD Card Type: ");
  if (cardType == CARD_MMC) {
    Serial.println("MMC");
  } else if (cardType == CARD_SD) {
    Serial.println("SDSC");
  } else if (cardType == CARD_SDHC) {
    Serial.println("SDHC");
  } else {
    Serial.println("UNKNOWN");
  }

  uint64_t cardSize = SD.cardSize() / (1024 * 1024);
  Serial.printf("SD Card Size: %lluMB\n", cardSize);

  spi.end();


  // Set serial monitor debugging window baud rate to 115200
  SerialMon.begin(115200);

  // Start I2C communication
  I2CPower.begin(I2C_SDA, I2C_SCL, 400000);

  // Configure the wake up source as timer wake up
  esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP * uS_TO_S_FACTOR);
}

void loop() {

  uint32_t adc_reading = 0;
  const uint8_t num_samples = 64;

  // Take multiple samples to reduce noise
  for (int i = 0; i < num_samples; i++) {
    adc_reading += adc1_get_raw(ADC_PIN);
  }
  adc_reading /= num_samples;

  // Convert ADC reading to voltage in mV
  uint32_t voltage = esp_adc_cal_raw_to_voltage(adc_reading, adc_chars);

  // Calculate the estimated USB voltage (in mV)
  float estimated_usb_voltage = voltage * 2.0;

  //Serial.println(v);

  String parameters[] = { "p", "c", "l", "t" };
  String units[] = { "Sorensen scale", "uS/cm", "wc", "°C" };
  String obs[] = { String(estimated_usb_voltage), "test", "test", "test" };

  float values[4];

  digitalWrite(MODEM_POWER_ON, LOW);
  delay(10);

  if (Serial.available() > 0) {
    user_bytes_received = Serial.readBytesUntil(13, user_data, sizeof(user_data));
  }

  if (user_bytes_received) {
    parse_cmd(user_data);
    user_bytes_received = 0;
    memset(user_data, 0, sizeof(user_data));
  }

  float temperatureC = getTemperature();


  pHreading = pH.read_ph();

  float  pHreadingV=pH.read_voltage();

  Serial.print("pH reading Voltage: ");
    Serial.print(pHreadingV);

  pHreading=nernestpHCompensationmV( temperatureC,  pHreadingV);


  values[0] = (pHreading);
  Serial.println("pHreading");
  Serial.println(pHreading);
    Serial.println("temperature");
  Serial.println(temperatureC);
  float condutct = getConductivity();
  values[1] = (condutct);
  float waterLevel = getLevel();
  values[2] = (waterLevel);
  values[3] = (temperatureC);


  
 // values[4] = (estimated_usb_voltage / 1000);

  // Set modem reset, enable, power pins
  pinMode(MODEM_PWKEY, OUTPUT);
  pinMode(MODEM_RST, OUTPUT);
  pinMode(MODEM_POWER_ON, OUTPUT);
  digitalWrite(MODEM_PWKEY, LOW);
  digitalWrite(MODEM_RST, HIGH);
  digitalWrite(MODEM_POWER_ON, HIGH);

  // Set GSM module baud rate and UART pins
  SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);
  delay(3000);

  // Restart SIM800 module, it takes quite some time
  // To skip it, call init() instead of restart()
  SerialMon.println("Initializing modem...");
  modem.restart();

  // use modem.init() if you don't need the complete restart

  // Unlock your SIM card with a PIN if needed
  if (strlen(simPIN) && modem.getSimStatus() != 3) {
    modem.simUnlock(simPIN);
  }
  
  // Initialize the parameters
  Serial.println("Available parameters:");
  for (int i = 0; i < sizeof(units) / sizeof(units[0]); i++) {
    Serial.println(units[i]);
  }




postServer(apiKeyValue, parameters, values, units, obs);




delay(10000);

timeSleepSeconds = uS_TO_S_FACTOR * TIME_TO_SLEEP;

digitalWrite(MODEM_POWER_ON, LOW);
spi.end();
//esp_sleep_enable_timer_wakeup(3600000000);  //timer de uma hora


esp_sleep_enable_timer_wakeup(600000000);  //timer de 10 minutos
esp_deep_sleep_start();
}


float nernestpHCompensationmV(float temperature, float phmV) {
  float K = temperature + 273.15;
  double E = -0.0004 * phmV + 1.2660;//1.2560;
  Serial.println(E ); 

  const float E0 = + 0.22234;  // Standard electrode potential (V) at 25°C
  const float R = 8.314;     // Gas constant (J/(mol·K))

  const float n = 1;        // Number of electrons transferred
  const float F = 96485;    // Faraday's constant (C/mol)
  const float H_ref = 1.0;  // Reference concentration of hydrogen ions (mol/L)
  //
  //Serial.println("firstNernest");
  double firstNernest = (R * K) / (n * F);
  //Serial.println(firstNernest);
  double secondNernest = E - E0;
  // Serial.println(secondNernest);
  double thirdNernest = secondNernest / firstNernest;
  // Serial.println("thirdNernest");
  // Serial.println(thirdNernest);

  double e = exp(thirdNernest);

  // Calculate log base 10 using the natural logarithm result
  double result = log10(e);



  return result;
}


