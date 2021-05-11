import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../Shared Classes and types/Iuser'
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
 

   constructor(private fb:FormBuilder,private userservice:UsersService,private route:ActivatedRoute,private router:Router) {
   }
    
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
    });
  
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
 /*  get password()
  {
    return this.registerForm.get('password');
  }
  get confirmPassword()
  {
    return this.registerForm.get('confirmPassword');
  }
  get role()
  {
    return this.registerForm.get('role');
  } */
  get age()
  {
    return this.registerForm.get('age');
  }
  get gender()
  {
    return this.registerForm.get('gender');
  }

  get img()
  {
    return this.registerForm.get('img');
  }


  user:Iuser;
  id:string='defaultID';
  errMsg='errroor';

  
  loadApiData()
  {
      this.registerForm.patchValue({
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      userName:this.user.userName,
      //password:this.user.password,
      //confirmPassword:this.user.password,
      email:this.user.email,
      gender:this.user.gender,
      img:this.user.img,
      age:this.user.age
    })
  }

  ngOnInit(): void 
  {
      this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
      this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.id=params['id'] //log the value of id
      console.log('id : '+(this.id));
      
  });


  this.userservice.getUserById(this.id).subscribe(
   
      data => {this.user= data[0]; console.log(this.id);console.log(this.user);this.loadApiData()},
      er =>this.errMsg=er ,
    );
    console.log(this.user)
  }

update()
{  
    var newuser: Iuser = {
    userName: this.userName?.value,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    password:this.user.password,
    email:this.email?.value,
    role:this.user.role,
    gender:this.gender?.value,
    age:this.age?.value,
    img:this.img?.value
  }
  console.log(newuser)
  
  this.userservice.updateUser(this.id,newuser)
  .subscribe(
    data => {
      console.log("DATA : "+data);
      this.router.navigateByUrl("/home")
    },
    error => {
      console.log("errooorrrrr-_-"+ error)
    }
  );  
}


}



