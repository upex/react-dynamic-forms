import React, { useState, useEffect } from "react";

function DynamicForms(props) {
  let [inputs, setInputs] = useState(props.model || []);
  useEffect(() => {
    console.log('props.model', inputs, props.model);
    setInputs(props.model);
  }, [props.model])

  const formUi = inputs.map((field) => {
    return (
    <div key={field.name}>
      <input
      onChange={props.onChange}
      onBlur={props.onBlur}
      name={field.name}
      value={props.values[field.name]}
      type={field.type}
      className={props.errors[field.name] && "error-input"}
      placeholder={field.placeholder}
    />
    { props.errors[field.name] && <p className="error-text">{props.errors[field.name]}</p> }
    </div>
  )
  });
  return (
    <>
    <h1>{props.title}</h1>
    <form onSubmit={props.onSubmit}>
    {formUi}
    <div>
      <button disabled={props.isSubmitting} type="submit">
        Submit
      </button>
    </div>
    </form>
    </>
  );
}
 export default DynamicForms;