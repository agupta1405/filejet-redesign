$(function () {
  $('#compliance a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  });

  $('#entity-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#jurisdictions-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#partners-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#group-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#partners-name-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#group-entity-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('#group-partner').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('.data-table-listing').DataTable({
    "searching": false,
    "lengthChange": false,
    "pagingType": "simple"
  });

  $('.nav-item a').on('click', function () {
    let dataId = $(this).attr('data-id');
    $('.tab-content-wrapper').css('display', 'none');
    $('#' + dataId).css('display', 'block');
    if (dataId === 'grid-view') {
      $('.nav-items').css({
        'opacity': '0',
        'visibility': 'hidden'
      });
    } else {
      $('.nav-items').css({
        'opacity': '1',
        'visibility': 'visible'
      });
    }
  });

  $(document).on('click', '.showAccordian', function(){
    $(this).parents('.form-check').next('.accordion').toggleClass('hide');
  })

  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

});