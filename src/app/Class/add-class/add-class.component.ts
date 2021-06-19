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
import { Inotification } from 'src/app/shared/Inotification';
import { notificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {
  courseId:String;
  teacherId:String;
  courses;
  usersList;
  teachersList=[];
  teacherRole="60b79235865a7e0ac79fdb85";
  teacher:Iuser;
  course:Icourse;
  constructor(private notificationService:notificationService,private roleService:RolesService,private userService:UsersService,private classservice:classService,private courseService:courseService,private fb:FormBuilder,private router:Router)
  {
     this.courseId=localStorage.getItem('courseId');
     this.teacherId=localStorage.getItem('teacherId');

 

     console.log(this.teacherId);
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
               console.log(this.teachersList)
          });
       }
     )
  
    } 
  ngOnInit(): void {
    this.userService.getUserById(this.teacherId).subscribe(
      data=>this.teacher=data[0]
      ,er=>console.log(er)
    )
    this.courseService.getCourseById(this.courseId).subscribe(
      data=>this.course=data[0]
      ,er=>console.log(er)
    )
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
    TeacherId:['',[Validators.required]],
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
 /*   get CourseId()
   {
     return this.addForm.get('CourseId');
   }
   get TeacherId()
   {
     return this.addForm.get('TeacherId');
   } */
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
       CourseId:this.courseId.toString(),
       TeacherId:this.teacherId.toString(),
       Students:this.Students?.value
      
    }
    console.log(clas)
    console.log(this.teachersList);
    this.classservice.AddClass(clas).subscribe(
      data => {
        console.log(this.teacher)
        this.addTeacherToCourse()
        this.NotifyToTeacherWithAccept();
      },
      error => {
        console.log("*****************************")
        console.log(this.teacher)
        console.log("*****************************")
        console.log(error)
      }
    );
 
  }

//////////////
  addTeacherToCourse(){
    console.log(this.teacher)
     this.teacher.teachedCourses.push(this.course);
     this.userService.updateUser(this.teacherId,this.teacher).subscribe(
       data=>console.log(data),
       er=>console.log(er)
     )

     this.course.teachers.push(this.teacher);
     this.courseService.UpdateCourse(this.courseId,this.course).subscribe(
      data=>console.log(data),
      er=>console.log(er)
     )
  }

  NotifyToTeacherWithAccept(){
    var notification:Inotification={
      message:"لقد تم قبولك  لتدريس الدورة التدريبية",
      notifiedUserId:this.teacherId,
      courseId:this.courseId,
      isRead:false
    }
    this.notificationService.addNotification(notification).subscribe(
      data => {
        //this.router.navigateByUrl("/home")
        alert("تم ارسال رد للمعلم بقبوله للتدريس ")
      },
      error => {
        console.log(error)
      }
    );
  }
}


