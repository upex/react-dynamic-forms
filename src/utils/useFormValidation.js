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

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
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
