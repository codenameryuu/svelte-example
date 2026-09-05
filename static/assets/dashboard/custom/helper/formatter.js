function formatNumber(value) {
  if (value) {
    let valueNumber = Number(value);

    if (Number.isNaN(valueNumber)) {
      return "";
    }

    let valueString = String(value);

    valueString = valueString.replaceAll(".", "");

    let result = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return result;
  }
}

function formatNumberElement(element) {
  if (element.value) {
    let valueNumber = Number(element.value);

    if (Number.isNaN(valueNumber)) {
      element.value = "";
      return;
    }

    let valueString = String(element.value);

    valueString = valueString.replaceAll(".", "");

    element.value = valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
