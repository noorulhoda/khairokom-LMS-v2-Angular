import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { countryService } from 'src/app/services/country.service';
import { Icountry } from 'src/app/shared/Icountry';
import { Iuser } from 'src/app/shared/Iuser';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  countries:Observable<Icountry[]>;
  constructor(private cntryService:countryService,private fb:FormBuilder,private userService:UsersService,private roleService:RolesService,private router: Router) { }
  ngOnInit(): void {
   this.countries=this.cntryService.getAllCountries();
  }

  registerForm=this.fb.group({
    firstName:['',[Validators.required,Validators.minLength(5)]],
    lastName:['',[Validators.required,Validators.minLength(5)]],
    userName:['',[Validators.required,Validators.minLength(5)]],
    password:['',[Validators.required,Validators.minLength(8)]],
    confirmPassword:['',[Validators.required]],
    email:['',[Validators.required]],
    roles:[[],[Validators.required]],
    gender:['',[Validators.required]],
    birthDate:[,[Validators.required]],
    phone:['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)]],
    country:['',[Validators.required]],
    img:['',[Validators.required]],
    joinedClasses:[[],[Validators.required]],
    teachedCourses:[[],[Validators.required]]
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

  get phone()
  {
    return this.registerForm.get('phone');
  }
  get country()
  {
    return this.registerForm.get('country');
  }
token='';



chosenRoleId='';
rolesList=[];
dialCode;
submit()
{  
/*   this.roleService.findByRoleType(this.roles?.value).subscribe(
    data=>
    {
    this.chosenRoleId=data[0]._id
    //console.log(data)
      }
    ); */
  this.rolesList=[this.chosenRoleId];
   
    var user: Iuser = {
    userName: this.userName?.value,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    password:this.password?.value,
    email:this.email?.value,
    roles:["60b79235865a7e0ac79fdb85","60b792b0865a7e0ac79fdb86"],//teacher85,student86
    gender:this.gender?.value,
    birthDate:this.birthDate?.value,
    img:"newUser.jpg",
    phone:this.cntryService.getCountryByName(this.country?.value.name)+this.phone?.value,
    country:this.country?.value
    //joinedClasses:this.joinedClasses?.value,
    //teachedCourses:this.teachedCourses?.value
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

  d= new Date(1999,2,11);
  loadApiData()
  {
   
  
      this.registerForm.patchValue({
      firstName:"ahmad",
      lastName:"aliiiiii",
      userName:"AhmadAli",
      password:"123456789",
      confirmPassword:"123456789",
      email:"n@n.com",
      gender:"Male",
      img:"image",
      //roles:"Student",
      birthdate:this.d,
      //joinedClasses:this.user.joinedClasses,
      //teachedCourses:this.user.teachedCourses,
      phone:"1223456789",
      country:"Egypt"
    })
  }



}
