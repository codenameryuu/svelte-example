import { DateTime } from "luxon";

export default class FormatterHelper {
  /**
   ** Format date
   *
   * @param date
   * @param day
   * @return string
   */
  public static formatDate(date: string, day: boolean = false) {
    let result = "";

    if (date) {
      let dateTime = DateTime.fromISO(date);

      if (!dateTime.isValid) {
        dateTime = DateTime.fromSQL(date);
      }

      if (!dateTime.isValid) {
        return result;
      }

      result = dateTime.toFormat("dd MMMM yyyy");

      if (day) {
        result = dateTime.toFormat("EEEE, dd MMMM yyyy");
      }
    }

    return result;
  }

  /**
   ** Format datetime
   *
   * @param datetime
   * @param day
   * @return string
   */
  public static formatDatetime(datetime: string, day: boolean = false) {
    let result = "";

    if (datetime) {
      let dateTime = DateTime.fromISO(datetime);

      if (!dateTime.isValid) {
        dateTime = DateTime.fromSQL(datetime);
      }

      if (!dateTime.isValid) {
        return result;
      }

      result = dateTime.toFormat("dd MMMM yyyy HH:mm:ss");

      if (day) {
        result = dateTime.toFormat("EEEE, dd MMMM yyyy HH:mm:ss");
      }
    }

    return result;
  }

  /**
   ** Format time
   *
   * @param time
   * @return string
   */
  public static formatTime(time: string) {
    let result = "";

    if (time) {
      let dateTime = DateTime.fromISO(time);

      if (!dateTime.isValid) {
        dateTime = DateTime.fromSQL(time);
      }

      if (!dateTime.isValid) {
        return result;
      }

      result = dateTime.toFormat("HH:mm");
    }

    return result;
  }

  /**
   ** Format number
   *
   * @param number
   * @param prefix
   * @return string
   */
  public static formatNumber(number: number, prefix: boolean = false) {
    let result = "";
    let currency = "";

    if (prefix) {
      currency = "Rp ";
    }

    if (number === 0) {
      result = currency + number;
    }

    if (number !== null) {
      result =
        currency +
        number.toLocaleString("id-ID", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });
    }

    return result;
  }

  /**
   ** Format float
   *
   * @param number
   * @param prefix
   * @return string
   */
  public static formatFloat(number: number, prefix: boolean = false) {
    let result = "";
    let currency = "";

    if (prefix) {
      currency = "Rp ";
    }

    if (number === 0) {
      result = currency + "0";
    }

    if (number !== null) {
      result =
        currency +
        number.toLocaleString("id-ID", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
    }

    return result;
  }

  /**
   ** Convert to integer
   *
   * @param number
   * @return number
   */
  public static convertToInteger(number: number) {
    let cleanNumber = number.toString().replace(/\./g, "");

    let result = parseInt(cleanNumber);

    return result;
  }

  /**
   ** Convert to float
   *
   * @param number
   * @return number
   */
  public static convertToFloat(number: number) {
    let cleanNumber = number.toString().replace(/\./g, "");

    let result = parseFloat(cleanNumber);

    return result;
  }
}
