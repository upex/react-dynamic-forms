import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';

function CheckboxField(props) {
    const checkboxes = props.options.map((o) => {
        let checked = false;
        if (props.values[props.uniquekey] && props.values[props.uniquekey].length > 0) {
            checked = props.values[props.uniquekey].indexOf(o.value) > -1 ? true : false;
        }
        return (
            <FormControlLabel
            key= { o.uniquekey }
            name= { o.uniquekey }
            control={
              <Checkbox
                checked={checked}
                onChange={
                    (e) => { props.handleChange(e, props.uniquekey, "multiple") }
                }
                value={ o.value }
                color={props.color || 'primary'}
                disabled= {props.disabled}
              />
            }
            label={ o.label }
          />
        );
    });

    function checkError() {
        if(props.errors[props.uniquekey]) return true;
        return false;
    }

    return (
        <>
            <FormLabel component="legend">{props.label}</FormLabel>
            <FormGroup row>
            {checkboxes}
            </FormGroup>
            {checkError() && <FormHelperText>
                    <span className="error-text">{props.errors[props.uniquekey]}</span>
                </FormHelperText>}
        </>
    );
}

export default React.memo(CheckboxField);