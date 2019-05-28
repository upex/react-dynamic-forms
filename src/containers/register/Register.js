/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import DynamicForms from "../dynamicforms/DynamicForms";
import validateRules from '../../utils/validateRules';

function Register() {
  const {
    required,
    min,
    emailValidate
  } = validateRules();
  const [defaultValues, setDefaultValues] = useState({city: ['Mumbai']})
  const [mappedModel, setMappedModel] = useState([
    {
      uniquekey: 'switchmapped',
      type: 'text',
      label: 'Swicth label',
      placeholder: 'Enter your swicth',
      rules: [required, emailValidate]
    },
    {
      uniquekey: 'homeemail',
      type: 'email',
      label: 'On radio male check/ on mumbai select',
      placeholder: 'Enter your home email address',
      rules: [required, emailValidate]
    },
    {
      uniquekey: 'lifenotes',
      type: 'textarea',
      placeholder: 'Enter your life notes',
      label: 'On Gender female selection',
      rules: [required]
    },
    {
      uniquekey: 'angularfield',
      type: 'text',
      placeholder: 'On angular check',
      label: 'Angular check',
      rules: [required]
    },
    {
      uniquekey: 'checkbox1',
      type: 'text',
      placeholder: 'Bangalore',
      label: 'on Bangalore city selection',
      rules: [required]
    },
    {
      uniquekey: 'checkbox2',
      type: 'text',
      placeholder: 'reactjs selection',
      label: 'Checkbox reactjs',
      rules: [required]
    }
  ])
  const [formModel, setFormModel] = useState([
      {
        uniquekey: 'autokey',
        type: 'autocomplete',
        label: 'Autocomplete label',
        multiple: true,
        placeholder: 'Search your country here..',
        rules: [required],
        options: [
          { label: 'Afghanistan' },
          { label: 'Aland Islands' },
          { label: 'Albania' },
          { label: 'Algeria' },
          { label: 'American Samoa' },
          { label: 'Andorra' },
          { label: 'Angola' },
          { label: 'Anguilla' },
          { label: 'Antarctica' },
          { label: 'Antigua and Barbuda' },
          { label: 'Argentina' },
          { label: 'Armenia' },
          { label: 'Aruba' },
          { label: 'Australia' },
          { label: 'Austria' },
          { label: 'Azerbaijan' },
          { label: 'Bahamas' },
          { label: 'Bahrain' },
          { label: 'Bangladesh' },
          { label: 'Barbados' },
          { label: 'Belarus' },
          { label: 'Belgium' },
          { label: 'Belize' },
          { label: 'Benin' },
          { label: 'Bermuda' },
          { label: 'Bhutan' },
          { label: 'Bolivia, Plurinational State of' },
          { label: 'Bonaire, Sint Eustatius and Saba' },
          { label: 'Bosnia and Herzegovina' },
          { label: 'Botswana' },
          { label: 'Bouvet Island' },
          { label: 'Brazil' },
          { label: 'British Indian Ocean Territory' },
          { label: 'Brunei Darussalam' },
        ].map(suggestion => ({
          label: suggestion.label,
          value: suggestion.label,
        }))
      },
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
        rules: [required, emailValidate]
      },
      {
        uniquekey: 'notes',
        type: 'textarea',
        placeholder: 'Enter notes',
        label: 'Notes',
        rules: [required]
      },
      {
        uniquekey: 'password',
        type: 'password',
        placeholder: 'Enter password of minnimum 6 characters',
        label: 'Password',
        rules: [required, min]
      },
      {uniquekey: "gender",label: "Gender", type:"radio",options:[
        {uniquekey:"male",label:"Male",name:"gender",value:"male"},
        {uniquekey:"female",label:"Female",name: "gender",value:"female"},
      ],
      rules: [required],
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
      rules: [required],
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
      rules: [required],
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
      buttonSetting= {
        {
          showReset: true,
          resetLabel: 'Clear',
          showSubmit: true,
          submitLabel: 'Register'
        }
      }
      model={ formModel }
      mappedModel = { mappedModel }
      defaultValues= { defaultValues }
      event={ registerUser }
      />
      </CardContent>
    </Card>
    </Grid>
  );
}

export default Register;