import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Iuser } from 'src/app/Shared Classes and types/Iuser';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private userService:UsersService,private router: Router) { }
  ngOnInit(): void {}
  registerForm=this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(5)]],
    lastName:['',[Validators.required,Validators.minLength(5)]],
    userName:['',[Validators.required,Validators.minLength(5)]],
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
  get img()
  {
    return this.registerForm.get('img');
  }
token='';

submit()
{  
    var user: Iuser = {
    userName: this.userName?.value,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    password:this.password?.value,
    email:this.email?.value,
    role:this.role?.value,
    gender:this.gender?.value,
    age:this.age?.value,
    img:this.img?.value
  }
  console.log(user)
  this.userService.Register(user).subscribe(
    data => {
      this.token=data['token'];
      console.log(this.token);
      localStorage.setItem('token',this.token)
      this.router.navigateByUrl("/home")
    },
    error => {
      console.log(error)
    }
  );
   
}




}


  
  
