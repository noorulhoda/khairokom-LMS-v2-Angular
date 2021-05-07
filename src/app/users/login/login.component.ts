import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  ngOnInit(): void {}
  loginForm=this.fb.group({
    userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
    password:['',[Validators.required,Validators.minLength(8)]],  
  },{validators:[ConfirmPassword]});

  get userName()
  {
    return this.loginForm.get('userName');
  }

  get password()
  {
    return this.loginForm.get('password');
  }

}


  
  
