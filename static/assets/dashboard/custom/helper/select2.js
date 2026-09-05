function loadSelect2() {
  let select2Element = $(".select2");

  if (select2Element.length > 0) {
    select2Element.each(function () {
      let element = $(this);

      element.wrap('<div class="position-relative"></div>').select2({
        allowClear: true,
        placeholder: "Pilih Salah Satu",
        dropdownParent: element.parent(),
      });
    });
  }
}

function loadElementSelect2(element) {
  element.wrap('<div class="position-relative"></div>').select2({
    allowClear: true,
    placeholder: "Pilih Salah Satu",
    dropdownParent: element.parent(),
  });
}

function loadSelect2Image() {
  let select2ImageElement = $(".select2-image");

  if (select2ImageElement.length > 0) {
    select2ImageElement.each(function () {
      let element = $(this);

      element.wrap('<div class="position-relative"></div>').select2({
        allowClear: true,
        placeholder: "Pilih Salah Satu",
        templateResult: _renderImageOption,
        templateSelection: _renderImageOption,
        dropdownParent: element.parent(),
        escapeMarkup: function (es) {
          return es;
        },
      });
    });
  }
}

function loadElementSelect2Image(element) {
  element.wrap('<div class="position-relative"></div>').select2({
    allowClear: true,
    placeholder: "Pilih Salah Satu",
    templateResult: _renderImageOption,
    templateSelection: _renderImageOption,
    dropdownParent: element.parent(),
  });
}

function loadSelect2Multiple() {
  let selectMultipleElement = $(".select2-multiple");

  if (selectMultipleElement.length > 0) {
    selectMultipleElement.each(function () {
      let element = $(this);

      element.wrap('<div class="position-relative"></div>').select2({
        placeholder: "Pilih Beberapa",
        multiple: true,
        width: "100%",
        dropdownParent: element.parent(),
      });

      _bindSelect2MultipleBackspaceFix(element);
    });
  }
}

function loadElementSelect2Multiple(element) {
  element.wrap('<div class="position-relative"></div>').select2({
    placeholder: "Pilih Beberapa",
    multiple: true,
    width: "100%",
    dropdownParent: element.parent(),
  });

  _bindSelect2MultipleBackspaceFix(element);
}

function loadSelect2Modal() {
  let selectModalElement = $(".select2-modal");

  if (selectModalElement.length > 0) {
    selectModalElement.each(function () {
      let element = $(this);

      element.select2({
        allowClear: true,
        placeholder: "Pilih Salah Satu",
        dropdownParent: element.parent(),
      });
    });
  }
}

function loadElementSelect2Modal(element) {
  element.select2({
    allowClear: true,
    placeholder: "Pilih Salah Satu",
    dropdownParent: element.parent(),
  });
}

function loadSelect2MultipleModal() {
  let selectMultipleModalElement = $(".select2-multiple-modal");

  if (selectMultipleModalElement.length > 0) {
    selectMultipleModalElement.each(function () {
      let element = $(this);

      let modal = element.closest(".modal");

      let initSelect2 = () => {
        if (element.data("select2")) {
          return;
        }

        element.select2({
          placeholder: "Pilih Beberapa",
          multiple: true,
          width: "100%",
          dropdownParent: modal.length ? modal : element.parent(),
        });

        _bindSelect2MultipleBackspaceFix(element);
      };

      if (modal.length && !modal.hasClass("show")) {
        modal.one("shown.bs.modal", initSelect2);
      } else {
        initSelect2();
      }
    });
  }
}

function loadElementSelect2MultipleModal(element) {
  let modal = element.closest(".modal");

  let initSelect2 = () => {
    if (element.data("select2")) {
      return;
    }

    element.select2({
      placeholder: "Pilih Beberapa",
      multiple: true,
      width: "100%",
      dropdownParent: modal.length ? modal : element.parent(),
    });

    _bindSelect2MultipleBackspaceFix(element);
  };

  if (modal.length && !modal.hasClass("show")) {
    modal.one("shown.bs.modal", initSelect2);
  } else {
    initSelect2();
  }
}

// * =========================================================================================================================
// * Private Function
// * =========================================================================================================================

function _renderImageOption(option) {
  if (!$(option.element).data("image")) {
    return option.text;
  }

  let $image = `<span><img src="${$(option.element).data("image")}" class="img-flag" /> ${option.text}</span>`;

  return $image;
}

function _bindSelect2MultipleBackspaceFix(element) {
  let syncSearchField = () => {
    const select2Instance = element.data("select2");

    if (!select2Instance) {
      return;
    }

    let searchField = select2Instance.$container.find(".select2-search__field");
    let hasSelection = element.val() && element.val().length > 0;

    searchField.val("");
    searchField.css("width", hasSelection ? "0.75em" : "100%");
  };

  element.on("select2:select select2:unselect", function () {
    setTimeout(syncSearchField, 0);
  });
}
