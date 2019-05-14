import React, { useState, useEffect } from "react";

function DynamicForms(props) {
  const [models, setModels] = useState(props.model || []);
  const [values, setValues] = useState(props.values || {});
  useEffect(() => {
    setModels(props.model);
  }, [props.model])

  useEffect(() => {
    setValues(props.values);
  }, [props.values])

  const formUi = models.map((field) => {
    let input = <><input
        onChange={(e) => props.onChange(e, field.key, 'single')}
        onBlur={props.onBlur}
        name={field.key}
        value={values[field.key] ? values[field.key] : values[field.key] = ''}
        type={field.type}
        className={props.errors[field.key] && "error-input"}
        placeholder={field.placeholder}
      />
     { props.errors[field.key] && <p className="error-text">{props.errors[field.key]}</p> }</>
     if (field.type === "radio") {
      input = field.options.map((o) => {
           let checked = o.value === values[o.name];
           return (
               <div key={field.key+o.key}>
                   <input
                    className="form-input"
                    type={field.type}
                    key={o.key}
                    name={o.name}
                    checked={checked}
                    value={o.value}
                    onChange={(e)=>{props.onChange(e, o.name)}}
                   />
                   <label>{o.label}</label>
               </div>
           );
      });
      input = <div className ="form-group-radio">{input}</div>;
   }
   if (field.type === "select") {
        input = field.options.map((o) => {
            return (
              <option
                  className="form-input"
                  key={o.key}
                  value={o.value}
              >{o.value}</option>
            );
        });

        input = <select value={values[field.key] ? values[field.key] : values[field.key] = ''}
          onChange={(e)=>{props.onChange(e, field.key)}}>{input}</select>;
    }
    if (field.type === "checkbox") {
      input = field.options.map((o) => {
          
          //let checked = o.value == value;
          let checked = false;
          if (values[field.key] && values[field.key].length > 0) {
              checked = values[field.key].indexOf(o.value) > -1 ? true: false;
          }
           return (
              <React.Fragment key={"cfr" + o.key}>
                  <input
                      className="form-input"
                      type={field.type}
                      key={o.key}
                      name={o.key}
                      checked={checked}
                      value={o.value}
                      onChange={(e)=>{props.onChange(e, field.key, "multiple")}}
                  />
                  <label key={"ll" +o.key }>{o.label}</label>
              </React.Fragment>
           );
      });

      input = <div className ="form-group-checkbox">{input}</div>;

   }

    return (
          <div key={field.key}>
            {input}
          </div>
        )
  });
  return (
    <>
    <h1>{props.title}</h1>
    <form onSubmit={props.onSubmit}>
    {formUi}
    {props.children ? this.children : (<div>
      <button disabled={props.isSubmitting} type="submit">
        Submit
      </button>
    </div>)}
    </form>
    </>
  );
}
 export default DynamicForms;