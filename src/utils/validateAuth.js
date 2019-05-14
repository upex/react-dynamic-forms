export default function validateAuth(model, values) {
  let errors = {};
  if (model && model.length) {
    model.forEach(item=> {
      if(item.rules && item.rules.length) {
        item.rules.forEach(rule=> {
          errors[item.key] = rule(values[item.key]);
        });
      }
    });
  }
  // Email Errors
  /* if (!values.email) {
    errors.email = "Required Email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  } */
  // Password Errors
  /* if (!values.password) {
    errors.password = "Required Password";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  } */
  console.log('errors=>', errors);
  return errors;
}
