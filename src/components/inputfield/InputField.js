import React from "react";
import TextField from '@material-ui/core/TextField';

function InputField(props) {
    return (
        <>
        <TextField
        onChange = {
            (e) => props.handleChange(e, props.uniquekey, 'single')
        }
        onBlur = { props.handleBlur }
        name = { props.uniquekey }
        value = { props.values[props.uniquekey] ? props.values[props.uniquekey] : props.values[props.uniquekey] = '' }
        type = { props.type }
        error
        label = { props.label }
        placeholder= {props.placeholder}
        margin="normal"
        variant="outlined"
        fullWidth
        InputLabelProps={{
            shrink: true
        }}
        />{props.errors[props.uniquekey] && < p className = "error-text" > { props.errors[props.uniquekey] } </p>}
        </>
    );
}

export default InputField;