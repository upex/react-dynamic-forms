import React from "react";

function SelectField(props) {
    const options = props.options.map((o) => {
        return ( < option className = "form-input"
            key = { o.uniquekey }
            value = { o.value } > { o.value } </option>
        );
    });
    return (
        <>
        <select
        value = { props.values[props.uniquekey] ? props[props.uniquekey] : props.values[props.uniquekey] = '' }
        onChange = {
            (e) => { props.handleChange(e, props.uniquekey) }
        }
        >
            <option value = "" > Select { props.label } </option>
            { options }
        </select>
        {props.errors[props.uniquekey] && < p className = "error-text" > { props.errors[props.uniquekey] } </p>}
        </>
    );
}

export default SelectField;