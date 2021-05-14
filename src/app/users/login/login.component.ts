import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Iuser } from 'src/app/Shared Classes and types/Iuser';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private userService:UsersService,private router: Router) { }
  ngOnInit(): void {}
  loginForm=this.fb.group({
    userName:['',[Validators.required,Validators.minLength(5),ForbiddenNameValidator(/admin/)]],
    password:['',[Validators.required,Validators.minLength(8)]],  
  });

  get userName()
  {
    return this.loginForm.get('userName');
  }

  get password()
  {
    return this.loginForm.get('password');
  }

  token='';

submit()
{  
  console.log('submitted')
  var user: any = {
    userName: this.userName?.value,
    password:this.password?.value,
    grant_type:'password',
  }
  
  this.userService.Login(user).subscribe(
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
