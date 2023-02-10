const emailRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9+_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

const REQUIRED_VALIDATION_RULES = {
  required: true,
}
const EMAIL_VALIDATION_RULES = {
  required: true,
  maxLength: 255,
  pattern: emailRegex,
};

const MAX_80_CHARACTERS_VALIDATION_RULES = {
  required: true,
  maxLength: 80,
  validate: (value: string) => {
    return value.trim() !== '';
  }
}

const TRIMMED_VALIDATION_RULES = {
  required: true,
  validate: (value: string) => {
    return value.trim() !== '';
  }
}

export {
  REQUIRED_VALIDATION_RULES,
  MAX_80_CHARACTERS_VALIDATION_RULES,
  TRIMMED_VALIDATION_RULES,
  EMAIL_VALIDATION_RULES
}