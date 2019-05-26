/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
/** Form fields */
import InputField from '../../components/inputfield/InputField';
import TextAreaField from '../../components/textareafield/TextareaField';
import RadioField from "../../components/radiofield/RadioField";
import SelectField from "../../components/selectfield/SelectField";
import CheckboxField from "../../components/checkbox/CheckboxField";
import SwitchInput from "../../components/switch/Switch";
import AutoComplete from "../../components/autocomplete/Autocomplete";
import ButtonComp from "../../components/button/Button";

const styles = theme => ({
    marginRight: {
        marginRight: 20,
    },
    padding: {
        padding: '20px 0 10px 0'
    },
    badge: {
        width: '100%',
        position: 'relative'
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
});

function DynamicForms(props) {
    const { classes } = props;
    const [models, setModels] = useState(props.model || []);
    const [mappedModel, setmappedModel] = useState(props.mappedModel || []);
    const [INITIAL_STATE, setInitialState] = useState({});
    const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isSubmitting,
        resetForm
      } = useFormValidation(INITIAL_STATE, validateAuth, props.event, models);

    useEffect(() => {
        setModels(props.model);
    }, [props.model])

    useEffect(() => {
        getInitialValues();
    }, [props.defaultValues]);

    useEffect(() => {
        showDynamicFields();
    }, [values])

    useEffect(() => {
        const uniqueSetMapped = getUnique(props.mappedModel, 'uniquekey');
        setmappedModel(uniqueSetMapped);
    }, [props.mappedModel])

    function getInitialValues() {
        let tmpvalues = {};
        if(props.defaultValues && Object.keys(props.defaultValues).length) {
            tmpvalues = props.defaultValues;
        } else {
            models.forEach(item=> {
                tmpvalues[item.uniquekey] = '';
            });
        }
        setInitialState({...tmpvalues});
    }

    function resetErrorForm(e) {
        getInitialValues();
        resetForm(e);
    }
    function showDynamicFields() {
        let originalModel = [...props.model];
        props.model.forEach(item=> {
            if(item.trigger && item.trigger.length) {
                if(values[item.uniquekey]) {
                    if(((item.type === 'select' && item.multiple) || item.type === 'checkbox') && values[item.uniquekey] && values[item.uniquekey].length) {
                        item.trigger.forEach(p=> {
                            const id = values[item.uniquekey].indexOf(p.value);
                            if(id !== -1 && p.fields && p.fields.length) {
                                originalModel = hiddenFieldProcess(originalModel, p.fields, item.uniquekey);
                            }
                        })
                    } else {
                        const findField = item.trigger.find(o => o.value === values[item.uniquekey]);
                        if(findField && findField.fields && findField.fields.length) {
                            originalModel = hiddenFieldProcess(originalModel,findField.fields,item.uniquekey);
                        }
                    }
                }
            }
        });
        setModels(originalModel);
    }
    function hiddenFieldProcess(arr, fields, value) {
        const index = arr.findIndex(i => i.uniquekey === value);
        const firstHalf = arr.slice(0, index + 1);
        const lastHalf = arr.slice(index + 1);
        const getMappedFields = mappedModel.filter(
            v => fields.includes(v.uniquekey));
        return [...firstHalf, ...getMappedFields, ...lastHalf];
    }
    function getUnique(arr, comp) {
        const unique = arr
             .map(e => e[comp])
           // store the keys of the unique objects
          .map((e, i, final) => final.indexOf(e) === i && i)
          // eliminate the dead keys & store unique objects
          .filter(e => arr[e]).map(e => arr[e]);
         return unique;
    }
    function renderForm() {
        const uniqueSetMapped = getUnique(models, 'uniquekey');
        const formUI = uniqueSetMapped.map((field) => {
            const allProps = {
                handleChange,
                handleBlur,
                values,
                errors,
                ...field
            };
            let input = <InputField
            key={field.uniquekey}
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
            if(field.type === "switch") {
                input = <SwitchInput
                key={field.uniquekey}
                { ...allProps }
                />
            }
            if(field.type === "autocomplete") {
                input = <AutoComplete
                key={field.uniquekey}
                { ...allProps }
                />
            }

            return (
                <Grid key={field.uniquekey} item
                xs={field.grid ? field.grid.xs : 12}
                sm={field.grid ? field.grid.xs : 6}>
                { input }
                </Grid>
            )
        });
        return formUI;
    }
    function checkError() {
        if(Object.keys(errors).length) return true;
        return false;
    }
    return (
        <>
            <form onSubmit = { handleSubmit } noValidate autoComplete="off">
                {props.title && <Grid
                        container
                        justify="center"
                        alignItems="center"
                        direction="row">
                        <Typography component="h1" variant="h5">
                        { props.title }
                        </Typography> 
                </Grid> }
                <Grid
                container
                spacing={props.spacing ?  props.spacing : 32}
                >
                { renderForm() }
                <Grid item xs={12}>
                    <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="row"
                    className={classes.padding}>
                    <ButtonComp
                    variant="contained"
                    color="default"
                    size="large"
                    onClick= { (e) => resetErrorForm(e) }
                    className={classes.marginRight}
                    label="Reset"
                    />
                    <Badge
                    color={Object.keys(errors).length ? 'secondary' : 'primary'}
                    badgeContent={Object.keys(errors).length ? Object.keys(errors).length : 0}>
                        {
                            props.children ? props.children : (<ButtonComp
                            size="large" 
                            color="primary"
                            disabled= { isSubmitting || checkError() }
                            type= "submit"
                            variant="contained"
                            label="Login"
                            show={true}
                            fullWidth={true}
                            />)
                        }
                       {props.loading && <CircularProgress
                        size={24}
                        className={classes.buttonProgress}/>}
                    </Badge>
                    </Grid>
                </Grid>
                </Grid>
            </form>
        </>
    );
}

DynamicForms.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DynamicForms);