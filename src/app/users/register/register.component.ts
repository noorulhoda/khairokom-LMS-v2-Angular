import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Iuser } from 'src/app/shared/Iuser';
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
    roles:[[]],
    gender:[''],
    age:[''],
    img:[''],
    // joinedClasses:[''],
    // teachedCourses:['']
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
  get birthDate()
  {
    return this.registerForm.get('birthDate');
  }
  get gender()
  {
    return this.registerForm.get('gender');
  }

  get roles()
  {
    return this.registerForm.get('role');
  }
  get img()
  {
    return this.registerForm.get('img');
  }

  get phone()
  {
    return this.registerForm.get('phone');
  }
  get country()
  {
    return this.registerForm.get('country');
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
    roles:this.roles?.value,
    gender:this.gender?.value,
    birthDate:this.birthDate?.value,
    img:this.img?.value,
    phone:this.phone?.value,
    country:this.country?.value
    // joinedClasses:this.joinedClasses?.value,
    // teachedCourses:this.teachedCourses?.value
  }
  console.log(user)
  this.userService.Register(user).subscribe(
    data => {
      this.token=data['token'];
      console.log(this.token);
      localStorage.setItem('token',this.token)
      localStorage.setItem('currentUser',this.userName?.value)
      this.router.navigateByUrl("/home")
    },
    error => {
      console.log(error)
    }
  );
   
}




}


  
  
