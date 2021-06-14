import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { classService } from 'src/app/services/class.service';
import { Router } from '@angular/router';
import { Iclass } from 'src/app/shared/Iclass';
import { courseService } from 'src/app/services/course.service';
import { UsersService } from 'src/app/services/users.service';
import { RolesService } from 'src/app/services/roles.service';
import { Iuser } from 'src/app/shared/Iuser';
import { Icourse } from 'src/app/shared/Icourse';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  courses;usersList;teachersList=[];teacherRole="60b79235865a7e0ac79fdb85";
  teacher:Iuser;course:Icourse;
  constructor(private roleService:RolesService,private userService:UsersService,private classservice:classService,private courseService:courseService,private fb:FormBuilder,private router:Router)
  {
    courseService.GetAllCourses().subscribe(
      data => {
        this.courses = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
     userService.GetAllusers().subscribe(
       data=>{
          this.usersList=data
          
          this.usersList.forEach(user => {
            if(user.roles.includes(this.teacherRole))
               this.teachersList.push(user);
          });
       }
     )
  
    } 
  ngOnInit(): void {
   
  }
  addForm=this.fb.group(
    {
    Number:['',[Validators.required]],
    StudentsMinAge:['',[Validators.required]],
    StudentsMaxAge:['',[Validators.required]],
    StudentGender:['',[Validators.required]],
    ClassLink:['',[Validators.required]],
    ClassLinkPassword:['',[Validators.required]],
    StartDate:['',[Validators.required]],
    EndDate:['',[Validators.required]],
    CourseId:['',[Validators.required]],
    TeacherId:[''],
    Students:[[],[Validators.required]]
   });

   get Number()
   {
     return this.addForm.get('Number');
   }
   get StudentsMinAge()
   {
     return this.addForm.get('StudentsMinAge');
   }

   get StudentsMaxAge()
   {
     return this.addForm.get('StudentsMaxAge');
   }
   get StudentGender()
   {
     return this.addForm.get('StudentGender');
   }
   get ClassLink()
   {
     return this.addForm.get('ClassLink');
   }
   get ClassLinkPassword()
   {
     return this.addForm.get('ClassLinkPassword');
   }
   get StartDate()
   {
     return this.addForm.get('StartDate');
   }
   get EndDate()
   {
     return this.addForm.get('EndDate');
   }
   get CourseId()
   {
     return this.addForm.get('CourseId');
   }
   get TeacherId()
   {
     return this.addForm.get('TeacherId');
   }
   get Students()
   {
     return this.addForm.get('Students');
   }
  submit() 
  {
    var clas:Iclass={ 
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
    console.log(clas)
    console.log(this.teachersList);
    this.classservice.AddClass(clas).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
    this.addTeacherToCourse()
  }
//////////////
  addTeacherToCourse(){
    this.userService.getUserById(this.TeacherId?.value).subscribe(
      data=>this.teacher=data[0]
      ,er=>console.log(er)
    )
    this.courseService.getCourseById(this.CourseId?.value).subscribe(
      data=>this.teacher=data[0]
      ,er=>console.log(er)
    )
     this.teacher.teachedCourses.push(this.CourseId.value);
     this.userService.updateUser(this.TeacherId.value,this.teacher).subscribe(
       data=>console.log(data),
       er=>console.log(er)
     )

     this.course.teachers.push(this.TeacherId.value);
     this.courseService.UpdateCourse(this.CourseId.value,this.course).subscribe(
      data=>console.log(data),
      er=>console.log(er)
     )
  }
}


