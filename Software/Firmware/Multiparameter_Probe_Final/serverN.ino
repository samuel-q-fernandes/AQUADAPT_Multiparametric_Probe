
void postServer(String apiKeyValue, String parametro[], float valor[], String unidade[], String obs[]) {

  String formattedTime;
  String formattedDate;


  SerialMon.print("Connecting to APN: ");
  SerialMon.print(apn);
  if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
    SerialMon.println(" fail");
  } else {


     SerialMon.println(" OK");

    SerialMon.print("Connecting to ");
    SerialMon.print(server);

    if (!client.connect(server, port)) {
      SerialMon.println(" fail");
    } else {



      Serial.println("modem.getGsmLocation()");
      Serial.println(modem.getGsmLocation());
      String time = modem.getGSMDateTime(DATE_FULL);
      Serial.println();
      Serial.println(time);
      // Extracting date components
      int year = time.substring(0, 2).toInt() + 2000;
      String month = time.substring(3, 5);
      String day = time.substring(6, 8);  // Assuming 2-digit year representation
      // Rearrange date components and adjust year to four digits
      
      // Output the formatted date
      Serial.println(formattedDate);
      // Extracting hour component from the time
      String hour = time.substring(9, 11);
      // Extracting minute and second components
      String minute = time.substring(12, 14);
      String second = time.substring(15, 17);
      // Format time components
      formattedTime = String(hour) + ":" + String(minute) + ":" + String(second);


      formattedDate = String(year) + "-" + String(month) + "-" + String(day)+ " " + String(hour) + ":" + String(minute) + ":" + String(second);


      // Output the formatted time
      Serial.println("formattedTime");
      Serial.println(formattedTime);
      //date hour
    }

 }



    int arraySize = sizeof(valor);

     // Calculate the number of elements in the array
  int parametersLength = sizeof(valor);

    Serial.println("arraySize");
    Serial.println(parametersLength);


    for (int i = 0; i < parametersLength; i++) {


      SerialMon.print("Connecting to APN: ");
      SerialMon.print(apn);
      if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
        SerialMon.println(" fail");
      } else {


        // Calcula o tamanho do array


        SerialMon.println(" OK");

        SerialMon.print("Connecting to ");
        SerialMon.print(server);

        if (!client.connect(server, port)) {
          SerialMon.println(" fail");
        } else {


          SerialMon.println(" OK");

          // Making an HTTP POST request
          SerialMon.println("Performing HTTP POST request...");

          Serial.println("formattedTime");
          Serial.println(formattedTime);
          Serial.println(parametro[i]);
          Serial.println(String(valor[i]));
          Serial.println(unidade[i]);


          /*String ph= "&p=" + parametro[0] + "&valuep=" + String(valor[0]) + "&unitp=" + unidade[0] 
          String temperature= "&t=" + parametro[1] + "&valuet=" + String(valor[1]) + "&unitt=" + unidade[1]
          String level= "&l=" + parametro[2] + "&valuel=" + String(valor[2]) + "&unitl=" + unidade[2]
          String conductivity= "&c=" + parametro[3] + "&valuec=" + String(valor[3]) + "&unitc=" + unidade[3]
          
          
          String httpRequestData = "api_key=" + apiKeyValue + "&idName=" + idName + "&date=" + formattedDate + "&hour=" + formattedTime + ph + temperature + level + conductivity + "&obs=" + obs[i] + "";
*/

          String httpRequestData = "api_key=" + apiKeyValue + "&idName=" + idName + "&date=" + formattedDate + "&hour=" + formattedTime + "&parameter=" + parametro[i] + "&value=" + String(valor[i]) + +"&unit=" + unidade[i] + +"&obs=" + obs[i] + "";
           


          Serial.print("httpRequestData: ");
          Serial.println(httpRequestData);


          client.print(String("POST ") + resource + " HTTP/1.1\r\n");
          client.print(String("Host: ") + server + "\r\n");
          client.println("Connection: close");
          client.println("Content-Type: application/x-www-form-urlencoded");
          client.print("Content-Length: ");
          client.println(httpRequestData.length());
          client.println();
          client.println(httpRequestData);

          unsigned long timeout = millis();
          while (client.connected() && millis() - timeout < 10000L) {
            // Print available data (HTTP response from server)
            while (client.available()) {
              char c = client.read();
              SerialMon.print(c);
              timeout = millis();
            }
          }
          SerialMon.println();

          // Close client and disconnect
          client.stop();
          SerialMon.println(F("Server disconnected"));
          modem.gprsDisconnect();
          SerialMon.println(F("GPRS disconnected"));

          // delay(15000);
        }
      }
    }







  // Set MODEM_POWER_ON pin as MOSI for SPI communication
  pinMode(MOSI, OUTPUT);
  pinMode(SCK, OUTPUT);
  pinMode(MISO, OUTPUT);
  pinMode(MISO, CS);

  digitalWrite(MOSI, LOW);
  digitalWrite(MISO, LOW);
  digitalWrite(SCK, LOW);
  digitalWrite(SCK, CS);



 spi.begin(SCK, MISO, MOSI, CS);
        Serial.println("formattedTime");
          Serial.println(formattedTime);


  String strParams = String(formattedDate) + ";" + String(formattedTime) + ";" + String(valor[3]) + ";" + String(valor[2]) + ";" + String(valor[0]) + ";" + String(valor[1]) + "\n";

  // Length (with one extra character for the null terminator)
  int strParamsLen = strParams.length() + 1;
  // Prepare the character array (the buffer)
  char strParamsArray[strParamsLen];
  // Copy it over
  strParams.toCharArray(strParamsArray, strParamsLen);
  // writeFile(SD, "/data.csv", strParamsArray);
  fileName = "/data.csv";


  if (SD.exists(fileName)) {  // If the file test.txt exist.
    appendFile(SD, fileName, strParamsArray);
  } else {  // And if not

    writeFile(SD, fileName, ("Date; Hour; Temperature ( \xB0" "C); Level (mm); pH; Conductivity (uS/cm) \n"));
    appendFile(SD, fileName, strParamsArray);
  }


    spi.end();


  }







