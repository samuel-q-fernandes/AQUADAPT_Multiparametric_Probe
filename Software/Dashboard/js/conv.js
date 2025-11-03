function conversionCr(snirh, codigoR){

  //  console.log(snirh)
    var cX;
    var cY;
    var  cCodigo;
    //console.log(codigoR)

    var ultimoCaracter= codigoR[codigoR.length - 1];


    if (ultimoCaracter==='S' || ultimoCaracter==='F' || ultimoCaracter==='C'|| ultimoCaracter==='P')
    {
        // console.log(codigoR,'ultimo')
        codigoR=codigoR.substr(0, 6)
        //console.log(codigoR,'ultimo')
    }

            for (var  snR = 0; snR < snirh.length; snR++){

               // console.log(sn)


                cCodigo=snirh[snR]['attributes']['codigo']


                var ultimoCaracterC= cCodigo[cCodigo.length - 1];

                if (ultimoCaracterC==='S' || ultimoCaracterC==='F' || ultimoCaracterC==='C'|| ultimoCaracterC==='P')
                {
                //    console.log( cCodigo,'ultimo')
                    cCodigo= cCodigo.substr(0, 6)
                  //  console.log( cCodigo,'ultimo')
                }




                //  cCodigo=String(cCodigo);
              //  cCodigo=cCodigo.substr(0, 6);

                if (codigoR=='01F/07S'){

                    //console.log(cCodigo)
                }


               // console.log(cCodigo)
               // console.log( cCodigo)
                if (cCodigo==codigoR) {
                  //  console.log(cCodigo)
                    //console.log(cX)
                    //console.log(cY)

                    cX=snirh[snR]['geometry']['x']
                    cY=snirh[snR]['geometry']['y']

                    return [cX, cY]

                }
            }

/*
         var projections = {
        wgs84: "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
        //DatumLisboa: "+proj=utm +zone=30 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs",

        DatumLisboa:"+title=Hayford-Gauss Datum Lisboa (IGP) +proj=tmerc +lat_0=39.66666666666666 +lon_0=1 +k=1 +x_0=0 +y_0=0 +towgs84=-283.088,-70.693,117.445,-1.157,0.059,-0.652,-4.058 +ellps=intl +pm=lisbon +units=m +no_defs"
    };

    var cr=2//proj4(projections['DatumLisboa'],projections['wgs84'],[X, Y])
*/
    console.log('Estacoes sem coordenadas no SNIRH')
    console.log(codigoR)
    return [0, 0]

}