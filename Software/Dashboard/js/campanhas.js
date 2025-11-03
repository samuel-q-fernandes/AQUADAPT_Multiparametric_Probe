function pmCampanha2020() {
    estacoes2020 = pm2020;
    tipologiaCampanha='Plano Monitorização 20/21';
    execucaoCampanha = 'Plano Monitorizacao';
    campanha = "PM_20/21"
    tituloCampanha = 'Plano de Monitorização 20/21';
    resetvariablesPM()
    titulo()
}


function pmCampanha2021() {
    estacoes2020 = pm2021;
    tipologiaCampanha='Plano Monitorização 21/22';
    execucaoCampanha = 'Plano Monitorizacao';
    campanha = "PM_21/22"
    tituloCampanha = 'Plano de Monitorização 21/22';
    resetvariablesPM()
    titulo()

}

function pmCampanha2022() {
    estacoes2020 = pm2022;
    console.log(estacoes2020)
    tipologiaCampanha='Plano Monitorização 22/23';
    execucaoCampanha = 'Plano Monitorizacao';
    campanha = "PM_22/23"
    tituloCampanha = 'Plano de Monitorização 22/23';
    resetvariablesPM()
    titulo()
}


function segundaCampanha2020() {
    tabelasPlanoOperacinal20_21()
    tipologiaCampanha='Data 2Campanha';
    execucaoCampanha = 'Colheita 2C';
    campanha = "2_2020"
    tituloCampanha = '2ª Campanha 20/21';
    titulo()
    resetvariables()
}
function primeiraCampanha2020() {
    tabelasPlanoOperacinal20_21()
    tipologiaCampanha='Data 1Campanha';
    execucaoCampanha = 'Colheita 1C';
    campanha = "1_2020";
    tituloCampanha = '1ª Campanha 20/21';
    titulo()
    resetvariables()
}

function terceiraCampanha2020() {
    tabelasPlanoOperacinal20_21()
    tipologiaCampanha='Data 3Campanha';
    execucaoCampanha = 'Colheita 3C';
    campanha = "3_2020";
    tituloCampanha = '3ª Campanha 20/21';
    titulo()
    resetvariables()

}

function quartaCampanha2020() {
    tabelasPlanoOperacinal20_21()
    tipologiaCampanha='Data 4Campanha';
    execucaoCampanha = 'Colheita 4C';
    campanha = "4_2020";
    tituloCampanha = '4ª Campanha 20/21';
    titulo()
    resetvariables()
}



function quintaCampanha2020() {
    tabelasPlanoOperacinal20_21()
    tipologiaCampanha='Data 5Campanha';
    execucaoCampanha = 'Colheita 5C';
    campanha = "5_2020";
    tituloCampanha = '5ª Campanha 20/21';
    titulo()
    resetvariables()
}

function titulo(){
    x=document.getElementsByClassName('title leaflet-control');
    console.log(x)
    x[1].innerHTML='<h4>'+tituloCampanha+'</h4>';
   // x[1].innerText=tituloCampanha;
}

function resetvariables(){
    primeiroDia=0;
    estadoInicial = 0
    dateSelected=0;
    dateSelectedFinal=0;


    pointGroupLayer.clearLayers();
   // Tabletop.init({key: pointsURL, callback: addPoints, simpleSheet: true});
    addPoints()

}

function resetvariablesPM(){
    primeiroDia=0;
    estadoInicial = 0
    dateSelected=0;
    dateSelectedFinal=0;
    //Tabletop.init({key: pointsURL, callback: addPoints, simpleSheet: true});
    pointGroupLayer.clearLayers();
    addPoints()
}

function tabelasPlanoOperacinal20_21(){
    estacoes2020 = estacoesPO2020;
}