export const checkPathValue = (message, path) => {
  const CIDR = "cidr";
  const KEYWORD = "pattern";
  if (path === CIDR && message.includes(KEYWORD)) {
    return message.replace("pattern", "format. Ex: 19.10.0.1/24");
  }
  return ` ${message}`;
};

function createValidator(schema) {
  return (values) => {
    const result = schema.validate(values, { abortEarly: false });
    if (result.error === null) {
      return {};
    }
    return result.error?.details.reduce((all, cur) => {
      const allErrors = { ...all };
      const path = cur.path[cur.path.length - 1];
      const message = checkPathValue(cur.message.replace(/"/g, ""), path); //
      if (Object.prototype.hasOwnProperty.call(allErrors, path)) {
        allErrors[path] += `${message}. `;
      } else if (cur.type.includes("array")) {
        allErrors[path] = { _error: message };
      } else if (cur.path.length === 3) {
        const fieldName = cur.path[0];
        const errors = allErrors[fieldName] || [];
        const index = cur.path[1];
        const field = cur.path[2];
        const elementErrors = errors[index] || {};
        elementErrors[field] = message;
        errors[index] = elementErrors;
        allErrors[fieldName] = errors;
      } else {
        allErrors[path] = message;
      }
      return allErrors;
    }, {});
  };
}

export default createValidator;
