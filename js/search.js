---
---
SimpleJekyllSearch({
  searchInput: document.getElementById('search-input'),
  resultsContainer: document.getElementById('results-container'),
  json: '{{ '/search.json' | prepend: site.baseurl }}',
  
})

$('a[href="#search"]').on('click', function (event) {
  event.preventDefault();
  $('#search').addClass('open');
  $('#search-input').focus();
  $('body').addClass('modal-open');
});

$('#search button.close').on('click keyup', function (event) {
  if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
    $('#search').removeClass('open');
    $('body').removeClass('modal-open');
  }
});
$('#search-input').on("change input propertychange paste", function () {
  var inputVal = $(this).val();
  if (!inputVal) {
    $('#results-container').empty();
  }
});