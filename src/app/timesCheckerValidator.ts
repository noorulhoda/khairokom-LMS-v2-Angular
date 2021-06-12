import { AbstractControl, FormGroup, ValidatorFn } from "@angular/forms";

export function timesChecker(control:AbstractControl)
{
   const time1 = control.get('time1');
   const time2 = control.get('time2');
   const time3 = control.get('time3');

   if(time1.value ||time2.value || time3.value)
   {
       return null;
   }
   else
   {
    return {msg:'choose a time'}
   }
}



/*
export function timesChecker (minRequired = 1): ValidatorFn 
{
    return function validate(formGroup: FormGroup) {
      let checked = 0
  
      Object.keys(['time1','time2','time3']).forEach(key => {
        const control = formGroup.controls[key]
  
        if (control.value) {
          checked++
        }
      })
  
      if (checked < minRequired) {
        return {
          requireCheckboxToBeChecked: true,
        }
      }
  
      return null
    }
  }*/