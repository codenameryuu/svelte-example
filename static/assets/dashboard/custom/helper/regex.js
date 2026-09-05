let regexNumberElement = $(".regex-number");

regexNumberElement.on("keypress", function (event) {
  let regExp = /^[0-9]+$/i;

  if (regExp.test(event.key)) {
    return true;
  }

  return false;
});

let regexFloatElement = $(".regex-float");

regexFloatElement.on("keypress", function (event) {
  let regExp = /^[0-9]*\,?[0-9]*$/i;

  if (regExp.test(event.key)) {
    return true;
  }

  return false;
});
