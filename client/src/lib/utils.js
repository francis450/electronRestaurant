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