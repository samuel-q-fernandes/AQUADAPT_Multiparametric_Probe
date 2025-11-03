var chartupdateLimit;

$('.highcharts-range-selector').on('keydown', function (e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 9) {
    e.preventDefault();
    }
    if (keyCode === 13) {
    e.preventDefault();
    }
    });

function chartLimits(parametro,  entrada, saida, limits, limitsInf, dataMedicaoSaida, limitMax, limitMin) {
    nomeFicheiro='file'
  //  alert(parametro)
    

    chartupdateLimit =  Highcharts.stockChart('chartLimit', {

        chart: {
            type: 'scatter',
        },

        title: {

            text: 'Limites de Descarga',
      
            align: 'left'
        },
      
        subtitle: {
            text: parametro
        },

        yAxis: {
            title: {
                text: null
            }
        },

        xAxis: {
            type: "datetime",
            labels: {
                formatter: function() {
                    return Highcharts.dateFormat('%b/%e/%Y', this.value);
                }
            }
        },

        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
/*
        plotOptions: {
            scatter: {
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x} , {point.y}',
                    valueDecimals: 2
                }
            }
        },*/
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
                                fill: '#eda4c2',
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
            filename:String(nomeFicheiro) ,
        },
        series: [   {
            name: 'Entrada',
            data: entrada,
            marker: {
                enabled: true,
                symbol: "circle",
                radius: 5
            },color: '#2cef20',
            tooltip: {
                valueDecimals: 2
            }
        },
            {
                name: 'Saída',
                data: saida,
                marker: {
                    enabled: true,
                    symbol: "circle",
                    radius: 4,
                    // enabled:false


                }, color: '#1582f5',
                legendColor:'#f5152f',
                tooltip: {
                    valueDecimals: 2
                }
            },

            {   
               	
                name: 'Limite Superior',
                data: limits,
                marker: {
                    enabled: true,
                    symbol: "circle",
                    radius: 4,
                    // enabled:false


                }, color: '#ef2020',
                tooltip: {
                    valueDecimals: 2
                }

            },

            {   
               	
                name: 'Limite Inferior',
                data: limitsInf,
                marker: {
                    enabled: true,
                    symbol: "circle",
                    radius: 4,
                    // enabled:false
                }, color: '#ef8820',
       
                tooltip: {
                    valueDecimals: 2
                }

            },
        ],

        
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        /*
                                                labelFormatter: function() {
                                                    if (this.name === 'Saída') {
                                                        return this.name + ' <span style="color: #998287;"></span> <span class="highcharts-legend-custom-button"></span>';
                                                    } else {
                                                        return this.name;
                                                    }
                                                }*/


                    }
                }
            }]
        },


        rangeSelector: {

            labelStyle: {
                display: 'none'
             },
 
            buttons: [{
                type: 'month',
                count: 1,
                text: '1m',
                title: 'Ver 1 mês'
            }, {
                type: 'month',
                count: 3,
                text: '3m',
                title: 'Ver 3 meses'
            }, {
                type: 'month',
                count: 6,
                text: '6m',
                title: 'Ver 6 meses'
            }, {
                type: 'ytd',
                text: 'YTD',
                title: 'Ver ano até hoje'
            }, {
                type: 'year',
                count: 1,
                text: '1y',
                title: 'Ver 1 ano'
            }, {
                type: 'all',
                text: 'Todos',
                title: 'Ver tudo'
            }],
    
        },




    });
}
/*
legend: {
    align: 'left',
    useHTML: true,
    lineHeight: 30,
    labelFormatter: function() {
      if (this.name === 'BMW') {
        return this.name + ' <span style="color: #828e99;">|</span> <span class="highcharts-legend-custom-button">+</span>';
      } else {
        return this.name;
      }
    }
  },
*/