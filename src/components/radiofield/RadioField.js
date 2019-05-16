import React from "react";

function RadioField(props) {
    const radios = props.options.map((o) => {
        let checked = o.value === props.values[o.name];
        return ( <div key = { props.uniquekey + o.uniquekey } >
            <input className = "form-input"
            type = { props.type }
            key = { o.uniquekey }
            name = { o.name }
            checked = { checked }
            value = { o.value }
            onChange = {
                (e) => { props.handleChange(e, props.uniquekey) }
            }
            /> <label> { o.label } </label> </div>
        );
    });
    return (
        <>
        {radios}
        {props.errors[props.uniquekey] && < p className = "error-text" > { props.errors[props.uniquekey] } </p>}
        </>
    );
}

export default RadioField;