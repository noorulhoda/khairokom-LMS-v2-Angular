import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import * as moment from 'moment';
import { Observable } from 'rxjs';
import { countryService } from 'src/app/services/country.service';
import { UploadService } from 'src/app/services/upload.service';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../shared/Iuser'
@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent implements OnInit {
  chosenFiles: FileList;
  existingFile: File;
  progress = 0;
  msg = '';
  FileDetail: Observable<any>;
  fileName:string;
  countries;cntry;dialCode;
  countryName;
   constructor(private cntryService:countryService,private uploadService: UploadService,private fb:FormBuilder,private userservice:UsersService,private route:ActivatedRoute,private router:Router) {
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
  get joinedClasses()
  {
    return this.registerForm.get('joinedClasses');
  }
  get teachedCourses()
  {
    return this.registerForm.get('teachedCourses');
  }
  get password()
  {
    return this.registerForm.get('password');
  }
  get confirmPassword()
  {
    return this.registerForm.get('confirmPassword');
  }/*
  get roles()
  {
    return this.registerForm.get('roles');
  } */
  get birthDate()
  {
    return this.registerForm.get('birthDate');
  }
  get gender()
  {
    return this.registerForm.get('gender');
  }

  get phone()
  {
    return this.registerForm.get('phone');
  }
  get country()
  {
    return this.registerForm.get('country');
  }


  user:Iuser;
  id:string='defaultID';
  errMsg='errroor';

  
  loadApiData()
  {    var phonee:string=this.user.phone;
      this.registerForm.patchValue({
      firstName:this.user.firstName,
      lastName:this.user.lastName,
      userName:this.user.userName,
      password:this.user.password,
      confirmPassword:this.user.password,
      email:this.user.email,
      gender:this.user.gender,
      img:this.user.img,
      birthDate:this.formatDate(this.user.birthDate),
      joinedClasses:this.user.joinedClasses,
      teachedCourses:this.user.teachedCourses,
      phone:phonee.substr(-10,10),
      country:this.user.country
    })
    this.fileName=this.user.img;


  }

  ngOnInit(): void 
  {
    this.FileDetail = this.uploadService.getFiles();
  
      this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
      this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.id=params['id'] //log the value of id
      console.log('id : '+(this.id));

      this.cntryService.getAllCountries().subscribe(
        data=>  this.countries=data
      ); 
      
  });


  this.userservice.getUserById(this.id).subscribe(
   
      data => {this.user= data[0]; console.log(this.id);console.log(this.user);this.loadApiData()},
      er =>this.errMsg=er ,
    );
    console.log(this.user)
  }



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




  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
update()
{  
    var newuser: Iuser = {
    userName: this.userName?.value,
    firstName:this.firstName?.value,
    lastName:this.lastName?.value,
    password:this.user.password,
    email:this.email?.value,
    roles:this.user.roles,
    gender:this.gender?.value,
    birthDate:this.birthDate?.value,
    img:this.fileName,
    joinedClasses:this.joinedClasses?.value,
    teachedCourses:this.teachedCourses?.value,
    phone:this.dialCode+this.phone?.value,
    country:this.countryName,
    verifiedTeacher:false,
    suitableTimes:[]
  }
  console.log(newuser)
  
  this.userservice.updateUser(this.id,newuser)
  .subscribe(
    data => {
      console.log("Data: "+data);
      this.router.navigateByUrl("/home")
    },
    error => {
      console.log("errooorrrrr-_-"+ error)
    }
  );  
}










chooseFile(event): void {
  this.chosenFiles = event.target.files;
}

upload(): void {
  this.progress = 0;

  this.existingFile = this.chosenFiles.item(0);

  this.uploadService.uploadFile(this.existingFile).subscribe( (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.msg = event.body.message;
        this.FileDetail = this.uploadService.getFiles();
        this.fileName=this.existingFile.name;
      }
    }, (error) => {
      this.progress = 0;
      this.msg = 'Error occured while uploading file';
      this.existingFile = undefined;
    });

  this.chosenFiles = undefined;
}  






}



