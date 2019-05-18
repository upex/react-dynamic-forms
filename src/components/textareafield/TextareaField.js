import React from "react";
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';

function TextareaField(props) {
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
            multiline
            rows="6"
            onBlur = { props.handleBlur }
            name = { props.uniquekey }
            value = { props.values[props.uniquekey] ? props.values[props.uniquekey] : props.values[props.uniquekey] = '' }
            error={ checkError() }
            className = { props.className }
            label={ props.label }
            placeholder = { props.placeholder }
            margin="normal"
            variant="outlined"
            helperText={!checkError() && props.helperText}
            fullWidth
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

export default TextareaField;