$(document).ready(function(){
  var mapObject = null;

  function generateMap () {
    mapObject = $('#map').vectorMap({
      map: 'world_mill',
      zoomOnScroll: false
    }).vectorMap('get', 'mapObject');
  }

  function updateMap (locations) {
    mapObject.setSelectedRegions(locations)
  }

  function bindCheckbox () {
    $("input[type=checkbox]").click(function(e) {
      var locations   = [];
      var $checkboxes = $("input[type=checkbox]");

      for(var i = 0; i < $checkboxes.length; i++) {
        var checkbox = $checkboxes[i];
        if (checkbox.checked) {
          locations.push(countryCode[checkbox.value]);
        }
      }

      updateMap(locations);
    });
  }

  function savelocations(){
    $.ajax({
      url: '/user',
      method: 'PUT',
      data: {locations: locations}
    }).done(function(data){
      console.log("locations saved");
    });
  }

  function init () {
    generateMap();
    bindCheckbox();
  }

  init();
});
