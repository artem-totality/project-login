const regExpDic = {
  email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[0-9a-zA-z]{4,}$/,
};

/**
 * Function validate. Check Input on RegExp provided in regExpDic by input data-required type
 * @param {HTMLInputElement} el
 * @returns {Boolean} - Return true if input valid or doesn't has data-required attr
 */

export function validate(el) {
  const regExpName = el.dataset.required;

  if (!regExpDic[regExpName]) {
    return true;
  }

  return regExpDic[regExpName].test(el.value);
}