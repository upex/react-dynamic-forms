/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
import DynamicForms from "../dynamicforms/DynamicForms";

function Register() {

  const validateRules = {
    required: value => !!value || 'Required.',
    min: v => v.length >= 6 || 'Enter password of minnimum 6 characters'
  }

  const [formModel, setFormModel] = useState([
      {
        key: 'email',
        type: 'email',
        placeholder: 'Enter email',
        label: 'Email'
      },
      {
        key: 'password',
        type: 'password',
        placeholder: 'Enter password of minnimum 6 characters',
        label: 'Password',
        rules: [validateRules.required, validateRules.min]
      },
      {key: "gender",label: "Gender", type:"radio",options:[
        {key:"male",label:"Male",name:"gender",value:"male"},
        {key:"female",label:"Female",name: "gender",value:"female"}
      ]},
      {key: "city",label:"City", type:"select", value: "Kerala", options: [
        {key:"mumbai",label:"Mumbai",value:"Mumbai"},
        {key:"bangalore",label:"Bangalore",value:"Bangalore"},
        {key:"kerala",label:"Kerala",value:"Kerala"},
      ]},
      {key: "skills",label:"Skills", type:"checkbox", options: [
        {key:"reactjs",label:"ReactJS",value:"reactjs"},
        {key:"angular",label:"Angular",value:"angular"},
        {key:"vuejs",label:"VueJS",value:"vuejs"},
      ]}
    ]);
  const [INITIAL_STATE, setInitialState] = useState({})
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useFormValidation(INITIAL_STATE, validateAuth, registerUser, formModel);

  useEffect(() => {
    getPosts();
  }, [])

  function registerUser() {
    /** Call api */
    console.log('Authenticated=>', values);
  }

  function getPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const tmpModel = [...formModel]
        tmpModel.push(
          {
            key: 'username',
            type: 'username',
            placeholder: 'Enter username'
          }
        );
        setFormModel(tmpModel);
        const tmpObj = {
          ...INITIAL_STATE
        }
        tmpModel.forEach(item=> {
          tmpObj[item.key] = '';
        });
        setInitialState({...tmpObj});
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
      >
      <div>
        <button disabled={isSubmitting} type="submit">
            Submit children
        </button>
      </div>
      </DynamicForms>
    </div>
  );
}

export default Register;
