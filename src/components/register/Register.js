/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DynamicForms from "../dynamicforms/DynamicForms";

function Register() {

  const validateRules = {
    required: value => !!value || 'Required.',
    min: v => (v && v.length >= 6) || 'Enter password of minnimum 6 characters',
    emailValidate: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || 'Invalid email address'
  }

  const [formModel, setFormModel] = useState([
      {
        uniquekey: 'email',
        type: 'email',
        placeholder: 'Enter email',
        label: 'Email',
        rules: [validateRules.required, validateRules.emailValidate]
      },
      {
        uniquekey: 'password',
        type: 'password',
        placeholder: 'Enter password of minnimum 6 characters',
        label: 'Password',
        rules: [validateRules.required, validateRules.min]
      },
      {uniquekey: "gender",label: "Gender", type:"radio",options:[
        {uniquekey:"male",label:"Male",name:"gender",value:"male"},
        {uniquekey:"female",label:"Female",name: "gender",value:"female"},
      ],
      rules: [validateRules.required]
      },
      {uniquekey: "city",label:"City", type:"select", value: "Kerala", options: [
        {uniquekey:"mumbai",label:"Mumbai",value:"Mumbai"},
        {uniquekey:"bangalore",label:"Bangalore",value:"Bangalore"},
        {uniquekey:"kerala",label:"Kerala",value:"Kerala"},
      ],
      rules: [validateRules.required]
    },
      {uniquekey: "skills",label:"Skills", type:"checkbox", options: [
        {uniquekey:"reactjs",label:"ReactJS",value:"reactjs"},
        {uniquekey:"angular",label:"Angular",value:"angular"},
        {uniquekey:"vuejs",label:"VueJS",value:"vuejs"},
      ], rules: [validateRules.required]}
    ]);
  useEffect(() => {
    getPosts();
  }, [])

  function registerUser(values) {
    /** Call api */
    console.log('Authenticated=>', values);
  }

  function getPosts() {
      fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(json => {
        const tmpModel = [...formModel];
        tmpModel.push(
          {
            uniquekey: 'username',
            type: 'text',
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
      registerUser={registerUser}
      />
    </div>
  );
}

export default Register;
