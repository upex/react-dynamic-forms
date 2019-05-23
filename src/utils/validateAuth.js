export default function validateAuth(model, values) {
  let errors = {};
  let val = '';
  if (model && model.length) {
    model.forEach(item=> {
      if(item.rules && item.rules.length) {
        for (let key in item.rules) {
          val = values[item.uniquekey];
          if ((item.type === 'checkbox' || (item.type === 'autocomplete' && item.multiple) || (item.type === 'select' && item.multiple)) && values[item.uniquekey] && !values[item.uniquekey].length) {
            val = '';
          }
          const check = item.rules[key](val);
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
