import { AxiosResponse } from "axios";

/**
 * @param {AxiosResponse} data
 */
export function okResponse(data) {
  return {
    ok: true,
    data,
  };
}

/**
 * @param {any} data
 */
export function failResponse(data) {
  return {
    ok: false,
    data,
  };
}
