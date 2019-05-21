/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import DynamicForms from "../dynamicforms/DynamicForms";
import ButtonComp from "../../components/button/Button";

function Register() {
  const validateRules = {
    required: value => !!value || 'Required.',
    min: v => (v && v.length >= 6) || 'Enter password of minnimum 6 characters',
    emailValidate: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || 'Invalid email address'
  }
  const [defaultValues, setDefaultValues] = useState({city: ['Mumbai']})
  const [mappedModel, setMappedModel] = useState([
    {
      uniquekey: 'switchmapped',
      type: 'text',
      label: 'Swicth label',
      placeholder: 'Enter your swicth',
      rules: [validateRules.required, validateRules.emailValidate]
    },
    {
      uniquekey: 'homeemail',
      type: 'email',
      label: 'On radio male check/ on mumbai select',
      placeholder: 'Enter your home email address',
      rules: [validateRules.required, validateRules.emailValidate]
    },
    {
      uniquekey: 'lifenotes',
      type: 'textarea',
      placeholder: 'Enter your life notes',
      label: 'On Gender female selection',
      rules: [validateRules.required]
    },
    {
      uniquekey: 'angularfield',
      type: 'text',
      placeholder: 'On angular check',
      label: 'Angular check',
      rules: [validateRules.required]
    },
    {
      uniquekey: 'checkbox1',
      type: 'text',
      placeholder: 'Bangalore',
      label: 'on Bangalore city selection',
      rules: [validateRules.required]
    },
    {
      uniquekey: 'checkbox2',
      type: 'text',
      placeholder: 'reactjs selection',
      label: 'Checkbox reactjs',
      rules: [validateRules.required]
    }
  ])
  const [formModel, setFormModel] = useState([
      {
        uniquekey: 'switchkey',
        type: 'switch',
        label: 'Switch label',
        value: 'myValue',
        rules: [],
        trigger: [{
          value: 'myValue',
          fields: ['switchmapped']
        }]
      },
      {
        uniquekey: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Enter your email address',
        rules: [validateRules.required, validateRules.emailValidate]
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
      rules: [validateRules.required],
      trigger: [{
          value: 'male',
          fields: ['homeemail']
        }, {
          value: 'female',
          fields: ['lifenotes']
        }]
      },
      {uniquekey: "city",label:"City", multiple: true, type:"select", options: [
        {uniquekey:"mumbai",label:"Mumbai",value:"Mumbai"},
        {uniquekey:"bangalore",label:"Bangalore",value:"Bangalore"},
        {uniquekey:"kerala",label:"Kerala",value:"Kerala"},
      ],
      rules: [validateRules.required],
      trigger: [{
        value: 'Mumbai',
        fields: ['homeemail']
      }, {
        value: 'Bangalore',
        fields: ['checkbox1']
      }]
    },
    {uniquekey: "skills",label:"Skills", type:"checkbox", options: [
        {uniquekey:"reactjs",label:"ReactJS",value:"reactjs"},
        {uniquekey:"angular",label:"Angular",value:"angular"},
        {uniquekey:"vuejs",label:"VueJS",value:"vuejs"},
      ], 
      rules: [validateRules.required],
      trigger: [{
        value: 'reactjs',
        fields: ['checkbox2']
      },
      {
        value: 'angular',
        fields: ['angularfield']
      }]
    }
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
        setDefaultValues({...defaultValues, skills: ['reactjs'], email: 'upen@gmail.com', gender: 'female', username: 'alien'});
        const tmpMappedModel = [...mappedModel];
        tmpMappedModel.push(
          {
            uniquekey: 'test',
            type: 'text',
            placeholder: 'Enter test name'
          }
        );
        setMappedModel(tmpMappedModel);
      });
  };
  return (
    <Grid
    container
    justify="center"
    alignItems="center"
    direction="row">
    <Card>
      <CardContent>
      <DynamicForms
      title="Register Here"
      model={ formModel }
      mappedModel = { mappedModel }
      defaultValues= { defaultValues }
      event={ registerUser }
      >
      <ButtonComp
      size="large" 
      color="primary"
      type= "submit"
      variant="contained"
      label="Register"
      show={true}
      />
      </DynamicForms>
      </CardContent>
    </Card>
    </Grid>
  );
}

export default Register;