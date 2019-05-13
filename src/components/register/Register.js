/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
import DynamicForms from "../dynamicforms/DynamicForms";

function Register() {

  const [formModel, setFormModel] = useState([
      {
        name: 'email',
        type: 'email',
        placeholder: 'Enter email'
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Enter password of minnimum 6 characters'
      }
    ]);
  const INITIAL_STATE = {};
  formModel.forEach(item=> {
    INITIAL_STATE[item.name] = '';
  });
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, registerUser);

  useEffect(() => {
    getPosts();
  }, [])

  function registerUser() {
    const { email, password } = values;
    /** Call api */
    console.log('Authenticated=>', email, password);
  }

  function getPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const tmpModel = [...formModel]
        tmpModel.push(
          {
            name: 'username',
            type: 'username',
            placeholder: 'Enter username'
          }
        );
        setFormModel(tmpModel);
      });
  };

  return (
    <div className="container">
      <DynamicForms
      title="Register Here"
      model={formModel}
      values={values}
      onChange={handleChange}
      onBlur={handleBlur}
      errors={errors}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default Register;
