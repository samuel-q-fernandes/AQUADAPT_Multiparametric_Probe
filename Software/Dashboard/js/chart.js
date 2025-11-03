var chartupdate;


function chart(parametro, entrada) {
    // Set a file name variable
    var nomeFicheiro = 'file';

   // console.log('chart');

   // console.log(entrada);



    var formattedData = entrada.map(function(point) {
        return [point.x, point.y];
    });

    entrada=formattedData
    console.log(entrada);


    // Create the chart


    var chartupdate = Highcharts.chart('chartDay', {
        title: {
            // Add title if needed
             text: parametro
            // align: 'left'
        },
/*
        subtitle: {
            text: parametro
        },*/

        rangeSelector: {
            enabled: false // Disable the range selector
        },
        xAxis: {
            type: 'datetime',
            labels: {
                rotation: -45,
                staggerLines: 0,
                formatter: function() {
                    return Highcharts.dateFormat('%d/%m/%y', this.value);
                }
            },
            tickAmount: 5 // Display 5 ticks on the x-axis
           // dateTimeLabelFormats: {
             //   day: '%e/%m/%y', // Format changed to dd/mm/yy
            //}
        },





        navigator:{

            enabled:true
        },

        scrollbar: {
            enabled: false // Disable the scrollbar
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 600,
                    maxHeight:600
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

        legend: {
            enabled: true,
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },


        yAxis: {
            title: {
                // If you want a title, specify it here
                 text: parametro
            }
        },


        tooltip: {
            formatter: function() {
                // Format the date as "dd/mm/yyyy"

                var date = new Date(this.x);
                date.setHours(date.getHours() + 1); // Adjust for the one-hour delay
                var formattedDate = Highcharts.dateFormat('%d/%m/%Y %H:%M', date);

                // Return the formatted string to be displayed in the tooltip
                return '<span style="color:' + this.point.color + '"></span> <span style="font-size: 12px;"> Date: ' + formattedDate + '</span> <br>' + '</span> <span style="font-size: 12px;">Val: ' +  this.y+ '</span> '         ;
            }
        },

  /*      events: {
            afterSetExtremes: function(event) {
                console.log('Min:', Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', event.min));
                console.log('Max:', Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', event.max));
            }
        },*/
        series: [{
            type: "scatter",
            name: parametro,
            data: formattedData, // Use the properly formatted data
            marker: {
                enabled: true,
                symbol: "circle",
                radius: 6
            },
            color: '#000000'
        }]




    });

    // Return the chart reference if neede
}



