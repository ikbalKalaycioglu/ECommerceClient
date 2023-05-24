import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function CheckPasswords(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const password = control.get("password").value
        const passwordConfirm = control.get("passwordConfirm").value

        return password != passwordConfirm ? null : { notSame: true }
    }
} 
