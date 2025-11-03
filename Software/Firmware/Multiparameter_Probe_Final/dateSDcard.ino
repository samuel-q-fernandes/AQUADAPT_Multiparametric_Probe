
String dateSDCard(String date) {

  String dateSDcard;
  String d;
  for (int j = 0; j < date.length(); j++) {

    d = date[j];
    if (d == "T") {
      break;
    }
    if (d == "-") {
      d = "_";
    }

    dateSDcard += d;
  }

  return dateSDcard;
}
