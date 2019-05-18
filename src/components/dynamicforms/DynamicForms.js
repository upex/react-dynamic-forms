/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import useFormValidation from "../../utils/useFormValidation";
import validateAuth from "../../utils/validateAuth";
/** Form fields */
import InputField from '../inputfield/InputField';
import TextAreaField from '../textareafield/TextareaField';
import RadioField from "../radiofield/RadioField";
import SelectField from "../selectfield/SelectField";
import CheckboxField from "../checkbox/CheckboxField";
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    margin: {
        margin: 10,
    },
    padding: {
        padding: '20px 20px 20px 0'
    }
});

function DynamicForms(props) {
    const { classes } = props;
    const [models, setModels] = useState(props.model || []);
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

    function renderForm() {
        const formUI = models.map((field) => {
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

            return (
                <Grid key={field.uniquekey} item xs={12} sm={6}>
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
                <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="row">
                    <h2> { props.title } </h2> 
                </Grid>
                <Grid
                container
                spacing={32}
                className={classes.padding}
                >
                { renderForm() }
                <Grid item xs={12}>
                <Divider/>
                    <Grid
                    container
                    justify="center"
                    alignItems="center"
                    direction="row"
                    className={classes.padding}>
                    <Button
                    variant="contained"
                    size="large"
                    onClick= { (e) => resetErrorForm(e) }
                    className={classes.margin}>
                    Reset
                    </Button>
                        {
                            props.children ? props.children : (<Badge
                                color={Object.keys(errors).length ? 'secondary' : 'primary'}
                                badgeContent={Object.keys(errors).length ? Object.keys(errors).length : 0}>
                                    <Button
                                    size="large" 
                                    color="primary"
                                    disabled= { isSubmitting || checkError() }
                                    type= "submit"
                                    variant="contained"
                                    className={classes.margin}
                                    >
                                    Submit
                                    </Button>
                                </Badge>)
                        }
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