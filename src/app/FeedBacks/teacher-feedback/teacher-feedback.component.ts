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
  currentStudentId;
  currentStudentName;
  indx=0;
  studentsEnded:Boolean;
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
    
    console.log(this.getStudentName("00"));
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
                this.currentStudentId=this.studentsIds[this.indx++]
                //console.log(this.currentStudentId)
                this.currentStudentName=this.getStudentName(this.currentStudentId)
               // console.log(this.currentStudentName)
                //console.log(this.getStudentName("60cc9a22e9c3450ac4f9004c"))
      
                //console.log(this.studentsNames)
                //console.log(this.studentsIds);
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
    
   });

   get message()
   {
     return this.addForm.get('message');
   }
   get starsNumber()
   {
     return this.addForm.get('starsNumber');
   }

  submit() 
  {
    var feedback:Ifeedback={ 
      message:this.message?.value,
      starsNumber:this.starsNumber?.value,
      setterId:this.class.TeacherId,
      getterId:this.currentStudentId,
      feedbackedUserType:"Student",
      classId:this.classId,
      courseId:this.class.CourseId
    }
    this.feedbackService.addFeedback(feedback).subscribe(
      data => {
        console.log(data)
        console.log(this.currentStudentName)
        console.log(this.currentStudentId)
        console.log("-*-*-*-*-*-*-*-*-*-*-*-***--*-*-*-*-*-*")
      },
      error => {
        console.log(error)
      }
      
    );
    if(this.indx<=this.students.length+2){
    console.log(this.currentStudentName)
    this.currentStudentId=this.studentsIds[this.indx++]
    this.currentStudentName=this.getStudentName(this.currentStudentId)}
    else{
      this.studentsEnded=true
    }
    
    
  }

}
