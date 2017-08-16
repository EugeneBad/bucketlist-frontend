$(document).ready(function() {

  $('#new_bcktlst_btn').click(function() {
    $('#new_bcktlst_div').slideToggle();
  });

  $('.item_btn').click(function(data) {
    console.log(data.type);
  });

  $('.bucketlist').hover(function(e){console.log(e.type, e.currentTarget.id)},
  function(e){console.log(e.currentTarget.id)});

});
