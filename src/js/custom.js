$(function () {

  $('#compliance a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
  });


  $('.dashboard-data-table').DataTable({
    "lengthChange": false,
    "pagingType": "simple_numbers",
    "processing": true,
    "language": {
      "processing": '<div  role="status"> </div>',
    },
    "columns": [
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    "scrollX": true,
    "scrollY": "50vh",
  });
  $('#payment-method-table').DataTable({
    "lengthChange": false,
    "pagingType": "simple_numbers",
    "processing": true,
    "language": {
      "processing": '<div  role="status"> </div>',
    },
    "order": [],
    "columns": [
      null,
      null,
      null,
      null,
      null
    ],
    "scrollX": true,
    "scrollY": "50vh",
  });

  $('.data-table-listing').DataTable({
    "lengthChange": false,
    "pagingType": "simple_numbers",
    "processing": true,
    "language": {
      "processing": '<div  role="status"> </div>',
    },
    "responsive": true,
    "scrollX": true,
    "scrollY": "50vh",
  })
  $('.long-data-table-listing').DataTable({
    "lengthChange": false,
    "pagingType": "simple_numbers",
    "processing": true,
    "language": {
      "processing": '<div  role="status"> </div>',
    },
    "responsive": true,
    "scrollX": true,
    "scrollY": "50vh",
  })

  $(document).on('shown.bs.tab shown.bs.modal', function () {
    adjustDataTable()
  });

  $(document).on('click', '.view-change > a', function () {
    $('.view-change > a').removeClass('active');
    $(this).addClass('active');
    let dataId = $(this).attr('data-id');
    $(this).parents('.entity-card-content').find('.tab-content-wrapper').css('display', 'none');
    $('#' + dataId).css('display', 'block');
    $(this).parents('.entity-card-content').find('.tab-listing').removeClass('active');
    $('.' + dataId).addClass('active');
    adjustDataTable()
  });

  $(document).on('click', '.view-change-entry > a', function () {
    $('.view-change-entry > a').removeClass('active');
    $(this).addClass('active');
    let dataId = $(this).attr('data-id');
    if (dataId === 'grid-view') $('.hide-tabs-grid-view').hide();
    else $('.hide-tabs-grid-view').show();
    $('.tab-content-wrapper').css('display', 'none');
    $('#' + dataId).css('display', 'block');
  });

  $(document).on('click', '.showAccordian', function () {
    $(this).parents('.form-check').next('.accordion').toggleClass('hide');
  });

  $(".datepicker").datepicker({
    dateFormat: "mm-dd-yy"
  });

  $("body").tooltip({ selector: '[data-toggle=tooltip]' });

  $('.btn-tab button').on('click', function () {
    $('.btn-tab button').removeClass('active');
    $(this).addClass('active');
    let dataID = $(this).attr('data-id');
    $('.btn-tab-content').css('display', 'none');
    $('#' + dataID).css('display', 'block');
  });

  $('.entity-card').on('click', function () {
    $('.entity-card').removeClass('active');
    $(this).addClass('active');
    let dataId = $(this).attr('data-id');
    $('.entity-card-content').removeClass('active');
    $('#' + dataId).addClass('active');
    adjustDataTable()
  });


  $('.open-folder').on('click', function () {
    let dataId = $(this).attr('data-id');
    $('.folder-level').css('display', 'none');
    $('#' + dataId).css('display', 'block');
    adjustDataTable()
  });

  $('.warning-popup').on('click', function () {
    warningPopup();
  });

  document.querySelectorAll(".showTimeButton").forEach((button) => {
    button.addEventListener("click", (event) => {
      const input = event.target.previousElementSibling;
      input.showPicker();
    });
  });
  if (screen.width < 768) {
    loadWarningSmallScreenPopup();
  }
});

function fileUploadInput() {
  document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", (e) => {
      inputElement.click();
    });

    inputElement.addEventListener("change", (e) => {
      if (inputElement.files.length) {
        updateThumbnail(dropZoneElement, inputElement.files[0]);
      }
    });

    dropZoneElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
      dropZoneElement.addEventListener(type, (e) => {
        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    dropZoneElement.addEventListener("drop", (e) => {
      e.preventDefault();

      if (e.dataTransfer.files.length) {
        inputElement.files = e.dataTransfer.files;
        updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
      }

      dropZoneElement.classList.remove("drop-zone--over");
    });

    $(document).on('click', '.go-back-parent', function () {
      $('.folder-level').css('display', 'none');
      $('#parent-folder').css('display', 'block');
    });

    $(document).on('click', '.go-back-child', function () {
      $('.folder-level').css('display', 'none');
      $('#child-folder').css('display', 'block');
      adjustDataTable()
    });
  });
}
fileUploadInput();

/**
 * Updates the thumbnail on a drop zone element.
 *
 * @param {HTMLElement} dropZoneElement
 * @param {File} file
 */
function updateThumbnail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

  // First time - remove the prompt
  if (dropZoneElement.querySelector(".drop-zone__prompt")) {
    dropZoneElement.querySelector(".drop-zone__prompt").remove();
  }

  // First time - there is no thumbnail element, so lets create it
  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone__thumb");
    dropZoneElement.appendChild(thumbnailElement);
    $('#fileUpload').modal('show');
  }

  thumbnailElement.dataset.label = file.name;

  // Show thumbnail for image files
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
    };
  } else {
    thumbnailElement.style.backgroundImage = null;
  }
}

/*Custom Select */
var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
      and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

//hover state for state field in filter slideout
$('.filter-state-label').hover(
  function () {
    var $this = $(this); // caching $(this)
    title = $(this).attr('title');
    $this.data('defaultText', $this.text());
    $this.text(title);
  },
  function () {
    var $this = $(this); // caching $(this)
    $this.text($this.data('defaultText'));
  }
);
function showCreditCardDetails() {
  document.querySelectorAll('#creditCardDetails').forEach(function (el) {
    el.style.display = 'flex';
  });
  document.querySelectorAll('#achInfo').forEach(function (el) {
    el.style.display = 'none';
  });
  document.querySelectorAll('#defaultPaymentDetails').forEach(function (el) {
    el.style.display = 'none';
  });
}
function showAchInfo() {
  document.querySelectorAll('#achInfo').forEach(function (el) {
    el.style.display = 'flex';
  });
  document.querySelectorAll('#creditCardDetails').forEach(function (el) {
    el.style.display = 'none';
  });
  document.querySelectorAll('#defaultPaymentDetails').forEach(function (el) {
    el.style.display = 'none';
  });
}
function adjustDataTable() {
  $('.data-table-listing').DataTable().columns.adjust();
  $('.long-data-table-listing').DataTable().columns.adjust();
}

function editDocumentName() {
  //generalized and optimized edit name functionality
  $('.save-name').hide();

  $('.edit-name').click(function () {
    $(this).hide();
    $(this).parents('.edit-name-parent').find('.item-name').attr('contentEditable', true).css('border', '1px solid #ccc').focus();
    $(this).parents('.edit-name-parent').find('.save-name').show();
  });

  $('.save-name').click(function () {
    $(this).hide();
    $(this).parents('.edit-name-parent').find('.item-name').removeAttr('contentEditable', true).css('border', '0px solid #ccc');
    $(this).parents('.edit-name-parent').find('.edit-name').show();
  });

  // edit document name functionality for table
  // hide all save button
  $('.save-document-name').hide();
  // add click event listener to all edit icons in the table
  $('.edit-document-name').click(function () {
    // get the table row containing the clicked edit icon
    var tableRow = $(this).closest('tr');
    // get the second span element in the first cell of the row
    var spanElement = tableRow.find('.doc-name');
    // set the contentEditable attribute to true
    spanElement.attr('contentEditable', true);
    // set focus on the span element to start editing
    spanElement.focus();
    // hide the edit button and show the save button
    $(this).hide();
    tableRow.find('.save-document-name').show();
  });

  // add click event listener to all save icons in the table
  $('.save-document-name').click(function () {
    // get the table row containing the clicked save icon
    var tableRow = $(this).closest('tr');
    // get the element with doc nme class in the first cell of the row
    var spanElement = tableRow.find('.doc-name');
    // disable editing by removing the contentEditable attribute
    spanElement.removeAttr('contentEditable');
    // hide the save button and show the edit button
    $(this).hide();
    tableRow.find('.edit-document-name').show();
  });
}
editDocumentName();

function toggleSection(that) {
  $(that).parents('.step-section').addClass('collapse');
  $(that).parents('.step-section').next('.step-section').removeClass('collapse');
}

function additionalServicesOptionTab(that) {
  // this function for stepper to redirect to second step in pages additional services/select
  const searchParams = new URLSearchParams(window.location.search);
  const tab = searchParams.get('tab');
  if (tab === 'options') {
    //automatic trigger on next button 
    toggleSection(that)
  }

}
function warningPopup() {
  $.alert({
    title: 'Warning',
    content: 'Unable to complete your request. Try Later',
    theme: 'bootstrap',
    columnClass: 'col-6 col-md-4',
    buttons: {
      Ok: {
        text: 'Ok',
        btnClass: 'w-100 py-2 m-0 text-white',
        keys: ['enter', 'shift'],
      }
    }
  });
}
function reintializeDataTable() {
  $('.data-table-listing').DataTable({
    "lengthChange": false,
    "pagingType": "simple_numbers",
    "processing": true,
    "language": {
      "processing": '<div class="" role="status"> </div>',
    },
    "retrieve": true
  });
}

//  warning Small screen Modal start
function loadWarningSmallScreenPopup() {
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML =
    `<div class="modal fade" id="mobileScreenWarning" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered align-items-center">
      <div class="modal-content border-0 rounded-3 bg-white p-0">
          <div class="modal-header p-0">
              <div class="d-flex justify-content-between align-items-center px-4 py-4 w-100 border-bottom">
                  <div class="font-weight-700 fs-7">Warning</div>
                  <div>
                      <span class="p-0 d-inline-block" role="button" data-bs-dismiss="modal">
                          <span class="icon icon-xs icon-close-dark m-0"></span>
                      </span>
                  </div>
              </div>
          </div>
          <div class="modal-body p-0">
              <div class="px-4 py-4 w-100 border-bottom">
                  For the best user experience and to ensure proper functionality, we strongly recommend
                  accessing this website from a desktop computer or a laptop with a larger screen.
              </div>
          </div>
      </div>
  </div>
</div>`

  // Append modalContainer to the document body
  document.body.appendChild(modalContainer);

  // Get a reference to the modal element
  const modal = document.getElementById('mobileScreenWarning');

  // Create a new Bootstrap Modal instance
  const bootstrapModal = new bootstrap.Modal(modal);

  // Open the modal
  bootstrapModal.show();
}