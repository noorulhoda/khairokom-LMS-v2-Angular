import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from '../misMatch.validator';
import { ForbiddenNameValidator } from '../username.validatior';


@Component({
  selector: 'app-reactiveregister',
  templateUrl: './reactiveregister.component.html',
  styleUrls: ['./reactiveregister.component.scss']
})
export class ReactiveregisterComponent implements OnInit {

    constructor(private fb:FormBuilder) { }
    ngOnInit(): void {}
    registerForm=this.fb.group({
      userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
      password:[''],
      confirmPassword:[''],
      email:[''],
    },{validators:[ConfirmPassword]});
  
    get userName()
    {
      return this.registerForm.get('userName');
    }
    get email()
    {
      return this.registerForm.get('email');
    }

    loadApiData()
    {
      this.registerForm.patchValue({
        userName:'ITI',
        password:'123',
        confirmPassword:'123',
        email:'iti@gmail.com'
      })
    }
  }

  
  
