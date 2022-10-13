import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function  NumbersOnly(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[0-9]*$');
      const valid = regex.test(control.value);
      return !valid ? { NaN: true } : null;
    };
  }

 export function PatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { invalidPassword: false };
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? { invalidPassword: false } : { invalidPassword: true };
    };
  }

export function MatchPassword(password: string, confirmPassword: string) {
   
    return (formGroup: FormGroup):any => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors?.['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

export function StrongPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

        const value = control.value;

        if (!value) {
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasNumeric = /[0-9]+/.test(value);

        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? {passwordStrength:true}: null;
    }
}
export function LessOrGreaterThan(ctrl: string, ctr2: string) : any {
   
  return (formGroup: FormGroup):any => {

    const control1 = formGroup.controls[ctrl];
    const control2 = formGroup.controls[ctr2];

    if (!control1 || !control2) {
      return null;
    }
    if (control2.errors && !control2.errors?.['LessThan']) {
      return null;
    }
    let val1 = control1?.value as number;
    let val2 = control2?.value as number;
    if (+val1 >= +val2) {
      control2.setErrors({ LessThan: true });
    } else {
      control2.setErrors(null);
    }
  }
}
export function userNameValidator(userControl: AbstractControl) {
    // return new Promise(resolve => {
    //   setTimeout(() => {
    //     if (this.validateUserName(userControl.value)) {
    //       resolve({ userNameNotAvailable: true });
    //     } else {
    //       resolve(null);
    //     }
    //   }, 1000);
    // });
  }
