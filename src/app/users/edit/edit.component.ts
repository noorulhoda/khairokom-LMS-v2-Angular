import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../Shared Classes and types/Iuser'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  user:Iuser;
  id:string;
  errMsg='';
   constructor(private fb:FormBuilder,private userservice:UsersService,private route:ActivatedRoute,private router:Router) {
  ngOnInit(): void {}
  registerForm=this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(5)]],
    lastName:['',[Validators.required,Validators.minLength(5)]],
    userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:[''],
    email:[''],
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


   
  loadApiData()
  {
    this.registerForm.patchValue({
      firstName:'n',
      lastName:'k',
      userName:'ITI',
      password:'123',
      confirmPassword:'123',
      email:'iti@gmail.com'
    })
  }

}
