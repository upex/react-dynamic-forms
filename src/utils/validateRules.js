export default function validateRules() {
  const validate = {
    required: value => !!value || 'Required.',
    min: v => (v && v.length >= 6) || 'Enter password of minnimum 6 characters',
    emailValidate: v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || 'Invalid email address'
  }
  return validate
}