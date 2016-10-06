$(document).ready(function() {

  // NAV BAR

  $('.sidebarbutton').on('click', function() {
    $('.content').toggleClass('isOpen');
  });


 // MODAL FUNCTIONALITY

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