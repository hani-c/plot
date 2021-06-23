// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var chart, dataSequence = [
     {
            name: '2009',
            data: [1, 2, 2, 1, 1, 2, 2, 2, 1, 1,5]
        }, {
            name: '2010',
            data: [6, 12, 2, 3, 3, 2, 2, 3, 2, 2,5]
        }, {
            name: '2011',
            data: [4, 5, 6, 5, 5, 4, 9, 5, 3, 4,5]
        }, {
            name: '2012',
            data: [5, 5, 6, 6, 5, 6, 6, 5, 5, 6, 5]
        }, {
            name: '2013',
            data: [6, 7, 7, 6, 6, 6, 7, 7, 6, 7, 5]
        }, {
            name: '2014',
            data: [8, 9, 9, 8, 8, 8, 9, 9, 8, 9, 5]
        }, {
            name: '2015',
            data: [9, 10, 4, 10, 9, 9, 9, 10, 10, 10, 5]
        }, {
            name: '2016',
            data: [1, 10, 10, 10, 10, 11, 11, 11, 12, 12, 5]
        }, {
            name: '2017',
            data: [11, 11, 12, 12, 12, 11, 11, 12, 12, 12, 5]
        }
    ];
    

// Create the chart
 $('#container').highcharts('Map', {

    title: {
        text: 'Highmaps with time control'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/fr/custom/fr-all-mainland.js">France, mainland</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0,
        max: 12
    },

    series: [{
        data: dataSequence[0].data.slice(),
        mapData: Highcharts.maps['countries/fr/custom/fr-all-mainland'],
        joinBy: null,
        name: 'Random data',
        states: {
            hover: {
                color: '#dad655'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});

   chart = $('#container').highcharts();

 /**
     * Update the chart. This happens either on updating (moving) the range input,
     * or from a timer when the timeline is playing.
     */
    function update(increment) {
        var input = $('#play-range')[0],
            output = $('#play-output')[0];

        if (increment) {
            input.value = parseInt(input.value) + increment;
        }
        chart.series[0].setData(dataSequence[input.value].data); // Increment dataset (updates chart)
        output.innerHTML = dataSequence[input.value].name; // Output value
        if (input.value >= input.max) { // Auto-pause
            pause($('#play-pause-button')[0]);
        }
    }

    /**
     * Play the timeline.
     */
    function play(button) {
        button.title = 'pause';
        button.className = 'fa fa-pause';
        chart.sequenceTimer = setInterval ( function () {
            update(1);
        }, 500);

    }
    
    /** 
     * Pause the timeline, either when the range is ended, or when clicking the pause button.
     * Pausing stops the timer and resets the button to play mode.
     */
    function pause(button) {
        button.title = 'play';
        button.className = 'fa fa-play';
        clearTimeout(chart.sequenceTimer);
        chart.sequenceTimer = undefined;
    }
    
    /**
     * Toggle play and pause from the button
     */
    $('#play-pause-button').bind('click', function () {
        if (chart.sequenceTimer === undefined) {
            play(this);
        } else {
            pause(this);
        }
    });
    
    /**
     * Update the chart when the input is changed
     */
    $('#play-range').bind('input', function () {
        update();
    });
});

var data2 = [
    ['fr-idf-se', 0],
    ['fr-idf-hd', 1],
    ['fr-idf-ss', 2],
    ['fr-idf-es', 3],
    ['fr-idf-vo', 4],
    ['fr-idf-vp', 5],
    ['fr-idf-vm', 6],
    ['fr-idf-yv', 7]
];

// Create the chart
Highcharts.mapChart('container2', {
    chart: {
        map: 'countries/fr/fr-idf-all'
    },

    title: {
        text: 'Highmaps basic demo'
    },

    subtitle: {
        text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/fr/fr-idf-all.js">Île-de-France</a>'
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data2,
        name: 'Random data',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});
