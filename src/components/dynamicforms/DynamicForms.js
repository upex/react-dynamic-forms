/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
/** Form fields */
import InputField from '../inputfield/InputField';
import TextAreaField from '../textareafield/TextareaField';
import RadioField from "../radiofield/RadioField";
import SelectField from "../selectfield/SelectField";
import CheckboxField from "../checkbox/CheckboxField";

function DynamicForms(props) {
    const [models, setModels] = useState(props.model || []);
    const [INITIAL_STATE, setInitialState] = useState(props.defaultValues || {})
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
    }, [props.model])

    useEffect(() => {
        let tmpvalues = {};
        if(props.defaultValues && Object.keys(props.defaultValues).length) {
            tmpvalues = props.defaultValues;
        } else {
            models.forEach(item=> {
                tmpvalues[item.uniquekey] = '';
            });
        }
        setInitialState({...INITIAL_STATE, ...tmpvalues});
    }, [props.defaultValues]);

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
            value={props.defaultValues[field.uniquekey]}
            { ...allProps }
            />

            if(field.type === "textarea") {
                input = <TextAreaField
                key={field.uniquekey}
                { ...allProps }
                />
            }
            if (field.type === "radio") {
                input = <RadioField
                key={field.uniquekey}
                { ...allProps }
                />
            }
            if (field.type === "select") {
                input = <SelectField
                key={field.uniquekey}
                { ...allProps }
                />
            }
            if (field.type === "checkbox") {
                input = <CheckboxField
                key={field.uniquekey}
                { ...allProps }
                />
            }

            return (
                <div key = {'g' + field.uniquekey}>
                { input }
                </div >
            )
        });
        return formUI;
    }

    return (
        <>
            <h1> { props.title } </h1> 
            <form onSubmit = { handleSubmit } noValidate autoComplete="off">
            { renderForm() }
            {
                props.children ? props.children : (<div>
                    <button disabled = { isSubmitting }
                    type = "submit">
                    Submit </button> </div>)
            }
            </form>
        </>
    );
}
export default DynamicForms;