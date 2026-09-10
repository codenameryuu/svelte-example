export default class CheckHelper {
  /**
   ** Isset
   *
   * @param value
   * @return boolean
   */
  public static isset(value: any) {
    let status = true;

    if (value === undefined) {
      status = false;
    }

    if (value === null) {
      status = false;
    }

    if (value == "") {
      status = false;
    }

    return status;
  }

  /**
   ** Is true
   *
   * @param value
   * @return boolean
   */
  public static isTrue(value: any) {
    let status = false;

    if (value == "true") {
      status = true;
    }

    if (value == true) {
      status = true;
    }

    return status;
  }
}
