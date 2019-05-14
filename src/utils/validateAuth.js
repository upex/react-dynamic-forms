export default function validateAuth(model, values) {
  let errors = {};
  if (model && model.length) {
    model.forEach(item=> {
      if(item.rules && item.rules.length) {
        for (let key in item.rules) {
          const check = item.rules[key](values[item.key]);
          if (check && typeof check === 'string') {
            errors[item.key] = check;
            break;
          }
        }
      }
    });
  }
  return errors;
}
