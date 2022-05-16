const form = document.getElementById("registration-form");

const DEFAULTS = {
  patterns: {
    emailReg:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordReg: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
  },
  minLength: 0,
  maxLength: 300,
};

const checkEmail = (input) => {
  if (DEFAULTS.patterns.emailReg.test(input)) {
    return null;
  }
  return `Email is not Valid`;
};

const checkPassword = (input) => {
  if (DEFAULTS.patterns.passwordReg.test(input)) {
    return null;
  }
  return `Minimum six characters, at least one letter and one number`;
};

const checkPasswordsMatch = (confirmPassword, formValue) => {
  if (confirmPassword !== formValue.password) {
    return `Paswords does not match`;
  }
  return null;
};

const trimElementValue = (element) => {
  return element.value.trim();
};

const checkLength = (
  input,
  min = DEFAULTS.minLength,
  max = DEFAULTS.maxLength
) => {
  if (input.length <= min) {
    return `Text length must be more then ${min} symbols`;
  }

  if (input.length > max) {
    return `The max length of text is ${max}`;
  }

  return null;
};

const required = (value) => {
  if (value) {
    return null;
  }

  return "The value is required";
};

const REGISTER_VALIDATION = {
  username: [required, (value) => checkLength(value, 3, 20)],
  email: [required, checkEmail],
  password: [required, checkPassword],
  confirmPassword: [
    required,
    checkPasswordsMatch,
  ],
};

const getFormFields = (elements = []) => {
  const result = {};
  for (const item of elements) {
    if (item.name) {
      result[item.name] = trimElementValue(item);
    }
  }
  return result;
};

const validateLoginForm = (formFields, validationConfig) => {
  const result = {};
  Object.keys(formFields).forEach((key) => {
    const value = formFields[key];
    const validations = validationConfig[key];

    if (validations?.length) {
      for (const validationFn of validations) {
        const valResult = validationFn(value, formFields);

        if (valResult) {
          result[key] = valResult;
          break;
        }
      }
    }
  });

  return result;
};

const toEmptyErrorBoxes = () => {
  const messageInputs = document.getElementsByClassName("validation-message");
  
  for (const input of messageInputs) {
    input.innerText = '';
  }
};

const showValidation = (validationResult) => {
  const resultKeys = Object.keys(validationResult);
  for (const key of resultKeys) {
    const element = document.getElementById(key);
    element.parentElement
      .querySelector('.validation-message').innerText = validationResult[key];
  }
};

function handleSubmit(event) {
  event.preventDefault();
  const fieldModel = getFormFields(event.target.elements);
  const validationResult = validateLoginForm(fieldModel, REGISTER_VALIDATION);
  toEmptyErrorBoxes();
  showValidation(validationResult);
}

form.addEventListener("submit", handleSubmit);