
function searchMA500k(dataMA500k, regex, output, count, countLines){
console.log('entrar')
var vb;
var jsEncodePoly;
var val=dataMA500k;
var lenDataMA500k=dataMA500k.length;

for (ldsM = 0; ldsM < lenDataMA500k; ldsM++) {
        
        if ((val[ldsM]['properties']['name'].search(regex) !== -1 )) {

            var idF=val[ldsM]['properties']['objectid']
            vb=String(val[ldsM]['properties']['name'])
            output += '<a href="#"><div onclick="document.getElementById(\'txt-search\').value ='+"'" +vb+ "'" +'"'+ '>' +
                '<div id="zomToPolygon" onclick="return zoomToPolygon('+JSON.stringify(val[ldsM]['geometry']['coordinates'][0])+','+idF+')">' +
                '<div  style=" background-color:#e0671e ;  "  class="col-lg-12 well ">';
            output += '<div class="col-lg-12">';
            output += '<a style="font-weight: bold; color:White" href="#">' + vb + '&nbsp&nbsp</a>';
            output += '</div>';
            output += '</div></div></div>';
            if(count == 1){
              //  console.log('nova linha')
                output += '</div><div class="row">'
                count=1
            }
            count++;
            countLines++;
        }
    };
console.log('sair')
console.log(countLines)
return [output, countLines]
}



