$(document).ready(function(){
  var places = {};
  var newPlaces = [];
  var list = null;
  var newCard = null;

// ADD LIST PLACES TO ARRAY
  function addPlaces() {
    // Location
    places.location = $('.location input').val();

    // Accomodation
    places.accomodation = $('.accomodation input').val();

    // foodandbev
    var $foodandbev   = $('.foodandbev input');
    places.foodandbev = [];

    for (var i = 0; i < $foodandbev.length; i++) {
      places.foodandbev.push($foodandbev.eq(i).val());
    }

    var $activities   = $('.activities input');
    places.activities = [];

    for (var i = 0; i < $activities.length; i++) {
      places.activities.push($activities.eq(i).val());
    }
  }

  function replacePlaces(list){
      // Location
    $('.location input').val(list.location);

    // Accomodation
    $('.accomodation input').val(list.accomodation);

    // foodandbev
    var $foodandbev = $('.foodandbev input');

    for (var i = 0; i < list.foodandbev.length; i++) {
      $foodandbev.eq(i).val(list.foodandbev[i]);
    }

    var $activities   = $('.activities input');

    for (var i = 0; i < list.activities.length; i++) {
      $activities.eq(i).val(list.activities[i]);
    }

    $("#addlist input").each(function(index, value){
      if($(value).val() != ""){
        $(value).parents('.md-form').find('label').addClass('active');
        $(value).parents('.md-form').find('i').addClass('active');
      }
    });
  }

// SAVE PLACES TO LIST
  function saveList (){
    $.ajax({
      url: '/list',
      method: 'POST',
      data: {
        places: places
      }
    }).done(function(data){
      console.log(data);
      createNewCard(data);
      $('#myModal').modal('hide');
    });
  }

// CREATE AND SHOW NEW CARD
  function createNewCard (list) {
    var $cardList = $('#cardList');
    var newText  = '' +
    '<div class="card col-xs-6">' +
        '<div class="col-xs-12>' +
          '<h5 class="card-header elegant-color-dark white-text">' + list.location + '</h5>' +
          '<div class="card-block"><a class="card-block btn btn-default editListButton" data-id="' + list._id + '">Edit List</a></div>' +
        '</div>'
      '</div>';

    $(newText).appendTo($cardList);
  }

// EDIT BUTTON ON LIST CARD
  $("#cardList").on('click', '.editListButton', function (e) {
    e.preventDefault();

    var $button = $(e.target);
    var id      = $button.data('id');

    $.ajax({
      url: '/list/' + id,
      method: 'get'
    }).done(function(list){
      replacePlaces(list);
      $('#myModal').modal('show');
    })
  })

// UPDATE LISTS WITH NEW CARD
  $("#addlist").submit(function(event) {
    event.preventDefault();
    addPlaces();
    saveList();

    // clear
    $(this).find('input').val('');

    // Remove active from all inputs and lables

    $(this).find('label').removeClass('active');
    $(this).find('i').removeClass('active');

  });
});
