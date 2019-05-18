import React from "react";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

function InputField(props) {

    function checkError() {
        if(props.errors[props.uniquekey]) return true;
        return false;
    }

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
            error={ checkError() }
            label = { props.label }
            placeholder= {props.placeholder}
            className = { props.className }
            margin="normal"
            variant="outlined"
            fullWidth
            helperText={!checkError() && props.helperText}
            InputLabelProps={{
                shrink: true
            }}
            />
            {checkError() && <FormHelperText>
                <span className="error-text">{props.errors[props.uniquekey]}</span>
            </FormHelperText>}
         </>
    );
}

export default InputField;