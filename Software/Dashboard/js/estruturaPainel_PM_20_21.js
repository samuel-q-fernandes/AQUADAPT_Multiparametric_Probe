function pm20_21(dataSubt, codigo) {
    dadosInfoEstacaoHtml = []
    for (var iperf = 0; iperf < dataSubt.length; iperf++) {
        codigoEstacaoN = dataSubt[iperf]['N. INVENTARIO'];
        if (codigo === codigoEstacaoN) {
            //console.log(codigo)
            //console.log(codigoEstacaoN)
            nome = dataSubt[iperf]['NOME_ESTACAO'];
            ARH = dataSubt[iperf]['ARH'];


            ano = dataSubt[iperf]['ANO'];
            baciaHidrgrafica = dataSubt[iperf]['Data 2Campanha'];
            nomeMA = dataSubt[iperf]['NOME_MA'];
            anoCampanha = dataSubt[iperf]['ANO'];

            par1 = "<a style=\"font-size:16px\">";
            par2  = "</a><br>";
            parB1 = "<a style=\"font-size:16px\"><b>";
            parB2  = "</b></a>";
            semParametros='Sem parâmetros';

            //ParametrosCampo
            var parametrosCampo='';
            var bollParametrosCampo=false;
            keys=Object.keys(dataSubt[iperf])
            for (var par=12; par<119; par++){
                parametro = keys[par]
                parNotas = dataSubt[iperf][parametro];
                if (parNotas ===null || parNotas===undefined){
                    parNotas='';
                }else {
                    parametrosCampo = parametrosCampo + par1 + parametro + ' - ' + parB1 + parNotas + ' C' + parB2 + par2;
                    bollParametrosCampo=true;
                }
            }
            if (bollParametrosCampo===false){
                parametrosCampo=par1+semParametros+par2;
            }

            campo = "<a style=\"font-size:18px\"><b>Parâmetros &nbsp</b></a><br>";
            codigoEstacao1 = "<a style=\"font-size:18px\">Código Estação &nbsp<b>";
            codigoEstacao2 = "</b></a><br>";
            nomeMA1 = "<a style=\"font-size:18px\">MA &nbsp <b>";
            nomeMA2 = "</b></a><br>";
            ano1 = "<a style=\"font-size:18px\">Ano &nbsp <b>";
            ano2 = "</b></a><br>";

            equipa1 = "<a style=\"font-size:18px\">Equipa &nbsp<b>";
            equipa2 = "</b></a><br>";
            dataCampanha1 = "<a style=\"font-size:18px\">Data Campanha &nbsp<b>";
            dataCampanha2 = "</b></a><br>";
            arh1 = "<a style=\"font-size:18px\">ARH &nbsp<b>";
            arh2 = "</b></a><br><br>";
            estadoColheita1 = "<a style=\"font-size:18px\">Estado Colheita &nbsp<b>";
            estadoColheita2= "</b></a><br>";

            observacoes1 = "<a style=\"font-size:20px\"><b>Observações &nbsp </b></a><br>";
            observacoes2 = "<a style=\"color: red ; font-size: 18px\">";
            observacoes3 = "</a><br>";


            htmlInfoEstacao = arh1.concat(ARH, arh2, codigoEstacao1, codigoEstacaoN, codigoEstacao2, nomeMA1, nomeMA, nomeMA2,ano1, ano, ano2,
                  hr,
                campo,parametrosCampo, hr)//,
             //   lev, parametrosLEV, hr,
             //   lsa,parametrosLSA, hr,
             //   lra, parametrosLRA, hr,
             //   externo, parametrosIST)
            dadosInfoEstacao = [nome, htmlInfoEstacao]
            return dadosInfoEstacao
        }
    }
}
