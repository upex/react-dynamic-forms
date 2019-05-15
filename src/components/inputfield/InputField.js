import React from "react";

function InputField(props) {
    return (
        <>
        <input
        onChange = {
            (e) => props.handleChange(e, props.uniquekey, 'single')
        }
        onBlur = { props.handleBlur }
        name = { props.uniquekey }
        value = { props.values[props.uniquekey] ? props.values[props.uniquekey] : props.values[props.uniquekey] = '' }
        type = { props.type }
        className = { props.errors[props.uniquekey] && "error-input" }
        placeholder = { props.placeholder }
        />{props.errors[props.uniquekey] && < p className = "error-text" > { props.errors[props.uniquekey] } </p>}
        </>
    );
}

export default InputField;