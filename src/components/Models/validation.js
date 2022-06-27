export const isValidObjField = (obj) => {
  return Object.values(obj).every((value) => value.trim());
};

export const updateError = (error, stateUpdater) => {
  stateUpdater(error);
  setTimeout(() => {
    stateUpdater("");
  }, 5000);
};
export const updateWarning = (warning, stateUpdater) => {
  stateUpdater(warning);
  setTimeout(() => {
    stateUpdater("");
  }, 5000);
};

export const isValidEmail = (value) => {
  const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return regx.test(value);
};

export const isPassword = (value) => {
  const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return regx.test(value);
};