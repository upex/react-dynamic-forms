import React from "react";

function CheckboxField(props) {
    const checkboxes = props.options.map((o) => {
        let checked = false;
        if (props.values[props.uniquekey] && props.values[props.uniquekey].length > 0) {
            checked = props.values[props.uniquekey].indexOf(o.value) > -1 ? true : false;
        }
        return ( <div key = { props.uniquekey + o.uniquekey } >
            <input
            type= { props.type }
            key= { o.uniquekey }
            name= { o.uniquekey }
            checked= { checked }
            value= { o.value }
            onChange= {
                (e) => { props.handleChange(e, props.uniquekey, "multiple") }
            }
            /> <label> { o.label } </label>
            </div>
        );
    });
    return (
        <>
        {checkboxes}
        {props.errors[props.uniquekey] && <p className = "error-text" > { props.errors[props.uniquekey] } </p>}
        </>
    );
}

export default CheckboxField;