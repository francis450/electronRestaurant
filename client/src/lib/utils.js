// function that takes in an array of objects and returns an array of objects labelled with value and label
export const formatOptions = (options, id="id", name="name" ) => {
  return options?.map((option) => {
    return {
      value: option[id],
      label: option[name],
      unit_of_measurement_id: option.unit_of_measurement_id,
    };
  });
};

// function that validates the form fields
// it takes in a regex pattern, the field name and the field value and setter callback to update the state
export const validateField = (pattern, fieldName, fieldValue, setErrors, errorMessage) => {
  if (!pattern.test(fieldValue)) {
    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage}));
  } else {
    setErrors((prev) => ({ ...prev, [fieldName]: "" }));
  }
}