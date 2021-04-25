import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
export function ForbiddenNameValidator(regExpValue:RegExp)
{
    return (control:AbstractControl)=>
    {
        const forbidden =regExpValue.test(control.value);
        console.log(forbidden)
        return forbidden ? {'forbiddenName':{value:control.value}} :null;
    } 
}