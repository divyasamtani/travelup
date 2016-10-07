$(document).ready(function(){
  var places     = {};
  var newPlaces  = [];
  var list       = null;
  var newCard    = null;
  var createMode = true;
  var updateId   = null;

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

    // accomodation
    $('.accomodation input').val(list.accomodation);

    // foodandbev
    var $foodandbev   = $('.foodandbev input');
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
  function saveList (url, method){
    $.ajax({
      url: url || '/user/list',
      method: method || 'POST',
      data: {
        places: places
      }
    }).done(function(data){
        console.log(data);

        $('#cardList').html('');
        for(var i = 0; i < data.length; i++){
          createNewCard(data[i]);
        }

        $('#myModal').modal('hide');
    });
  }

  //   function alignCards (list) {
  //     for (var i = 0; i < lists.length; i++) {
  //         if(i%2) {
  //           $(this).find('.card').addClass('pull-right');
  //         } else {
  //         $(this).find('.card').addClass('pull-left');
  //         } if(i%2) {
  //           div(style="clear:both;");
  //         }
  //     }
  // }


// CREATE AND SHOW NEW CARD
  function createNewCard (list) {
    var $cardList = $('#cardList');
    var newText  = '' +
    '<div class="card col-xs-5">' +
          '<h5 class="card-header elegant-color-dark white-text" width="70px">' + list.location + '</h5>' +
          '<div class="card-block"> <a class="btn btn-lime editListButton" data-id="' + list._id + '">Edit</a> <a class="btn btn-cyan deleteListButton" data-id="' + list._id + '">Delete</a> </div>' +
        '</div>'
      '</div>';
    $(newText).appendTo($cardList);
  }


// EDIT BUTTON ON LIST CARD
// Retrive info to put in modal
  $("#cardList").on('click', '.editListButton', function (e) {
    e.preventDefault();

    var $button = $(e.target);
    var id      = $button.data('id');

    $.ajax({
      url: '/user/list/' + id,
      method: 'get'
    }).done(function(list){
      createMode = false;
      updateId   = list._id;
      replacePlaces(list);
      $('#myModal').modal('show');
    });
  });


// DELETE BUTTON ON LIST CARD
  $("#cardList").on('click', '.deleteListButton', function(e) {
     e.preventDefault();

    var $button = $(e.target);
    var id      = $button.data('id');

    $.ajax({
      url: '/user/list/' + id,
      method: 'delete',
    }).done(function(list){
      $(e.target).parents('.card').remove();
      console.log("list card deleted");
    });
  });

// UPDATE LISTS WITH NEW CARD
  $("#addlist").submit(function(event) {
    event.preventDefault();

    addPlaces();

    if (createMode) {
      saveList();
    } else {
      saveList("/user/list/" + updateId, "PUT")
    }

    // Clear and remove active from all inputs and lables
    $(this).find('input').val('');

    //
    $(this).find('label').removeClass('active');
    $(this).find('i').removeClass('active');
  });

  $('#myModal').on("hidden.bs.modal", function () {
    createMode = true;
    updateId   = null;
  })
});
