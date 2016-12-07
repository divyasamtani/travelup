$(document).ready(function(){
  mapObject             = null;
  var worldCoverage     = 0;
  var travelPercentage  = 0;
  var travelLevel       = "Noob";
  var locations         = [];

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
  function updateMap () {
    mapObject.clearSelectedRegions();
    mapObject.setSelectedRegions(locations)
  }

  // UPDATE TRAVEL LEVEL
  function updateTravelLevel(){
    if(travelPercentage <= 10){
      travelLevel = 'Noob';
      $('#travelLevel').text('Noob');
    }
    if(travelPercentage >= 11 && travelPercentage <= 20){
      travelLevel = 'Well-Travelled';
      $('#travelLevel').text('Well-Travelled');
    }
    if(travelPercentage >= 21 && travelPercentage <= 40){
      travelLevel = 'Global Traveller';
      $('#travelLevel').text('World Traveller');
    }
    if(travelPercentage >= 41 && travelPercentage <= 60){
      travelLevel = 'World Expert';
      $('#travelLevel').text('Travel Star');
    }
    if(travelPercentage >= 61 && travelPercentage <= 100){
      travelLevel = 'Travel Warrior';
      $('#travelLevel').text('Travel Warrior');
    }
  }

  function updateTravelStats () {
    worldCoverage    = locations.length;
    travelPercentage = Math.round((worldCoverage/176)*100);

    $('#worldCoverage').text(worldCoverage);
    $('#travelPercentage').text(travelPercentage + '%');
    updateTravelLevel();
  }

  // LOOK FOR CHECKED LOCATIONS
  function bindCheckbox () {
    $("input[type=checkbox]").click(function(e) {
      var $checkboxes = $("input[type=checkbox]");
      locations =[];
      for(var i = 0; i < $checkboxes.length; i++) {
        var checkbox = $checkboxes[i];
        if (checkbox.checked) {
          locations.push(countryCode[checkbox.value]);
        }
      }
      updateMap();
      updateTravelStats();
      saveTravelStats();
    });
  }

  // SAVE LOCATIONS
  function saveTravelStats(){
    $.ajax({
      url: '/user',
      method: 'PUT',
      data: {
        locations: locations,
        worldCoverage: worldCoverage,
        travelPercentage: travelPercentage,
        travelLevel: travelLevel
      }
    }).done(function(data){
      console.log("locations saved");
    });
  }

  function updateCheckbox(){
    if (window.location.pathname === "/secret") {
      for(var i = 0; i < locations.length; i++) {
        var location = locations[i];
        var name     = countryName[location];
        $('input[type=checkbox][value="' + name + '"]').prop('checked', true);
      }
    }
  }

  function repopulateMap () {
    var $loc = $('#loc');
    if($loc.length == 1){
      locations = JSON.parse($loc.text());

      updateMap();
      updateTravelStats();
      updateCheckbox();
    }
  }

  // INIIALIZE
  function init () {
    generateMap();
    bindCheckbox();
    repopulateMap();
  }

  init();
});
