export default function validateAuth(model, values) {
  let errors = {};
  if (model && model.length) {
    model.forEach(item=> {
      if(item.rules && item.rules.length) {
        for (let key in item.rules) {
          const check = item.rules[key](values[item.uniquekey]);
          if (check && typeof check === 'string') {
            errors[item.uniquekey] = check;
            break;
          }
        }
      }
    });
  }
  return errors;
}
