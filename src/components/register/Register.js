/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DynamicForms from "../dynamicforms/DynamicForms";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

function Register() {
  const validateRules = {
    required: value => !!value || 'Required.',
    min: v => (v && v.length >= 6) || 'Enter password of minnimum 6 characters',
    emailValidate: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || 'Invalid email address'
  }
  const [defaultValues, setDefaultValues] = useState({city: ['Mumbai']})
  const [formModel, setFormModel] = useState([
      {
        uniquekey: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        rules: [validateRules.required, validateRules.emailValidate],
        helperText: 'Example helper text'
      },
      {
        uniquekey: 'notes',
        type: 'textarea',
        placeholder: 'Enter notes',
        label: 'Notes',
        rules: [validateRules.required]
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
      {uniquekey: "city",label:"City", multiple:true, type:"select", options: [
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
            placeholder: 'Enter username here',
            label: "Username"
          }
        );
        setFormModel(tmpModel);
        setDefaultValues({...defaultValues, skills: ['reactjs'], email: 'upen@gmail.com', gender: 'male', username: 'alien'});
      });
  };
  return (
      <Card>
        <CardContent>
          <DynamicForms
          title="Register Here"
          model={ formModel }
          defaultValues= { defaultValues }
          event={ registerUser }
          />
        </CardContent>
      </Card>
  );
}

export default Register;
