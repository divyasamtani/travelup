$(document).ready(function(){
  mapObject             = null;
  var worldCoverage     = 0;
  var travelPercentage  = 0;
  var travelLevel       = null;

  // GENERATE MAP
  function generateMap () {
    mapObject = $('#map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false,
      regionStyle: {
        selected: {
          fill: 'red'
        }
      }
    }).vectorMap('get', 'mapObject');

  }

  // UPDATE MAP WITH CHECKED LOCATIONS
  function updateMap (locations) {
    mapObject.createRegions();
    mapObject.setSelectedRegions(locations)
  }

  function updateTravelLevel(percentage){
    if(percentage <= 20){
      $('#travelLevel').text('Noob');
    }
    if(percentage >= 21 && percentage <= 40){
      $('#travelLevel').text('Well-travelled');
    }
    if(percentage >= 41 && percentage <= 60){
      $('#travelLevel').text('Global traveller');
    }
    if(percentage >= 61 && percentage <= 80){
      $('#travelLevel').text('World Expert');
    }
    if(percentage >= 81 && percentage <= 100){
      $('#travelLevel').text('Travel Warrior');
    }
  }


  // LOOK FOR CHECKED LOCATIONS
  function bindCheckbox () {
    $("input[type=checkbox]").click(function(e) {

      console.log(e.target);


      var locations   = [];
      var $checkboxes = $("input[type=checkbox]");

      for(var i = 0; i < $checkboxes.length; i++) {
        var checkbox = $checkboxes[i];
        if (checkbox.checked) {
          locations.push(countryCode[checkbox.value]);
        }
      }
      updateMap(locations);
      worldCoverage = locations.length;
      $('#worldCoverage').text(worldCoverage);
      travelPercentage = Math.round((locations.length/176)*100);
      $('#travelPercentage').text(travelPercentage + '%');
      updateTravelLevel(travelPercentage);
    });
  }

  // SAVE LOCATIONS
  function savelocations(){
    $.ajax({
      url: '/user',
      method: 'PUT',
      data: {locations: locations}
    }).done(function(data){
      console.log("locations saved");
    });
  }

  // INIIALIZE
  function init () {
    generateMap();
    bindCheckbox();
  }

  init();
});
