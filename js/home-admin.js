
displayMap();

function getLocation(ajaxurl) { 
    return $.ajax({
        url: ajaxurl,
        type: 'GET',
        jsonpCallback: "callback",
        dataType: 'jsonp',
    });
}

async function displayMap() {
    try {
        const res = await getLocation('https://geolocation-db.com/jsonp');

        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#74B266");

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");

        // Remove Antarctica
        polygonSeries.exclude = ["AQ"];

        // Add some data
        polygonSeries.data = [
            {
                "id": "US",
                "name": "United States",
                "value": 100,
                "fill": am4core.color("#F05C5C")
            }, 
            {
                "id": "FR",
                "name": "France",
                "value": 50,
                "fill": am4core.color("#5C5CFF")
            }
        ];

        // Bind "fill" property to "fill" key in data
        polygonTemplate.propertyFields.fill = "fill";

        // Create image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());

        // Create a circle image in image series template so it gets replicated to all new images
        var imageSeriesTemplate = imageSeries.mapImages.template;
        var circle = imageSeriesTemplate.createChild(am4core.Circle);
        circle.radius = 10;

        circle.isFocused = true;
        circle.hoverOnFocus = true;
        // console.log(circle)
        circle.fill = am4core.color("#33333");
        circle.stroke = am4core.color("#FFFFFF");
        circle.strokeWidth = 2;
        circle.nonScaling = true;
        circle.tooltipText = "{title}";

        // Set property fields
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.propertyFields.longitude = "longitude";


        chart.homeZoomLevel = 5;
        chart.homeGeoPoint = {
            latitude: res.latitude,
            longitude: res.longitude
        };

        getAllPins(res.latitude, res.longitude, res.country_name, res.city, imageSeries);
        
    } 
    catch(err) {
        console.log(err);
    }
}

//get data from database including current location
function getAllPins(latitude, longitude, country, city, imageSeries) {
    $.ajax({
        url: 'https://localhost/worldmap/api/getAdminData.php',
        type: 'GET',
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        success: function (data) {
            var formData = JSON.stringify(
                {
                    "latitude": latitude,
                    "longitude": longitude,
                    "title": city+', '+country
                }
            );

            for(let i=0; i<data.length; i++) {
                data[i].latitude = parseFloat(data[i].latitude);
                data[i].longitude = parseFloat(data[i].longitude);
            }

            imageSeries.data = data;
            let objData = JSON.parse(formData);
            imageSeries.data.push(objData);
           
            
        },
        error: function (data) {
            console.log(data);
        }
    });
}


//add new pin
$(document).on('click','#btnAddNewPin',function(e) {
    let lat = $('#latitude').val();
    let long = $('#longitude').val();
    let title = $('#title').val();
    let share = $('#share').is(':checked'); 

    if(share == true) {
        share = 1;
    }
    else {
        share = 0;
    }

    $.ajax({
        url: 'https://localhost/worldmap/api/insertData.php',
        type: 'POST',
        data : {
            latitude : lat,
            longitude : long,
            title : title,
            share : share
        },
        success: function (data) {
            //console.log(data);
            displayMap();
        },
        error: function (data) {
            console.log(data);
        }
    });

    document.getElementById("addForm").reset();
    $('#exampleModal').modal('hide');
});

//clicked the map
$(document).on('click', '.chartClick', function() {
    $('#exampleModal').modal('show');
});


