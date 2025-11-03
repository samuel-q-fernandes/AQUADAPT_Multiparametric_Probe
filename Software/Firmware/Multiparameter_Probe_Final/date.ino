
/*
String getDate() {

SerialMon.print("Connecting to APN: ");
  SerialMon.print(apn);
  if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
    SerialMon.println(" fail");
  }
  else {
    SerialMon.println(" OK");
    
    SerialMon.print("Connecting to ");
    SerialMon.print(server);
    if (!client.connect(server, port)) {
      SerialMon.println(" fail");
    }
    else {
      


    String time = modem.getGSMDateTime(DATE_FULL);
    Serial.println();

    Serial.println(time);

    // Extracting date components
    int year = time.substring(0, 2).toInt()+ 2000;
    int month = time.substring(3, 5).toInt();
    int day = time.substring(6, 8).toInt();  // Assuming 2-digit year representation

    // Rearrange date components and adjust year to four digits
    String formattedDate = String(day) + "/" + String(month) + "/" + String(year);

    // Output the formatted date
    Serial.println(formattedDate);


    // Extracting time components
    int hour = time.substring(9, 11).toInt();
    int minute = time.substring(12, 14).toInt();
    int second = time.substring(15, 17).toInt();

    // Format time components
    String formattedTime = String(hour) + ":" + String(minute) + ":" + String(second);

    // Output the formatted time
    Serial.println(formattedTime);


    return formattedDate;

}

}

}
*/