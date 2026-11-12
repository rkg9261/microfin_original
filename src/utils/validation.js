export const validateRequired = (formData, fields) => {

  const errors = {};

  fields.forEach((field) => {

    if (
      !formData[field.name] ||
      formData[field.name].toString().trim() === ""
    ) {

      errors[field.name] =
        field.label + " is required";

    }

  });

  return errors;

};