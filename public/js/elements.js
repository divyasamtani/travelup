$(document).ready(function() {

  // NAV BAR
  $('.sidebarbutton').on('click', function() {
    $('.content').toggleClass('isOpen');
  });


 // MODAL FUNCTIONALITY
  $('#createNewListButton').on('click', function(e){
    // clear
    $('#myModal').find('input').val('');

    // Remove active from all inputs and lables
    $('#myModal').find('label').removeClass('active');
    $('#myModal').find('i').removeClass('active');
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('.modal-backdrop').appendTo('#mainbody');
  });

  $(document).on('focus', '.modal input', function(e){
    $(e.target).parents('.md-form').find('label').addClass('active');
    $(e.target).parents('.md-form').find('i').addClass('active');
  });

  $(document).on('blur', '.modal input', function(e){
    if( $(e.target).val() == "" ){
      $(e.target).parents('.md-form').find('label').removeClass('active');
    }

    $(e.target).parents('.md-form').find('i').removeClass('active');
  });
});
