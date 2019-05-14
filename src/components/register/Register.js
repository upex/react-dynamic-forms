/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
import DynamicForms from "../dynamicforms/DynamicForms";

function Register() {

  const [formModel, setFormModel] = useState([
      {
        key: 'email',
        type: 'email',
        placeholder: 'Enter email'
      },
      {
        key: 'password',
        type: 'password',
        placeholder: 'Enter password of minnimum 6 characters'
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
  const [INITIAL_STATE, setInitialState] = useState({gender: 'male'})
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
        setInitialState(tmpObj);
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
