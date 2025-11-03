function autocontroloHtmlManual(data, codigo, info, nome) {
    //console.log(data)
 
    data=jsonDataTemperature ;
  // console.log(jsonDataTemperature )
   // console.log(jsonDataTemperature.table.cols )
    //console.log(jsonDataTemperature.table.rows)
    //console.log(info)

    var colunas =jsonDataTemperature.table.cols;

    var linhas = jsonDataTemperature.table.rows;


    var estacao=nome;
    var date=[];
    var temperature=[]

    var index;
    for (i =0; i<colunas.length; i++){
      //  console.log(colunas[i].label)
         if (colunas[i].label==estacao){
  
            //alert(i)
            index=i
            break
        }
}

for (i =0; i<linhas.length; i++){
   // console.log(linhas[i].c[index])   

   if (linhas[i].c[index]==null){
   // alert('oi')
    break
   }
   // console.log(linhas[i].c[index].v);
  //  console.log(linhas[i].c[index-1].f);

    temperature.push(linhas[i].c[index].v);

    date.push(linhas[i].c[index-1].f);
}


    var chartVolume = `<figure class="highcharts-figure">                                                        
                            <div id="chartDay">                                                                       
                            </div>   
                            </figure> <br>`
    
    var chartLimit = `<figure class="highcharts-figure">                                                        
                            <div id="chartLimit">                                                                       
                            </div>   
                            </figure> <br>`

    parametros=['Temperature'];
    parametrosLimits=[];
    dataMedicao=[]
    tipoAmostragem=[]
    tipo_titulo=[]
    unidade=[]
   // console.log(data)
    title1 = "<a style=\"font-size:18px\>";
    title2 = ":&nbsp";
    title3 = "</a><br>";
    designacao='';

    //nome=nome
    nome1 = "<a style=\"font-size:18px\"><br>Nome: &nbsp<b>";
    nome2 = "</b></a>";
    
    x=info.latlng.long
  //  console.log(x)



    y=info.latlng.lat
    
    gStreet="<br><br> <a style=\"font-size:18px\"   href=http://maps.google.com/maps?q=&layer=c&cbll="+y+","+x+ " target=\"_blank\"><br><b>Street View</b></a>";

    //https://www.google.com/maps/@?api=1&map_action=map&center=37.7992940%2C-122.3976113&zoom=15&basemap=satellite
    gMaps=" <a style=\"font-size:18px\"  href=https://www.google.com/maps/search/?api=1&query="+y+","+x+"&zoom=10&basemap=satellite" +" target=\"_blank\"><br><b>Google Maps</b></a>";
    bingMaps=" <a style=\"font-size:18px\"  href= https://bing.com/maps?sp=point."+y+"_"+x+"_Estação&style=h" +" target=\"_blank\"><br><b>Bing Maps</b></a>";
    openstreetmaps=" <a style=\"font-size:18px\"  href= https://www.openstreetmap.org/?mlat="+y+"&mlon="+x+" target=\"_blank\"><br><b>OpenStreetMaps</b></a>";

    //  https://www.openstreetmap.org/?mlat=47.1911&mlon=2.4884#map=10/47.1911/2.4884

    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    var appleMaps='';
    if(isSafari){ 
        appleMaps=" <a style=\"font-size:18px\"  http://maps.apple.com/?q=Mexican+Restaurant&sll="+y+","+x+"&z=10&t=s" +" target=\"_blank\"><br><b>Apple Maps</b></a>";
        //http://maps.apple.com/?q=Mexican+Restaurant&sll=50.894967,4.341626&z=10&t=s
      
      } else {
        appleMaps='';
      }



//Gera o menu dropdown para escolha do parametro 
drop = '<br><select id="ddl" name="ddl" onMouseDown="this.value=\'\';" onChange="chartUpdateManual(this.value);">';


            parametros=['Temperature']

    for (i =0; i<parametros.length; i++){
     
            drop= drop+ '<option value=' + "'" +  parametros[i] +   "'" + '>' + parametros[i]+ '</option>';
    }
    data2=[]
   // console.log(temperature)
    data2.push(date, temperature); 

  // console.log(data2)
   dadosInseridos= inseridosChartManual(nome, data2);
  // console.log(inseridosChartManual)
   data=data2;
   drop = drop + '</select>';
   htmlInfoEstacao =  drop.concat(chartVolume, '<br>', gStreet, gMaps, bingMaps, openstreetmaps, appleMaps)
   dadosInfoEstacao = [nome, htmlInfoEstacao, dadosInseridos[0],  dadosInseridos[1] ]
  // console.log(htmlInfoEstacao)

    return  dadosInfoEstacao
}


var codigoID;
function inseridosChartManual(codigoID, data) {
    //data=dataEstacaoAutometica
  //  console.log(codigoID);
    entrada=[];
    saida=[];
    dataMedicaoEntrada=[];
    dataMedicaoSaida=[];
    for (i =0; i<data.length; i++){

        paramUndefined= (data[i]['Parametros'])
        console.log(data[1].length)
        for (j =0; j<data[1].length; j++){

            var dataTemp=data[0][j]

            dataTemp=dataTemp[3] + dataTemp[4] +'/' + dataTemp[0] +dataTemp[1]  + '/' + dataTemp[6] +dataTemp[7] +dataTemp[8] +dataTemp[9] ;
            dataTemp = new Date(dataTemp)


            var dd = String(dataTemp.getDate()).padStart(2, '0');
            var mm = String(dataTemp.getMonth() + 1).padStart(2, '0'); //January is 0!

            var yyyy = String(dataTemp.getFullYear());                   

            dateX = dd + '/' + mm + '/' + yyyy;

           // dataTemp = new Date(data[0][j])*/
           
           

                dateX = dataTemp

           // alert(data.length)
            //console.log((Object.keys(data[i]['Parametros'])[j]))
          //      console.log(dateX)
            //    console.log(data[0][j])
                entrada.push({ x:  dateX , y: data[1][j], color: '#2cef20' })}           

                    
    }
  //  console.log(entrada)
    return [codigoID, entrada];
}


function chartUpdateManual(value) {
    
   // console.log(value)
   // newData = inseridosChart(value, dataFirebase)
    //console.log(newData)
    var nomeParametroChartExport = value;
    chartupdate.update({
        chart: {
            inverted: false,
            polar: false
        },
        title: {
         //   text: 'Autocontrolo',
          //  align: 'left'
        },
      
        subtitle: {
            text: value
        },
        /*  yAxis: {
              title: {
                  text: titulos
              }
          },*/
        series: [
            {
            name: value,
            data: newData[1]
                ,color: '#2cef20',
        }, 
        ],
        exporting: {
            menuItemDefinitions: {
                // Custom definition
                label: {
                    onclick: function () {
                        this.renderer.label(
                            'You just clicked a custom menu item',
                            100,
                            100
                        )
                            .attr({
                                fill: '#a4edba',
                                r: 5,
                                padding: 10,
                                zIndex: 10
                            })
                            .css({
                                fontSize: '1.5em'
                            })
                            .add();
                    },
                    text: 'Show label'
                }
            },
            filename: String(String(nomeParametroChartExport[0]).concat(' ', value)),
        },
    });
}


function convertFromStringToDate(responseDate) {
   // console.log(typeof responseDate)
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
        timePieces[0], timePieces[1], timePieces[2]))
}


function getFktitulo(codigoPGHR_, tabelaLicencas) {
    // alert(tabelaLicencas.length)
  //  alert(codigoPGHR_)

    for (var lic = 0; lic < tabelaLicencas.length; lic++) {

        codigoLicencas = tabelaLicencas[lic];

        licencaFinal = codigoLicencas['codigo']
       
        if (licencaFinal === codigoPGHR_) {

       
            
            fk_ti = codigoLicencas['id']
         // console.log(fk_ti)
            
            
            
            sliambLink="https://siliamb.apambiente.pt/adm/?loadTitulo="+fk_ti+"&a=1627486271887"
            return  sliambLink;
        }
    }


}




var codigoID;
function inseridosChartLimits(codigoID) {

  //  console.log(codigoID);
    entrada=[];
    limiteDescarga=[];
    limiteDescargaInf=[];
    saida=[];
    dataMedicaoEntrada=[];
    dataMedicaoSaida=[];
   // console.log(dataAutocontroloLimits);

    for (i =0; i<dataAutocontroloLimits.length; i++){
       // console.log(dataAutocontroloLimits[i]['desc_parametro'] )
        //console.log(codigoID)
        if (dataAutocontroloLimits[i]['desc_parametro'] ===codigoID){
            console.log(dataAutocontroloLimits[i])


            if (dataAutocontroloLimits[i]['local_amostragem'] ==='Entrada'){
               // console.log(dataAutocontroloLimits[i]['desc_parametro'] )


                dataTemp =dataAutocontroloLimits[i]['data_medicao']
                dataTemp = new Date(dataTemp.split('T')[0])
                var dd = String(dataTemp.getDate()).padStart(2, '0');
                var mm = String(dataTemp.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = dataTemp.getFullYear();
                dateAnalisis = dd + '/' + mm + '/' + yyyy;
                dateX = dataTemp;
                if (dataAutocontroloLimits[i]['valor']>0){
                    if ("pH (Escala de Sörensen)"==dataAutocontroloLimits[i]['desc_parametro'] ){
                       
                        limitespH= trataLimitspH(dataAutocontroloLimits[i]['limite_descarga'])
                        console.log(limitespH)
                        limiteDescargaInf.push({ x: dateX, y: limitespH[0], color: '#ef8820' })
                        
                        limiteDescarga.push({ x: dateX, y: limitespH[1], color: '#ef2020' })
    
                    }else{
             
                        limiteDescarga.push({ x: dateX, y: parseFloat(removeChar(dataAutocontroloLimits[i]['limite_descarga'])), color: '#ef2020' })
                        limiteDescargaInf;
                    }    
    
                    entrada.push({ x: dateX, y: parseFloat(dataAutocontroloLimits[i]['valor']), color: '#2cef20' })              
            }
               // dataMedicaoEntrada.push(dataAutocontrolo[i]['data_medicao'] )
            }

            if (dataAutocontroloLimits[i]['local_amostragem'] ==='Saída'){

                dataTemp =dataAutocontroloLimits[i]['data_medicao']
                console.log(dataTemp)
                dataTemp = new Date(dataTemp.split('T')[0])
                var dd = String(dataTemp.getDate()).padStart(2, '0');
                var mm = String(dataTemp.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = dataTemp.getFullYear();
                dateAnalisis = dd + '/' + mm + '/' + yyyy;
                dateX = dataTemp;
               // console.log('saida')
                if (dataAutocontroloLimits[i]['valor']>0){

                    
                    if ("pH (Escala de Sörensen)"==dataAutocontroloLimits[i]['desc_parametro'] ){
                       
                        limitespH= trataLimitspH(dataAutocontroloLimits[i]['limite_descarga'])
                        console.log(limitespH)
                        limiteDescargaInf.push({ x: dateX, y: limitespH[0], color: '#ef8820' })
                        limiteDescarga.push({ x: dateX, y: limitespH[1], color: '#ef2020' })
    
    
                    }else{
                        limiteDescarga.push({ x: dateX, y: parseFloat(removeChar(dataAutocontroloLimits[i]['limite_descarga'])), color: '#ef2020' })
                        limiteDescargaInf;

                    }
    
                saida.push({ x: dateX, y: parseFloat(dataAutocontroloLimits[i]['valor']), color: '#1582f5' })
              
            }
              //  dataMedicaoSaida.push(dataAutocontrolo[i]['data_medicao'] )
            }
        }
    }
    return [codigoID, entrada, saida, limiteDescarga,   limiteDescargaInf];
}




function removeChar(autocontrolo){

    var stringRemove=['a',	'-',	'mg/l',	'mg',	'(mg/l',	'(mg',	'500',	'(mgO2/L)',	'mgO2/L', '*', 'mgO2',	'Kg/tSA',	'à',	'àentrada+10mg/L',	'á',	'(mg/l)',	'/',	'visível',	'visivel',	'visível*',	's/',	'visiv.',	'(m3/tSA)',	'(m3/tpsa)',	'm3/tSA',	'de',	'UCF/100',	'UFC/100',	'(*)',	'dS/m',	'c)',	'mg/mL',	'detetável',	'NMP']

    var autocontrolo;

    for ( stir =0; stir<stringRemove; stri++){


        autocontrolo=autocontrolo.replace(stringRemove[stir], "")

    }


        console.log(autocontrolo)
        return autocontrolo

}


function trataLimitspH(limitTrata){

    var separators = [' a ', 'a', '-', ' - '];



    limiteDescargaTemp=limitTrata
    limiteDescargaTemp=limiteDescargaTemp.replace("*", "")
    limiteDescargaTemp=limiteDescargaTemp.replace(",", ".")
    limiteDescargaTemp=limiteDescargaTemp.replace(",", ".")
    
    limiteDescargaTemp=limiteDescargaTemp.split(new RegExp(separators.join('|'),'g')); ; 

    console.log(limiteDescargaTemp)
    
    limitDescargaInferior=limiteDescargaTemp[0]
    limitDescargaInferior= parseFloat( limitDescargaInferior)
    limiteDescargaInf.push({ x: dateX, y: limitDescargaInferior, color: '#ef8820' })
   console.log(limitDescargaInferior)

   console.log(limiteDescargaTemp)
    lenLimitD=(limiteDescargaTemp.length)-1
    console.log(lenLimitD)
    limitDescargaSuperior=limiteDescargaTemp[lenLimitD]
    console.log(limitDescargaSuperior)
    limitDescargaSuperior= parseFloat( limitDescargaSuperior)


    return[limitDescargaInferior, limitDescargaSuperior]


}


function chartUpdateLimitsManual(value) {
    
  //  console.log(value)
    newData = inseridosChartLimits(value)
  //  console.log(newData)
    var nomeParametroChartExport = value;
    chartupdateLimitManual.update({
        chart: {
            inverted: false,
            polar: false
        },
        title: {

            text: 'Limites de Descarga',
      
            align: 'left'
        },
      
        subtitle: {
            text: value
        },
        /*  yAxis: {
              title: {
                  text: titulos
              }
          },*/
        series: [
            {
            name: 'Entrada',
            data: newData[1]
                ,color: '#2cef20',
        }, {
            name: 'Saída',
            data: newData[2]
                , color: '#1582f5',
        }, {
            name: 'Limite Superior',
            data: newData[3]
                , color:'#ef2020',
        }, {
            name: 'Limite Inferior',
            data: newData[4]
                , color:'#ef8820',
        },
        ],
        exporting: {
            menuItemDefinitions: {
                // Custom definition
                label: {
                    onclick: function () {
                        this.renderer.label(
                            'You just clicked a custom menu item',
                            100,
                            100
                        )
                            .attr({
                                fill: '#a4edba',
                                r: 5,
                                padding: 10,
                                zIndex: 10
                            })
                            .css({
                                fontSize: '1.5em'
                            })
                            .add();
                    },
                    text: 'Show label'
                }
            },
            filename: String(String(nomeParametroChartExport[0]).concat(' ', value)),
        },
    });
}


function convertFromStringToDate(responseDate) {
   // console.log(typeof responseDate)
    let dateComponents = responseDate.split('T');
    let datePieces = dateComponents[0].split("-");
    let timePieces = dateComponents[1].split(":");
    return (new Date(datePieces[2], (datePieces[1] - 1), datePieces[0],
        timePieces[0], timePieces[1], timePieces[2]))
}
