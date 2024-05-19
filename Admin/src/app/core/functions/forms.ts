import { AbstractControl, ValidationErrors } from '@angular/forms';

export function checkPasswords(
  group: AbstractControl,
  password = 'password',
  confirmPassword = 'passwordConfirmation'
): ValidationErrors | null {
  const passwordControl = group.get(password);
  const confirmPasswordControl = group.get(confirmPassword);

  if (!passwordControl || !confirmPasswordControl) {
    return null;
  }

  const pass = passwordControl.value;
  const confirmPass = confirmPasswordControl.value;

  if (pass !== confirmPass) {
    confirmPasswordControl.setErrors({ notSame: true });
    return { notSame: true };
  } else {
    confirmPasswordControl.setErrors(null);
  }

  return null;
}
