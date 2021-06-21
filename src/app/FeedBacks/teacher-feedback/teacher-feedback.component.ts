import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { notificationService } from 'src/app/services/notification.service';
import { Iclass } from 'src/app/shared/Iclass';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Inotification } from 'src/app/shared/Inotification';
import { Ifeedback } from 'src/app/shared/Ifeedback';
import { feedbackService } from 'src/app/services/feedback.service';
import { UsersService } from 'src/app/services/users.service';
import { Iuser } from 'src/app/shared/Iuser';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-teacher-feedback',
  templateUrl: './teacher-feedback.component.html',
  styleUrls: ['./teacher-feedback.component.scss']
})
export class TeacherFeedbackComponent implements OnInit {
  notificationId: string;
  classId:string;
  notification:Inotification;
  class:Iclass;
  studentsIds=[];
  studentsNames=[];
  students=[];
  user:Iuser;
  studentName:String 
  constructor(private userService:UsersService,private feedbackService:feedbackService ,private fb:FormBuilder,private classService:classService,private route:ActivatedRoute,private notificationService:notificationService) 
  {

    this.route.params.subscribe(params => {
      console.log(params)
      this.notificationId = params['notificationId']
      console.log('id : ' + (this.notificationId));
    });
 

   }
  getStudentName(student):any
  {
      
       this.userService.getUserById(student).subscribe(
       data=>{
        this.user=data[0]
        this.studentName=this.user.userName
       },
       error=>{console.log(error)}
       )
       //console.log(studentName)
       return this.studentName
  }
   

  ngOnInit(): void {
    console.log("****************")
    // console.log(this.getStudentName("60c3fa7c7c5863003dc8fec1"));
    this.notificationService.getNotificationById(this.notificationId ).subscribe(
      data=>{
        this.notification=data[0]
        console.log(this.notification);

        this.classId=this.notification.classId.toString();
        console.log(this.classId)

        this.classService.getClassById(this.classId).subscribe(
          data=>{
              this.class=data[0]
                this.studentsIds=this.class.Students;  
              this.studentsIds.forEach(element=>{
                console.log(element)
               this.getStudentName(element).then(name=>this.studentsNames.push(name))
                
              
                //this.students.push({"name":this.getStudentName(element),"id":element})
              })
                console.log(this.studentsNames)
                console.log(this.studentsIds);
                // console.log(this.students)
          },
          error=>{console.log(error)}
        )
      },
      error=>
      { console.log(error); }
    )
  }


  addForm=this.fb.group(
    {
      message:[''],
      starsNumber:[''],
      setterId:[''],
      getterId:[''],
      feedbackedUserType:[''],
      classId:[''],
      courseId:['']
   });

   get message()
   {
     return this.addForm.get('message');
   }
   get starsNumber()
   {
     return this.addForm.get('starsNumber');
   }

  submit(student) 
  {
    var feedback:Ifeedback={ 
      message:this.message?.value,
      starsNumber:this.starsNumber?.value,
      setterId:this.class.TeacherId,
      getterId:student,
      feedbackedUserType:"Student",
      classId:this.classId,
      courseId:this.class.CourseId
    }
    this.feedbackService.addFeedback(feedback).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }

}
