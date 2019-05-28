import React from "react";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormHelperText from '@material-ui/core/FormHelperText';

function SwitchInput(props) {
    const switchoption = <FormControlLabel
                        control={
                        <Switch
                            checked={props.values[props.uniquekey] === props.value}
                            onChange={
                                (e) => { props.handleChange(e, props.uniquekey, 'switch') }
                            }
                            value={props.value}
                            color={props.color || 'primary'}
                            disabled={props.disabled}
                        />
                        }
                        label={props.label}
                    />;

    function checkError() {
        if(props.errors[props.uniquekey]) return true;
        return false;
    }

    return (
        <>
            <FormGroup row>
            {switchoption}
            </FormGroup>
            {checkError() && <FormHelperText>
                    <span className="error-text">{props.errors[props.uniquekey]}</span>
                </FormHelperText>}
        </>
    );
}

export default React.memo(SwitchInput);