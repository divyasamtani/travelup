$(document).ready(function() {
  var animating = false,
      submitPhase1 = 1100,
      submitPhase2 = 400,
      logoutPhase1 = 800,
      $login = $(".login"),
      $app = $(".app");

  function ripple(elem, e) {
    $(".ripple").remove();
    var elTop = elem.offset().top,
        elLeft = elem.offset().left,
        x = e.pageX - elLeft,
        y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({top: y, left: x});
    elem.append($ripple);
  };

  $("#signup-switch").on("click", function(e){
    e.preventDefault();
    $("#signin").hide();
    $("#signup").show();
  })

  $("#signin-switch").on("click", function(e){
    e.preventDefault();
    $("#signin").show();
    $("#signup").hide();
  })

  $("#accountcreated").on("click", function(e){
    e.preventDefault();
    var email    = $('#signup input.login__input.name').val();
    var password = $('#signup input.login__input.pass').val();

    console.log(email, password);

    $.ajax({
      method: "POST",
      url: "/",
      data: {email:email, password:password}
    }).done(function(resp){
      //console.log(resp);
      window.location = "http://localhost:3000/secret"
    }).error(function(resp){
      console.log(resp);
    });
  })
});
