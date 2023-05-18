import { AbstractControl } from "@angular/forms";

export const PasswordMatchValidator = (passwordFieldName: string, confirmPasswordFieldName: string) => {
    const validator = (form: AbstractControl)=> {
        const passwordControl = form.get(passwordFieldName);
        const confirmPasswordControl = form.get(confirmPasswordFieldName);
        if (!passwordControl || !confirmPasswordControl) {
            return
        }
        if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({noMatch: true});
        }else {
            const errors = confirmPasswordControl.errors;
            if (!errors) return;
            delete errors['noMatch'];
            confirmPasswordControl.setErrors({noMatch: true});
        }
    }
    return validator;
};