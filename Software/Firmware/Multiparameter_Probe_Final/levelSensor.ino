float getLevel() {
  float analogReading;
  float AntSum = 0;
  float Antavg = 0;
  float depth;
  //if (millis() - timepoint_measure > PRINT_INTERVAL) {
  //    timepoint_measure = millis();
  int Nmean=10000;
  //for (int l = 0; l < 2999; l++) {
    for (int l = 0; l < Nmean; l++) {

    analogReading=analogRead(ANALOG_PIN);
    dataVoltage = (analogReading) / 4095 * VREF;
   // Serial.println(ANALOG_PIN);
    dataCurrent = dataVoltage / 120.0; //Sense Resistor:120ohm
    //Serial.print("Data Current:"); Serial.println(dataCurrent);
    //Serial.println(dataCurrent);
     //Serial.println("Data current" );
    //Serial.println(dataCurrent);
    depth = (dataCurrent - CURRENT_INIT) * (RANGE / DENSITY_WATER / 16.0); //Calculate depth from current readings
    
    if (depth < 0)
    {
      depth = 0.0;
     // Serial.println("Depth 000");
    }
    AntSum += depth;
    //Serial.println(AntSum);
  }
  Antavg = AntSum / Nmean;
  if (Antavg < 0)
  {
    //Antavg = 0.0;
  }
  //Serial print results
  //Serial.print("depth:");
  //Serial.print(analogRead(ANALOG_PIN));
  // Serial.println(Antavg);
  // }
  //Serial.println("depth");
 //Serial.println(depth );
 //Serial.println("analog reading");
 //Serial.println(analogReading);
  return Antavg/10; //water column in cm
}
