
function showCoordinates (e) {

    xl=String(e.latlng);

    swal(xl);
}


function verTodas (e) {

    filtroLegenda('VerTudo');
}


function filterMA500kMenu(e) {
    console.log(SubBacias)
    //console.log(SubBacias['_layers'][68]['feature'])
    console.log(Object.keys(SubBacias['_layers']).length)
    var nomeMAe=filterMA500k(e.latlng, SubBacias)
}

function filterMA500kMenuPoints(e) {
   // loading= L.control.loader().addTo(map)
    filterPointsMA500k(e.latlng, SubBacias, markersGlobal)
}

function filterMA500kMenuPointsNumeroEstacoes(e) {
    filterPointsMA500kNumeroEstacoes(e.latlng,  SubBacias, markersGlobal)
}


//Filtro botao lado direito devolve o nome da massa de agua 500k na janela de alerta
function filterMA500k(coordenadas, polyMA500k) {
    // alert('oi')
    polyMA500k=MA500k
    console.log(polyMA500k)

    // pointGroupLayer.clearLayers();
    MA500kFilter=1
    primeiroDia = 0
    estadoInicial = 0;
    dateSelected = 0;
    dateSelectedFinal = 0;
    console.log(coordenadas)
    console.log(coordenadas.lat)
    var nameMA;
    console.log(SubBacias)
    if (coordenadas.lat > 0) {
        for (var fe = 67; fe <359; fe++) {

            checkUndefined=SubBacias['_layers'][fe];
            //console.log(fe)

            if (checkUndefined!==undefined) {
            SubBacias['_layers'][fe]['feature']['properties']= {'name':SubBacias['_layers'][fe]['feature']['properties'][ 'name' ]}
            console.log(SubBacias['_layers'][fe]['feature']['properties'][ 'name' ])
            if ('geometries' in SubBacias['_layers'][fe]['feature']['geometry']){

                firstArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][0]['coordinates']
                secondArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][1]['coordinates']

            SubBacias['_layers'][fe]['feature']['geometry']={'coordinates': [firstArrayCoordenadas, secondArrayCoordenadas]}

            }

            poly1 =SubBacias['_layers'][fe]['feature']
            var pt1 = turf.point([coordenadas.lng, coordenadas.lat]);
            var points = turf.featureCollection([pt1]);
            var tagged = turf.tag(points, poly1, 'name', 'name');
            if (tagged['features'][0]['properties']['name'] !==undefined) {
                nameMA = tagged['features'][0]['properties']['name'];
                swal('Massa de Água '.concat(nameMA));
                return nameMA
            }
//            addPoints()

        }
    }
    }
}


//Filtro das Captacoes por MA Subter
function filterPointsMA500k(coordenadas, polyMA500k, estacoes) {
   
    var pt1;
    var points;
    var tagged;
    
    var pt2=undefined;
    var pointsT;
    var taggedT=undefined;

    var estacoesOld=estacoes2020;
     // alert(estacoes)
    var dataFilterMA500k=[];
    var data2=[]
    console.log(polyMA500k)
    // pointGroupLayer.clearLayers();
    MA500kFilter=1
    primeiroDia = 0
    estadoInicial = 0;
    dateSelected = 0;
    dateSelectedFinal = 0;
  //  console.log(coordenadas)
   // console.log(coordenadas.lat)
    var nameMA;
    var MA500k;
    var max;
    var min;

    if (coordenadas.lat > 0) {        
    

        for (var fe = 68; fe <359; fe++) {

            checkUndefined=SubBacias['_layers'][fe];
            if (checkUndefined!==undefined) {
            SubBacias['_layers'][fe]['feature']['properties']= {'name':SubBacias['_layers'][fe]['feature']['properties'][ 'name' ]}

            if ('geometries' in SubBacias['_layers'][fe]['feature']['geometry']){

                firstArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][0]['coordinates']
                secondArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][1]['coordinates']

            SubBacias['_layers'][fe]['feature']['geometry']={'coordinates': [firstArrayCoordenadas, secondArrayCoordenadas]}

            }

            poly1 =SubBacias['_layers'][fe]['feature']
            var pt1 = turf.point([coordenadas.lng, coordenadas.lat]);
            var points = turf.featureCollection([pt1]);
            var tagged = turf.tag(points, poly1, 'name', 'name');
            if (tagged['features'][0]['properties']['name'] !==undefined) {

                if (Object.keys(poly1['geometry']['coordinates']).length  ==1 ){
                    var values = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[1]; });
                    var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                     max = Math.max.apply(null, values);
                     min = Math.min.apply(null, values);
                     maxX = Math.max.apply(null, valuesX);
                     minX = Math.min.apply(null, valuesX);
                    console.log(maxX)
                   // console.log(min)
        
                    }else{
                        var values = poly1['geometry']['coordinates'][0][0].map(function(elt) { return elt[1]; });
                        var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                        var max1 = Math.max.apply(null, values);
                        var min1 = Math.min.apply(null, values);

                        var maxX1 = Math.max.apply(null, values);
                        var minX1 = Math.min.apply(null, values);
        
        
                        var values = poly1['geometry']['coordinates'][1][0].map(function(elt) { return elt[1]; });
                        var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                        var max2 = Math.max.apply(null, values);
                        var min2 = Math.min.apply(null, values);
                        var maxX2 = Math.max.apply(null, values);
                        var minX2 = Math.min.apply(null, values);
                       // console.log(max2)
                       // console.log(min2)
        
                        if (max1>max2){
        
                            max=max1
                        }else{
                            max=max2
                        }
        
                        if (min1<max2){
        
                            min=min1
                        }else{
                            min=min2
                        }
        
        
                        if (maxX1>maxX2){
        
                            maxX=maxX1
                        }else{
                            maxX=maxX2
                        }
        
                        if (minX1<maxX2){
        
                            minX=minX1
                        }else{
                            minX=minX2
                        }




                    }
        
        
                    console.log(maxX)
                    console.log(minX)
        
        
                    result = Object.values(markersGlobal).filter(item => item.y <= max && item.y >= min  )
                    console.log(result)
                    console.log(markersGlobal)
                    
        
                    estacoes=result;





                polyToFilter=poly1;
                break
                //nameMA = tagged['features'][0]['properties']['name'];
                //swal('Massa de Água '.concat(nameMA));
                //return nameMA
            }
//            addPoints()

        }
    }
  //  alert('First')

        let lenEst = estacoes.length;
        //ctEst=0
        for ( est=0; est<lenEst; est++){
          //  console.log(est)
                pt2 = turf.point([estacoes[est].x,estacoes[est].y]);
                taggedT = turf.tag(turf.featureCollection([pt2]),  polyToFilter, 'name', 'name');
                if (taggedT['features'][0]['properties']['name'] !==undefined) {
                    dataFilterMA500k.push( estacoes[est])
                    //ctEst++
                }
        }
    }
    loadMarkers(dataFilterMA500k)
}



function filterPointsMA500kNumeroEstacoes(coordenadas, polyMA500k, estacoes) {
    var pt1;
    var points;
    var tagged;
    
    var pt2=undefined;
    var pointsT;
    var taggedT=undefined;

    var estacoesOld=estacoes2020;
     // alert(estacoes)
    var dataFilterMA500k=[];
    var data2=[]
    console.log(polyMA500k)
    // pointGroupLayer.clearLayers();
    MA500kFilter=1
    primeiroDia = 0
    estadoInicial = 0;
    dateSelected = 0;
    dateSelectedFinal = 0;
  //  console.log(coordenadas)
   // console.log(coordenadas.lat)
    var nameMA;
    var max;
    var min;
    var maxX;
    var minX;
    var MA500k;
    if (coordenadas.lat > 0) {        
    

        for (var fe = 68; fe <359; fe++) {

            checkUndefined=SubBacias['_layers'][fe];
            if (checkUndefined!==undefined) {
            SubBacias['_layers'][fe]['feature']['properties']= {'name':SubBacias['_layers'][fe]['feature']['properties'][ 'name' ]}

            if ('geometries' in SubBacias['_layers'][fe]['feature']['geometry']){

                firstArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][0]['coordinates']
                //console.log(Math.min.apply(Math, firstArrayCoordenadas) )
                secondArrayCoordenadas=SubBacias['_layers'][fe]['feature']['geometry']['geometries'][1]['coordinates']

            SubBacias['_layers'][fe]['feature']['geometry']={'coordinates': [firstArrayCoordenadas, secondArrayCoordenadas]}

            }

            poly1 =SubBacias['_layers'][fe]['feature']


            console.log(  poly1['geometry']['coordinates']);  
            //console.log(  Math.max.apply(null, poly1['geometry']['coordinates'][0][0]));  

           

            var pt1 = turf.point([coordenadas.lng, coordenadas.lat]);
            var points = turf.featureCollection([pt1]);
            var tagged = turf.tag(points, poly1, 'name', 'name');
            if (tagged['features'][0]['properties']['name'] !==undefined) {



                if (Object.keys(poly1['geometry']['coordinates']).length  ==1 ){
                    var values = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[1]; });
                    var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                     max = Math.max.apply(null, values);
                     min = Math.min.apply(null, values);
                     maxX = Math.max.apply(null, valuesX);
                     minX = Math.min.apply(null, valuesX);
                    console.log(maxX)
                   // console.log(min)
        
                    }else{
                        var values = poly1['geometry']['coordinates'][0][0].map(function(elt) { return elt[1]; });
                        var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                        var max1 = Math.max.apply(null, values);
                        var min1 = Math.min.apply(null, values);

                        var maxX1 = Math.max.apply(null, values);
                        var minX1 = Math.min.apply(null, values);
        
        
                        var values = poly1['geometry']['coordinates'][1][0].map(function(elt) { return elt[1]; });
                        var valuesX = poly1['geometry']['coordinates'][0].map(function(elt) { return elt[0]; });
                        var max2 = Math.max.apply(null, values);
                        var min2 = Math.min.apply(null, values);
                        var maxX2 = Math.max.apply(null, values);
                        var minX2 = Math.min.apply(null, values);
                       // console.log(max2)
                       // console.log(min2)
        
                        if (max1>max2){
        
                            max=max1
                        }else{
                            max=max2
                        }
        
                        if (min1<max2){
        
                            min=min1
                        }else{
                            min=min2
                        }
        
        
                        if (maxX1>maxX2){
        
                            maxX=maxX1
                        }else{
                            maxX=maxX2
                        }
        
                        if (minX1<maxX2){
        
                            minX=minX1
                        }else{
                            minX=minX2
                        }




                    }
        
        
                    console.log(maxX)
                    console.log(minX)
        
        
                    result = Object.values(markersGlobal).filter(item => item.y <= max && item.y >= min )
                    console.log(result)
                    console.log(markersGlobal)
                    
        
                    estacoes=result;



                polyToFilter=poly1;
                break
                //nameMA = tagged['features'][0]['properties']['name'];
                //swal('Massa de Água '.concat(nameMA));
                //return nameMA
            }
//            addPoints()

        }
    }
  //  alert('First')

        let lenEst = estacoes.length;
        ctEst=0
        for ( est=0; est<lenEst; est++){
          //  console.log(est)
                pt2 = turf.point([estacoes[est].x,estacoes[est].y]);
                taggedT = turf.tag(turf.featureCollection([pt2]),  polyToFilter, 'name', 'name');
                if (taggedT['features'][0]['properties']['name'] !==undefined) {
                    MA500k=tagged['features'][0]['properties']['name'];
                   // dataFilterMA500k.push( estacoes[est])
                   ctEst++
                }
        }
    }
  //  loadMarkers(dataFilterMA500k)

    //alert('A Massa de Água '.concat(MA500k, ' contem ', contar, ' estações de amostragem'))
    swal('A Massa de Água '.concat(MA500k, ' contém ', ctEst , ' Captações'));
    estacoes2020= estacoesOld;

}


function mapFilterColor(MA500kPolygon, idF){
    map.removeLayer(MA500klayer)
    // polygonStyleMA500k = {color: "#98002e", fillColor: "#99d8c9", weight: 1.5, fillOpacity: 0.1};
    MA500klayer = L.geoJSON(MA500kPolygon, {style: function(feature) {
            //console.log(feature)
            switch (feature['properties']['objectid']) {
                case idF:
                    return {color: "#000000", fillColor: "#99d8c9", weight: 3.5, fillOpacity: 0.05};
                default:
                    return {color: "#008498", fillColor: "#99d8c9", weight: 1, fillOpacity: 0.4};
            }
        } }).addTo(map);
}

function mapClearFilterColor(MA500kPolygon){
    map.removeLayer(MA500klayer)
    // polygonStyleMA500k = {color: "#98002e", fillColor: "#99d8c9", weight: 1.5, fillOpacity: 0.1};
    MA500klayer = L.geoJSON(MA500kPolygon, {style: function(feature) {
            console.log(feature)
            switch (feature['properties']['objectid']) {
                default:
                    return {color: "#008498", fillColor: "#99d8c9", weight: 1.5, fillOpacity: 0.1};
            }
        } }).addTo(map);


}