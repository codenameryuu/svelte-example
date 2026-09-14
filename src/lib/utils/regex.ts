function loadRegex() {
  let jQuery = window.jQuery;

  if (!jQuery) {
    return;
  }

  jQuery(document).on("keypress", ".regex-number", function (event: JQuery.KeyPressEvent) {
    let regExp = /^[0-9]+$/i;

    if (!regExp.test(event.key)) {
      event.preventDefault();
    }
  });

  jQuery(document).on("keypress", ".regex-float", function (event: JQuery.KeyPressEvent) {
    let regExp = /^[0-9]*\,?[0-9]*$/i;

    if (!regExp.test(event.key)) {
      event.preventDefault();
    }
  });
}

export { loadRegex };
