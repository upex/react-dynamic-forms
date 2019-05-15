/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, callback, model) {

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback(values);
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event, key, type='single') {
    if (type === 'single') {
      setValues({
        ...values,
        [key]: event.target.value
      });
    } else {
      // Array of values (e.g. checkbox)
      let found = values[key] ?  
      values[key].find ((d) => d === event.target.value) : false;
      if (found) {
          let data = values[key].filter((d) => {
              return d !== found;
          });
          setValues({
            ...values,
            [key]: data
          });
      } else {
          const val = values[key] ? values[key] : '';
          setValues({
            ...values,
            [key]: [event.target.value, ...val]
          });
      }
    }
  }

  function handleErrors() {
    const validationErrors = validate(model, values);
    setErrors(validationErrors);
  }

  function handleBlur() {
    handleErrors();
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleErrors()
    setSubmitting(true);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  };

}

export default useFormValidation;
