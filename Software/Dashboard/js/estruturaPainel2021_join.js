function estruturaPainelJoin(dataSubt, codigo, labAfetosNorte) {
    dadosInfoEstacaoHtml = []
    for (var iperf = 0; iperf < dataSubt.length; iperf++) {
        codigoEstacaoN = dataSubt[iperf]['N. INVENTARIO'];
        if (codigo === codigoEstacaoN) {

            //console.log(codigo)
            //console.log(codigoEstacaoN)
            nome = dataSubt[iperf]['Nome'];
            ARH = dataSubt[iperf]['ARH'];
            equipa = dataSubt[iperf]['Equipa'];
            if (campanha==='2_2020') {
                observacoes = dataSubt[iperf]['Observações 2C'];
                datacampanha = dataSubt[iperf]['Data 2Campanha'];
                estadoColheita =dataSubt[iperf]['Colheita 2C'];
            }
            if (campanha==='1_2020') {
                observacoes = dataSubt[iperf]['Observações 1C'];
                datacampanha = dataSubt[iperf]['Data 1Campanha'];
                estadoColheita =dataSubt[iperf]['Colheita 1C'];
            }
            if (campanha==='3_2020') {
                observacoes = dataSubt[iperf]['Observações 3C'];
                datacampanha = dataSubt[iperf]['Data 3Campanha'];
                estadoColheita =dataSubt[iperf]['Colheita 3C'];
            }
            if (campanha==='4_2020') {
                observacoes = dataSubt[iperf]['Observações 4C'];
                datacampanha = dataSubt[iperf]['Data 4Campanha'];
                estadoColheita =dataSubt[iperf]['Colheita 4C'];
            }


            if (campanha==='5_2020') {
                observacoes = dataSubt[iperf]['Observações 5C'];
                datacampanha = dataSubt[iperf]['Data 5Campanha'];
                estadoColheita =dataSubt[iperf]['Colheita 5C'];
            }

            if (estadoColheita==='A'){
                estadoC='Anulada';
            }else if (estadoColheita==='P'){
                estadoC='Pendente';
            }else if (estadoColheita==='E'){
                estadoC='Efetuada';
            }else if (estadoColheita==='B'){
                estadoC='Planeada';
            }else{
                estadoC='Outro';
            }
            if (datacampanha!=null) {
                data = ''
                for (var dt = 0; dt < 10; dt++) {
                    dr = datacampanha[dt]
                    if (dr === '-') {
                        dr = '/'
                    }
                    data = data + dr;
                }
                data = data[8] + data[9] + '/' + data[5] + data[6] + '/' + data[0] + data[1] + data[2] + data[3]
            }else(data='Não programada')
            situacaoEstacao = dataSubt[iperf]['Situação da Estação'];

            tipoPonto = dataSubt[iperf]['TIPO PONTO AGUA'];
            baciaHidrgrafica = dataSubt[iperf]['Data 2Campanha'];
            sistAquifero = dataSubt[iperf]['sist_aquif'];
            snirh= dataSubt[iperf]['Link'];
            nomeMA = dataSubt[iperf]['NOME_MA'];

            CT_SEPNA=dataSubt[iperf]['CT_SEPNA'];
            NPA_SEPNA=dataSubt[iperf]['NPA_SEPNA'];



            if (CT_SEPNA==null ){
                CT_SEPNA='-'
            }

            if (NPA_SEPNA==null ){
                NPA_SEPNA='-'
            }


            par1 = "<a style=\"font-size:18px\">";
            par2  = "</a><br>";
            parB1 = "<a style=\"font-size:18px\"><b>";
            parB2  = "</b></a>";



            semParametros='Sem parâmetros';



            //Parametros
            keys=Object.keys(dataSubt[iperf])
            parametros=[[]]
            for (var parametroComplementar=0; parametroComplementar< dataComplementarARH.length; parametroComplementar++ ){
                //   console.log( parametroComplementar)
                paramentroC=dataComplementarARH[parametroComplementar]['Parametros Efetuados'];
                laboratorioC=dataComplementarARH[parametroComplementar]['Laboratório'];
                for (var par=0; par<keys.length; par++) {
                    parametro = keys[par]

                    if (paramentroC === parametro) {

                        parNotas = dataSubt[iperf][parametro];

                        if (parNotas === null || parNotas === undefined) {
                            // parametros.push([laboratorioC, ''])
                        } else {
                            parametros.push([laboratorioC, parametro, parNotas])
                        }
                    }
                }

            }

            parametrosFinal=''
            sortBy=['Campo', 'lEV', 'LSA', 'LRA', 'Norte', 'IST' ]

            Object.keys(parametros).sort((a, b) => {
                return sortBy.indexOf(parametros[a].id) - sortBy.indexOf(parametros[b].id);
            })

            laborarioOld=''
            laboratorioOrd=''
            for (var parametroOrdenado=1; parametroOrdenado<parametros.length; parametroOrdenado++ ){
                laborarioOld=laboratorioOrd
                laboratorioOrd=parametros[parametroOrdenado][0];
                parametroORD=parametros[parametroOrdenado][1];
                parNotasOrd=parametros[parametroOrdenado][2];
                console.log(laboratorioOrd)
                console.log(parametroORD)
                console.log(parametroOrdenado)
                if (parametroOrdenado===1|| laboratorioOrd!==laborarioOld) {
                    labPar = "<a style=\"font-size:18px\"><b>".concat(laboratorioOrd, "&nbsp</b></a><br>");
                    hrpar=hr
                    console.log(labPar)
                }
                else{labPar='';hrpar=''}



                parametrosFinal=parametrosFinal+hrpar+labPar+ par1 + parametroORD+ ' - ' + parB1 + parNotasOrd + ' C' + parB2 + par2;

            }

            if (observacoes === null) {
                observacoes = ''
            }

            campo = "<a style=\"font-size:18px\"><b>Campo &nbsp</b></a><br>";

            lra = "<a style=\"font-size:18px\"><b>LRA &nbsp</b></a><br>";
            externo = "<a style=\"font-size:18px\"><b>Externo - IST &nbsp</b></a><br>";

            codigoEstacao1 = "<a style=\"font-size:18px\">Código Estação &nbsp<b>";
            codigoEstacao2 = "</b></a><br>";

            CT_SEPNA1 = "<a style=\"font-size:18px\">CT SEPNA &nbsp<b>";
            CT_SEPNA2 = "</b></a><br>";

            NPA_SEPNA1 = "<a style=\"font-size:18px\">NPA SEPNA &nbsp<b>";
            NPA_SEPNA2 = "</b></a><br>";

            sistAquifero1 = "<a style=\"font-size:18px\">Sistema Aquífero &nbsp <br><b>";
            sistAquifero2 = "</b></a><br>";

            equipa1 = "<a style=\"font-size:18px\">Equipa &nbsp<b>";
            equipa2 = "</b></a><br>";
            dataCampanha1 = "<a style=\"font-size:18px\">Data Campanha &nbsp<b>";
            dataCampanha2 = "</b></a><br>";
            arh1 = "<a style=\"font-size:18px\">ARH &nbsp<b>";
            arh2 = "</b></a><br><br>";
            tipoPA1 = "<a style=\"font-size:18px\">Tipo Ponto Água &nbsp<b>";
            tipoPA2 = "</b></a><br>";
            estadoColheita1 = "<a style=\"font-size:18px\">Estado Colheita &nbsp<b>";
            estadoColheita2= "</b></a><br>";
            observacoes1 = "<a style=\"font-size:20px\"><b>Observações &nbsp </b></a><br>";
            observacoes2 = "<a style=\"color: red ; font-size: 18px\">";
            observacoes3 = "</a><br>";
            snirh1= "<a style=\"font-size:18px\" href="+snirh+"><b>SNIRH</b></a><br>"+"</b></a>";

            nomeMA1 = "<a style=\"font-size:18px\">MA &nbsp <b>";
            nomeMA2 = "</b></a><br>";

            if (ARH==='ARH_Centro'){
                //ParametrosARHCentro
                var parametrosLEV='';
                var bollParametrosLEV=false;
                //console.log(dataSubt[iperf])
                keys=Object.keys(dataSubt[iperf])
                for (var par=13; par<24; par++){
                    parametro = keys[par]
                    parNotas = dataSubt[iperf][parametro];
                    if (parNotas ===null || parNotas===undefined){
                        parNotas='';
                    }else {
                        parametrosLEV = parametrosLEV + par1 + parametro + ' - ' + parB1 + parNotas + ' C' + parB2 + par2;
                        bollParametrosLEV=true
                    }
                }
                if (bollParametrosLEV===false){
                    parametrosLEV=par1+semParametros+par2;
                }

                lev = "<a style=\"font-size:18px\"><b>LC &nbsp</b></a><br>";
                htmlInfoEstacao = arh1.concat(ARH, arh2, codigoEstacao1, codigo, codigoEstacao2, sistAquifero1, sistAquifero, sistAquifero2, equipa1, equipa, equipa2,



                    dataCampanha1, data, dataCampanha2, estadoColheita1, estadoC, estadoColheita2, hr,
                    observacoes1, observacoes2, observacoes, observacoes3, hr, hr,
                    campo,parametrosCampo, hr,
                    lev, parametrosLEV, hr,
                    lra, parametrosLRA, hr,
                    externo, parametrosIST,hr,
                    snirh1)
                dadosInfoEstacao = [nome, htmlInfoEstacao]
                return dadosInfoEstacao


            }
            else{
                //ParametrosLev
                var parametrosLEV='';
                var bollParametrosLEV=false;
                //console.log(dataSubt[iperf])
                keys=Object.keys(dataSubt[iperf])
                for (var par=13; par<18; par++){
                    parametro = keys[par]
                    parNotas = dataSubt[iperf][parametro];
                    if (parNotas ===null || parNotas===undefined){
                        parNotas='';
                    }else {
                        parametrosLEV = parametrosLEV + par1 + parametro + ' - ' + parB1 + parNotas + ' C' + parB2 + par2;
                        bollParametrosLEV=true
                    }
                }
                if (bollParametrosLEV===false){
                    parametrosLEV=par1+semParametros+par2;
                }

                //ParametrosLSA

                var parametrosLSA='';
                var bollParametrosLSA=false;
                keys=Object.keys(dataSubt[iperf])
                for (var par=18; par<24; par++){
                    parametro = keys[par]
                    parNotas = dataSubt[iperf][parametro];
                    if (parNotas ===null || parNotas===undefined){
                        parNotas=''
                    }else{
                        parametrosLSA=parametrosLSA+par1+parametro+' - '+parB1+parNotas+' C'+parB2+par2;
                        bollParametrosLSA=true;
                    }
                }
                if (bollParametrosLSA===false){
                    parametrosLSA=par1+semParametros+par2;
                }

                lev = "<a style=\"font-size:18px\"><b>LEV &nbsp</b></a><br>";
                lsa = "<a style=\"font-size:18px\"><b>LSA &nbsp</b></a><br>";



                htmlInfoEstacao = arh1.concat(ARH, arh2, codigoEstacao1, codigoEstacaoN, codigoEstacao2, nomeMA1, nomeMA, nomeMA2, equipa1, equipa, equipa2,
                    CT_SEPNA1, CT_SEPNA, CT_SEPNA2,
                    NPA_SEPNA1,NPA_SEPNA, NPA_SEPNA2,
                    dataCampanha1, data, dataCampanha2, estadoColheita1, estadoC, estadoColheita2, hr,
                    observacoes1, observacoes2, observacoes, observacoes3, hr,

                    parametrosFinal,
                    hr
                )

                /*

                htmlInfoEstacao = arh1.concat(ARH, arh2, codigoEstacao1, codigo, codigoEstacao2, sistAquifero1, sistAquifero, sistAquifero2, equipa1, equipa, equipa2,
                    dataCampanha1, data, dataCampanha2, tipoPA1, tipoPonto, tipoPA2,estadoColheita1, estadoC, estadoColheita2, hr,
                    observacoes1, observacoes2, observacoes, observacoes3, hr,
                    /*  campo,parametros, hr,
                      lev, parametrosLEV, hr,
                      lsa,parametrosLSA, hr,
                      lra, parametrosLRA, hr,
                      externo, parametrosIST,hr,
                    parametrosFinal,
                    hr,
                    snirh1)
*/
                dadosInfoEstacao = [nome, htmlInfoEstacao]
                return dadosInfoEstacao
            }
        }
    }
}