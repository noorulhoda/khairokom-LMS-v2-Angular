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

import { timesChecker } from 'src/app/timesCheckerValidator';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  countries;cntry;
  user;userId;
chosenRoleId='';
rolesList=[];
dialCode;
countryName;
registerError="......";//error in duplicate userName or email(how can i get it from api to render in html ???)
  constructor(private cntryService:countryService,private fb:FormBuilder,private userService:UsersService,private roleService:RolesService,private router: Router) { }
  ngOnInit(): void {
    this.cntryService.getAllCountries().subscribe(
      data=>  this.countries=data
    );  
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
    teachedCourses:[[],[Validators.required]],
    time1:[''],
    time2:[''],
    time3:['']
  },{validators:[ConfirmPassword,timesChecker]});
  


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
 /*  get time1()
  {
    return this.registerForm.get('time1'); 
  }
  get time2()
  {
    return this.registerForm.get('time2'); 
  }
  get time3()
  {
    return this.registerForm.get('time3'); 
  } */
token='';

countryChanged(){
  this.cntryService.getCountryById(this.country?.value).subscribe(
    data=>
      {
      this.cntry=data[0]
      console.log(this.cntry)    
      this.dialCode=data[0]['dialCode']
      this.countryName=data[0]['name']
      console.log("dC :"+this.dialCode+"  name:"+this.countryName)
      console.log("-------------------------------------------------***************")
    }
      ); 
}

 submit()
{  
/*   this.roleService.findByRoleType(this.roles?.value).subscribe(
    data=>
    {
    this.chosenRoleId=data[0]._id
    //console.log(data)
      }
    ); */


/*     if(this.checkedTimes==0)
        this.userSuitableTimes=null; */
    
  

      /*this.cntryService.getCountryById("60bebc929106212df0897b17").subscribe(
        data=>
        {
        this.cntry=data[0]
        console.log("cntry"+this.cntry.name)      
        },
        err=>console.log(err)
        );*/
  

    //  this.whichChecked();
  //this.rolesList=[this.chosenRoleId];
   
    var user: Iuser = {
    userName: this.userName?.value,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    password:this.password?.value,
    email:this.email?.value,
    roles:["60b79235865a7e0ac79fdb85","60cb92b9fa458482f28b5cd8"],//teacher85,student86
    gender:this.gender?.value,
    birthDate:this.birthDate?.value,
    img:"newUser.jpg",
    phone:this.dialCode+this.phone?.value,
    country:this.countryName,
    joinedClasses:[],
    teachedCourses:[],
    verifiedTeacher:false,
    suitableTimes:[]//this.checkedTimes>0 ? this.userSuitableTimes:[]////////time Checker validator???
  }
  
  console.log(user)
  //console.log("value"+this.country.value)
  this.userService.Register(user).subscribe(
    data => {
      this.token=data['token'];
      console.log(this.token);
      localStorage.setItem('token',this.token)
      localStorage.setItem('currentUserName',this.userName?.value)
     
      this.registerError=data['msg'];
   
      this.router.navigateByUrl("/home")
  console.log(this.user)
 
}
    ,
    error => {
     // this.registerError=error;
      console.log(error)
    }
  );

}

private formatDate(date) {
  const d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  const year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
}
  d:Date;
  loadApiData()
  {
    this.d= new Date(1999,2,11);

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
      birthdate:this.formatDate(this.d),//formatDate(this.d, 'yyyy-MM-dd', 'en'),//this.formatDate(this.d),
      //joinedClasses:this.user.joinedClasses,
      //teachedCourses:this.user.teachedCourses,
      phone:"1223456789",
     //country:"أفغانستان",
     
    })
    console.log(this.birthDate);

  }

/*   userSuitableTimes=[];
  checkedTimes=0;
  noTimeChoosen=false;
  onChangeCheck(isChecked){
    if(isChecked){
    this.checkedTimes++;
    this.noTimeChoosen=false;
  }
    else{
    this.checkedTimes--;
    if(this.checkedTimes==0)this.noTimeChoosen=true;
  }
  }
  whichChecked(){
      if(this.time1.value==true)
      this.userSuitableTimes.push(8)
      if(this.time2.value==true)
      this.userSuitableTimes.push(15)
      if(this.time3.value==true)
      this.userSuitableTimes.push(20)     

  } */

}
