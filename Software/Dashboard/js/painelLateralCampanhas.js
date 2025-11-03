function selectCampanha2020(){
    campaign="<a href=\"javascript:pmCampanha2020('Plano de Monitorização 20/21')\" style=\"font-size:12px\"> <b>Plano Monit. 20/21 </b></a><br>\n" +
    "<a href=\"javascript:primeiraCampanha2020('1ª Campanha 2020')\" style=\"font-size:12px\"> <b>1ª Campanha 20/21 </b></a><br>\n" +
    "<a href=\"javascript:segundaCampanha2020('2ª Campanha 2020')\" style=\"font-size:12px\"> <b>2ª Campanha 20/21</b> </a><br>\n" +
    "<a href=\"javascript:terceiraCampanha2020('3ª Campanha 2020')\" style=\"font-size:12px\"> <b>3ª Campanha 20/21 </b></a><br>\n" +
    "<a href=\"javascript:quartaCampanha2020('4ª Campanha 2020')\" style=\"font-size:12px\"> <b>4ª Campanha 20/21 </b></a><br><br>\n" ;
    var element = document.getElementById("campaign");
    element.innerHTML = campaign;
}

function selectCampanha2021(){
    campaign="<a href=\"javascript:pmCampanha2021('Plano de Monitorização 2021')\" style=\"font-size:12px\"> <b>Plano Monit. 2021 </b></a><br><br>\n";
    var element = document.getElementById("campaign");
    element.innerHTML = campaign;
}


function selectCampanha2022(){
    campaign="<a href=\"javascript:pmCampanha2022('Plano de Monitorização 2022')\" style=\"font-size:12px\"> <b>Plano Monit. 2022 </b></a><br><br>\n";
    var element = document.getElementById("campaign");
    element.innerHTML = campaign;
}