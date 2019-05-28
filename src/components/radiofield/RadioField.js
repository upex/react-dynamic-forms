import React from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

function RadioField(props) {
    const radios = props.options.map((o) => {
        return (
            <FormControlLabel
                key={o.uniquekey}
                value={ o.value }
                control={<Radio disabled={props.disabled} color={props.disabled || 'primary'} />}
                label={o.label}
                labelPlacement="end"
            />
        );
    });

    function checkError() {
        if(props.errors[props.uniquekey]) return true;
        return false;
    }

    return (
        <>
        <FormControl component="fieldset">
            <FormLabel component="legend">{props.label}</FormLabel>
            <RadioGroup
            aria-label={props.label}
            name={props.uniquekey}
            value={ props.values[props.uniquekey] ? props.values[props.uniquekey] : props.values[props.uniquekey] = '' }
            onChange= {
                (e) => { props.handleChange(e, props.uniquekey) }
            }
            row
            >
            {radios}
            </RadioGroup>
        </FormControl>
        {checkError() && <FormHelperText>
                <span className="error-text">{props.errors[props.uniquekey]}</span>
            </FormHelperText>}
        </>
    );
}

export default React.memo(RadioField);