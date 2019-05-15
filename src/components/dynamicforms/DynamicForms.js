/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
import InputField from '../inputfield/InputField';

function DynamicForms(props) {
    const [models, setModels] = useState(props.model || []);
    const [INITIAL_STATE, setInitialState] = useState({})
    const {
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      errors,
      isSubmitting
    } = useFormValidation(INITIAL_STATE, validateAuth, props.registerUser, models);

    useEffect(() => {
        setModels(props.model);
        const tmpObj = {
            ...INITIAL_STATE
        }
        models.forEach(item=> {
            tmpObj[item.uniquekey] = '';
        });
        setInitialState({...tmpObj});
    }, [props.model])
     
    function renderForm() {
        const formUI = models.map((field) => {
                const allProps = {
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    ...field
                };
                let input = <InputField
                key={field.uniquekey}
                { ...allProps }
                field={field}/>
                    if (field.type === "radio") {
                        input = field.options.map((o) => {
                            let checked = o.value === values[o.name];
                            return ( <div key = { field.uniquekey + o.uniquekey } >
                                <input className = "form-input"
                                type = { field.type }
                                key = { o.uniquekey }
                                name = { o.name }
                                checked = { checked }
                                value = { o.value }
                                onChange = {
                                    (e) => { handleChange(e, field.uniquekey) }
                                }
                                /> <label> { o.label } </label> </div>
                            );
                        });
                        input = <div className = "form-group-radio" > { input } {
                            errors[field.uniquekey] && < p className = "error-text" > { errors[field.uniquekey] } </p> }</div> ;
                        }
                        if (field.type === "select") {
                            input = field.options.map((o) => {
                                return ( < option className = "form-input"
                                    key = { o.uniquekey }
                                    value = { o.value } > { o.value } </option>
                                );
                            });

                            input = <div > < select value = { values[field.uniquekey] ? values[field.uniquekey] : values[field.uniquekey] = '' }
                            onChange = {
                                    (e) => { handleChange(e, field.uniquekey) }
                                } >
                                <
                                option value = "" > Seletc { field.label } </option> { input } </select > {
                                    errors[field.uniquekey] && < p className = "error-text" > { errors[field.uniquekey] } </p >
                                } </div>

                        }
                        if (field.type === "checkbox") {
                            input = field.options.map((o) => {
                                let checked = false;
                                if (values[field.uniquekey] && values[field.uniquekey].length > 0) {
                                    checked = values[field.uniquekey].indexOf(o.value) > -1 ? true : false;
                                }
                                return ( < div key = { field.uniquekey + o.uniquekey } >
                                    <
                                    input className = "form-input"
                                    type = { field.type }
                                    key = { o.uniquekey }
                                    name = { o.uniquekey }
                                    checked = { checked }
                                    value = { o.value }
                                    onChange = {
                                        (e) => { handleChange(e, field.uniquekey, "multiple") }
                                    }
                                    /> <label> { o.label } </label > </div >
                                );
                            });
                            input = < div className = "form-group-checkbox" > { input } {
                                errors[field.uniquekey] && < p className = "error-text" > { errors[field.uniquekey] } </p> }</div > ;
                            }

                            return ( < div key = { 'g' + field.uniquekey }
                                className = "form-group" >
                                <
                                label className = "form-label"
                                key = { "l" + field.uniquekey }
                                htmlFor = { field.uniquekey } > { field.label } </label> { input } </div >
                            )
                        });
                return formUI;
            }

            return ( <>
                <h1> { props.title } </h1> 
                <form onSubmit = { handleSubmit } > { renderForm() } {
                    props.children ? props.children : (<div>
                        <button disabled = { isSubmitting }
                        type = "submit">
                        Submit </button> </div>)
                }</form> </>
            );
        }
        export default DynamicForms;