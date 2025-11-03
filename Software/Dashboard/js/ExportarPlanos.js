
function exportarDadosLua() {
    var dataA =dataFirebase
    //alert(dataA.length)

    console.log(dataCapatacoes)

    if (dataA.length==undefined){

        alert('Os dados estão a ser descarregados \n por favor aguarde que o icon fique verde')
    }else{
        // var result = dataA.filter((x)=>x.ARH === "Alentejo");
       // JSONToCSVConvertor(dataA, "Captações Licencidas LUA", true);

        var myFile = "Captações Licencidas LUA.xlsx";
        var myWorkSheet = XLSX.utils.json_to_sheet(dataA);

        var myWorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "Captações Licencidas LUA");
        XLSX.writeFile(myWorkBook, myFile);

    }

}

function exportarDadosLuaGeoJson() {
    var dataB = dataCapatacoesGeoJson
    console.log(dataCapatacoesGeoJson)

    if (dataB.length==undefined){

        alert('Os dados estão a ser descarregados \n por favor aguarde que o icon fique verde')
    }else{

            // Create an empty GeoJSON collection
            var collection = {
                "type": "FeatureCollection",
                "features": []
            };

            // Iterate the layers of the map
            dataB.eachLayer(function (layer) {
                // Check if layer is a marker
                if (layer instanceof L.Marker) {
                    // Create GeoJSON object from marker
                    var geojson = layer.toGeoJSON();
                    // Push GeoJSON object to collection
                    collection.features.push(geojson);
                }
            });
            // Log GeoJSON collection to console
            console.log(collection);
    }
}







function exportarManual() {
    var dataA =dataAutocontroloLimits

   
    window.open('https://amostragem.apambiente.pt/autocontrolo/siliamb/Manual do Utilizador Dashboard Autocontrolo SILiamb.pptx', '_self');
    

}
