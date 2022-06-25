export const C_TYPE = {
  isString: function (value) {
    return typeof value === "string";
  },

  isFunction: function (value) {
    return typeof value === "function";
  },

  isNumber: function (value) {
    return typeof value === "number";
  },

  isNumberedString: function (value) {
    return !isNaN(parseFloat(value));
  },

  isUndefined: function (value) {
    return typeof value === "undefined";
  },

  isObject: function (value) {
    return typeof value === "object";
  },

  isArray: function (value) {
    return Array.isArray(value);
  },

  isNotFalse: function (value) {
    return value !== false;
  },
  //Taken from https://melvingeorge.me/blog/check-if-string-valid-uuid-regex-javascript
  isUuid: function (id) {
    const regexp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regexp.test(id);
  }
};
