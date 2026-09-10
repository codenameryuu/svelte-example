export default class ArrayHelper {
  /**
   ** Is value in array
   *
   * @param value
   * @param array
   * @return boolean
   */
  public static isValueInArray(value: any, array: any) {
    let status = array.includes(value);

    return status;
  }

  /**
   ** Is key exists in array
   *
   * @param key
   * @param array
   * @return boolean
   */
  public static isKeyExistsInArray(key: any, array: any) {
    let status = Object.keys(array).includes(key);

    return status;
  }
}
