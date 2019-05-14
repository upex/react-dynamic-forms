/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

function useFormValidation(initialState, validate, callback) {

  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        callback();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  function handleChange(event, name, type='single') {
    if (type === 'single') {
      setValues({
        ...values,
        [name]: event.target.value
      });
    } else {
      // Array of values (e.g. checkbox)
      let found = values[name] ?  
      values[name].find ((d) => d === event.target.value) : false; 
      if (found) {
          let data = values[name].filter((d) => {
              return d !== found;
          });
          setValues({
            ...values,
            [name]: data
          });
      } else {
          setValues({
            [name]: [event.target.value, ...values[name]]
          });
      }
    }
  }

  function handleErrors() {
    const validationErrors = validate(values);
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
