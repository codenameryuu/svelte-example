function loadDateFlatpickr() {
  let flatpickrDateElement = $(".flatpickr-date");

  if (flatpickrDateElement.length > 0) {
    flatpickrDateElement.each(function () {
      let element = $(this);

      element.flatpickr({
        locale: "id",
        altInput: true,
        dateFormat: "Y-m-d",
        altFormat: "j F Y",
        disableMobile: "true",
      });
    });
  }
}

function loadElementDateFlatpickr(element) {
  element.flatpickr({
    locale: "id",
    altInput: true,
    dateFormat: "Y-m-d",
    altFormat: "j F Y",
    disableMobile: "true",
  });
}

function loadDatetimeFlatpickr() {
  let flatpickrDatetimeElement = $(".flatpickr-datetime");

  if (flatpickrDatetimeElement.length > 0) {
    flatpickrDatetimeElement.each(function () {
      let element = $(this);

      element.flatpickr({
        locale: "id",
        enableTime: true,
        altInput: true,
        dateFormat: "Y-m-d H:i",
        altFormat: "j F Y H:i",
        time_24hr: true,
        disableMobile: "true",
      });
    });
  }
}

function loadElementDatetimeFlatpickr(element) {
  element.flatpickr({
    locale: "id",
    enableTime: true,
    altInput: true,
    dateFormat: "Y-m-d H:i",
    altFormat: "j F Y H:i",
    time_24hr: true,
    disableMobile: "true",
  });
}

function loadTimeFlatpickr() {
  let flatpickrTimeElement = $(".flatpickr-time");

  if (flatpickrTimeElement.length > 0) {
    flatpickrTimeElement.each(function () {
      let element = $(this);

      element.flatpickr({
        locale: "id",
        enableTime: true,
        noCalendar: true,
        altInput: true,
        dateFormat: "H:i",
        altFormat: "H:i",
        time_24hr: true,
        disableMobile: "true",
      });
    });
  }
}

function loadElementTimeFlatpickr(element) {
  element.flatpickr({
    locale: "id",
    enableTime: true,
    noCalendar: true,
    altInput: true,
    dateFormat: "H:i",
    altFormat: "H:i",
    time_24hr: true,
    disableMobile: "true",
  });
}
