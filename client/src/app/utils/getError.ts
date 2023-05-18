import { AbstractControl, FormGroup } from "@angular/forms";

export class GetFormError {

    static getFormFieldData(fieldName: string, formControl: FormGroup): AbstractControl | null {
        return formControl.get(fieldName) || null;
      }

    static getErrorString(errors: any): string | null {
        if (errors?.required) return 'This field is required';
        if (errors?.email) return 'Please enter a valid email address';
        if (errors?.minlength) return 'This field must be at least ' + errors.minlength?.requiredLength;
        if (errors?.maxlength) return 'This field must be at most ' + errors.maxlength?.requiredLength;
        if (errors?.min) return 'This field must be greater than ' + errors.min;
        if (errors?.max) return 'This field must be less than ' + errors.max;
        if (errors?.noMatch) return 'Passwords do not match';
        return null;
      }
    
    static getFieldError(fieldName: string, formControl: FormGroup, isSubmitted?:boolean): string | null {
        const fieldData = GetFormError.getFormFieldData(fieldName, formControl);
        let hasError = false;
        if (fieldData) {
          hasError = (fieldData.dirty || fieldData.touched) && fieldData.invalid;
        }
        //fieldName === 'confirmPassword' && console.log(fieldData)
        return hasError || isSubmitted ? GetFormError.getErrorString(fieldData?.errors) : null;
      }
}