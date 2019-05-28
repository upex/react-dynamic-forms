/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

function SelectField(props) {

    const options = props.options.map((o) => {
        let selectOptopn = o.value
        if (props.multiple) {
            selectOptopn = <><Checkbox color="primary" checked={props.values[props.uniquekey] ? props.values[props.uniquekey].indexOf(o.value) > -1 : -1} />
            <ListItemText primary={o.value} /></>
        }
        return (
        <MenuItem
            key = { o.uniquekey }
            value = { o.value } >
                {selectOptopn}
            </MenuItem>
        );
    });

    function checkError() {
        if(props.errors[props.uniquekey]) return true;
        return false;
    }
    
    /* function handleSearch(e) {
        e.preventDefault();
        setQuery(e.target.value);
        let options = INIT_OPTIONS;
        let q = e && e.target.value ? e.target.value.toLowerCase() : '';
        options = options.filter((o) => {
          return o.label.toLowerCase().indexOf(q) !== -1;
        });
        setFilteredOptions(options);
    } */

    return (
        <>
        <FormControl fullWidth>
        <InputLabel htmlFor={props.uniquekey}> {props.label}</InputLabel>
        <Select
            disabled={props.disabled}
            multiple={props.multiple}
            value = { props.values[props.uniquekey]
                ? props.values[props.uniquekey] : props.values[props.uniquekey] = props.multiple ? [] : '' }
            onChange={
                (e) => { props.handleChange(e, props.uniquekey) }
            }
            input={<Input id={props.uniquekey} />}
            renderValue={selected => {
                if(props.multiple) {
                    return selected.join(', ');
                } else {
                    return selected;
                }
            }}
          >
          {!props.multiple && <MenuItem value="">None</MenuItem>}
          { options }
          </Select>
        </FormControl>
        {checkError() && <FormHelperText>
                <span className="error-text">{props.errors[props.uniquekey]}</span>
            </FormHelperText>}
        </>
    );
}

export default React.memo(SelectField);