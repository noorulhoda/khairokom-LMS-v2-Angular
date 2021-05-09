import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {}
  registerForm=this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(5)]],
    lastName:['',[Validators.required,Validators.minLength(5)]],
    userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:[''],
    email:[''],
    role:[''],
    gender:[''],
    age:[''],
    img:[''],
  },{validators:[ConfirmPassword]});


  get firstName()
  {
    return this.registerForm.get('firstName');
  }
  get lastName()
  {
    return this.registerForm.get('lastName');
  }
  get userName()
  {
    return this.registerForm.get('userName');
  }
  get email()
  {
    return this.registerForm.get('email');
  }
  get password()
  {
    return this.registerForm.get('password');
  }
  get age()
  {
    return this.registerForm.get('age');
  }
  get gender()
  {
    return this.registerForm.get('gender');
  }

  get role()
  {
    return this.registerForm.get('role');
  }





}


  
  
