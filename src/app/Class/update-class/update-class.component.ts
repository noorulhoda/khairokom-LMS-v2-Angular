import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/shared/Iclass';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

  constructor(private fb:FormBuilder,private cs:categoryService,private route:ActivatedRoute,private router:Router) { }
  updateForm=this.fb.group({  
    Number:['',[Validators.required,Validators.minLength(5)]],
    StudentsMinAge:['',[Validators.required,Validators.minLength(5)]],
    StudentsMaxAge:['',[Validators.required,Validators.minLength(5)]],
    StudentGender:['',[Validators.required,Validators.minLength(5)]],
    ClassLink:['',[Validators.required,Validators.minLength(5)]],
    ClassLinkPassword:['',[Validators.required,Validators.minLength(5)]],
    StartDate:[''],
    EndDate:[''],
    CourseId:[''],
    TeacherId:[''],
    Students:['']
  });
  get Number()
   {
     return this.updateForm.get('Number');
   }
   get StudentsMinAge()
   {
     return this.updateForm.get('StudentsMinAge');
   }

   get StudentsMaxAge()
   {
     return this.updateForm.get('StudentsMaxAge');
   }
   get StudentGender()
   {
     return this.updateForm.get('StudentGender');
   }
   get ClassLink()
   {
     return this.updateForm.get('ClassLink');
   }
   get ClassLinkPassword()
   {
     return this.updateForm.get('ClassLinkPassword');
   }
   get StartDate()
   {
     return this.updateForm.get('StartDate');
   }
   get EndDate()
   {
     return this.updateForm.get('EndDate');
   }
   get CourseId()
   {
     return this.updateForm.get('CourseId');
   }
   get TeacherId()
   {
     return this.updateForm.get('TeacherId');
   }
   get Students()
   {
     return this.updateForm.get('Students');
   }

   clas:Iclass;
   id:string='defaultID';
   errMsg='errroor';
   
   
   loadApiData()
   {
       this.updateForm.patchValue({
    
       Number:this.clas.Number,
       StudentsMinAge:this.clas.StudentsMinAge,
       StudentsMaxAge:this.clas.StudentsMaxAge,
       StudentGender:this.clas.StudentGender,
       ClassLink:this.clas.ClassLink,
       ClassLinkPassword:this.clas.ClassLinkPassword,
       StartDate:this.clas.StartDate,
       EndDate:this.clas.EndDate,
       CourseId:this.CourseId?.value,
       TeacherId:this.TeacherId?.value,
       Students:this.Students?.value
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
   
   
   this.cs.getClassById(this.id).subscribe(
    
       data => {this.clas= data[0]; console.log(this.id);console.log(this.clas);this.loadApiData()},
       er =>this.errMsg=er ,
     );
     console.log(this.clas)
   }
   
   update()
   {  
     var newclass: Iclass = {
      Number:this.Number?.value,
      StudentsMinAge:this.StudentsMinAge?.value,
      StudentsMaxAge:this.StudentsMaxAge?.value,
      StudentGender:this.StudentGender?.value,
      ClassLink:this.ClassLink?.value,
      ClassLinkPassword:this.ClassLinkPassword?.value,
      StartDate:this.StartDate?.value,
      EndDate:this.EndDate?.value,
      CourseId:this.CourseId?.value,
      TeacherId:this.TeacherId?.value,
      Students:this.Students?.value
     
   }
   console.log(newclass)
   
   this.cs.updateClass(this.id,newclass)
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
   
   
   
   