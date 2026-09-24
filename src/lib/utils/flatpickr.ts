type FlatpickrElement = JQuery<HTMLElement>;

const flatpickrDateDefaults = {
  locale: "id",
  altInput: true,
  dateFormat: "Y-m-d",
  altFormat: "j F Y",
  disableMobile: true,
};

const flatpickrDatetimeDefaults = {
  locale: "id",
  enableTime: true,
  altInput: true,
  dateFormat: "Y-m-d H:i:S",
  altFormat: "j F Y H:i",
  time_24hr: true,
  disableMobile: true,
};

const flatpickrTimeDefaults = {
  locale: "id",
  enableTime: true,
  noCalendar: true,
  altInput: true,
  dateFormat: "H:i",
  altFormat: "H:i",
  time_24hr: true,
  disableMobile: true,
};

function loadDateFlatpickr() {
  let jQuery = window.jQuery;
  let flatpickrDateElement = jQuery(".flatpickr-date");

  if (flatpickrDateElement.length > 0) {
    flatpickrDateElement.each(function () {
      let element = jQuery(this);

      element.flatpickr(flatpickrDateDefaults);
    });
  }
}

function loadElementDateFlatpickr(element: FlatpickrElement) {
  element.flatpickr(flatpickrDateDefaults);
}

function loadDatetimeFlatpickr() {
  let jQuery = window.jQuery;
  let flatpickrDatetimeElement = jQuery(".flatpickr-datetime");

  if (flatpickrDatetimeElement.length > 0) {
    flatpickrDatetimeElement.each(function () {
      let element = jQuery(this);

      element.flatpickr(flatpickrDatetimeDefaults);
    });
  }
}

function loadElementDatetimeFlatpickr(element: FlatpickrElement) {
  element.flatpickr(flatpickrDatetimeDefaults);
}

function loadTimeFlatpickr() {
  let jQuery = window.jQuery;
  let flatpickrTimeElement = jQuery(".flatpickr-time");

  if (flatpickrTimeElement.length > 0) {
    flatpickrTimeElement.each(function () {
      let element = jQuery(this);

      element.flatpickr(flatpickrTimeDefaults);
    });
  }
}

function loadElementTimeFlatpickr(element: FlatpickrElement) {
  element.flatpickr(flatpickrTimeDefaults);
}

export {
  loadDateFlatpickr,
  loadElementDateFlatpickr,
  loadDatetimeFlatpickr,
  loadElementDatetimeFlatpickr,
  loadTimeFlatpickr,
  loadElementTimeFlatpickr,
};
