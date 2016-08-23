$(function(){
  var scrollTopTreshold = 10;
  if($(window).scrollTop() <= scrollTopTreshold){
    $('.move-top').addClass('hide');
  }

  $(window).on('scroll', function(){
    if($(window).scrollTop() > scrollTopTreshold){
      $('.move-top').removeClass('hide');
    }
    else{
      $('.move-top').addClass('hide');
    }
  })

  $('.move-top').click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  })

  $('a[href="#search"]').on('click', function (event) {
    event.preventDefault();
    $('#search').addClass('open');
    $('#search > form > input[type="search"]').focus();
  });

  $('#search button.close').on('click keyup', function (event) {
    if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
      $('#search').removeClass('open');
    }
  });

}) 