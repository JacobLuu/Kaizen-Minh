const validation = {
  required_field: 'This field is required, please fill in',
  required_reviewer_field: 'Please select a reviewer to review the risk assessment',
  field_max_length: 'This field must not exceed 255 characters, please try again',
  invalid_date_format: 'Invalid date format',
  invalid_email: 'Invalid email address',
  invalid_email_length: 'Email must not exceed 255 characters, please try again.',
  email_required: 'Invalid email address',
  password_required: 'Password is required, please fill in.',
  field_first_name_max_length: 'First name must not exceed 255 characters, please try again',
  field_last_name_max_length: 'Last name must not exceed 255 characters, please try again',
  field_password_format: 'Wrong password format',
  invalid_password: 'Your passwords do not match. Please try again.',
  field_company_name_max_length: 'Company name must not exceed 255 characters, please try again',
  invalid_terms_of_service: 'Please read and agree to the Terms of Service if you want to proceed',
  invalid_restore_default: 'Are you sure you want to restore all detail labels to their default names?',
  valid_password_rule: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$&+,:;=?@#|'<>.\-^*()%!]).{8,30}$/,
  field_limit_length: 'The comment must contain more than 50 characters',
  nationalities_limit_length: 'Please select 2 nationalities for the individual',
  reviewer_user_field: 'Please select a reviewer to review the risk assessment. Please note that you cannot select yourself',
  field_password_rules: 'Your password must be alphanumeric and consist of at least 1 capital letter, a special character (@, $, !, &, etc) and be greater than 8 characters.'
};

export default validation;
