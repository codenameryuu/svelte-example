import Hashids from "hashids";
import { DateTime } from "luxon";

const HASH_ID_LENGTH = import.meta.env.VITE_HASH_ID_LENGTH;
const HASH_ID_ALPHABET = import.meta.env.VITE_HASH_ID_ALPHABET;

export default class HashHelper {
  /**
   ** Unique code
   *
   * @return string
   */
  public static uniqueCode() {
    let now = DateTime.now().toFormat("yyyyMMddHHmmss");

    let random = Math.random().toString(36).substring(2, 15);

    let uniqueCode = now + random;

    return uniqueCode;
  }

  /**
   ** Encrypt
   *
   * @param value
   * @return string
   */
  public static encrypt(value: number) {
    let hashids = new Hashids("", Number(HASH_ID_LENGTH), HASH_ID_ALPHABET);

    let result = hashids.encode(value);

    return result;
  }

  /**
   ** Decrypt
   *
   * @param value
   * @return string
   */
  public static decrypt(value: string) {
    let hashids = new Hashids("", Number(HASH_ID_LENGTH), HASH_ID_ALPHABET);

    let decode = [];

    try {
      decode = hashids.decode(value);
    } catch (err) {
      return 0;
    }

    if (decode.length == 0) {
      return 0;
    }

    let result = Number(decode[0]);

    return result;
  }
}
