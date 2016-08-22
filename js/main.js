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
}) 