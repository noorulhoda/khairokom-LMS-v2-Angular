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

@Component({
  selector: 'app-student-feedback',
  templateUrl: './student-feedback.component.html',
  styleUrls: ['./student-feedback.component.scss']
})
export class StudentFeedbackComponent implements OnInit {
  notificationId: string;
  classId:string;
  notification:Inotification;
  class:Iclass;
  teacher:Iuser;
  tacherName:String 
  constructor(private userService:UsersService,private feedbackService:feedbackService ,private fb:FormBuilder,private classService:classService,private route:ActivatedRoute,private notificationService:notificationService) 
  {
    this.route.params.subscribe(params => {
      console.log(params)
      this.notificationId = params['notificationId']
      console.log('id : ' + (this.notificationId));
    });
     
    this.notificationService.getNotificationById(this.notificationId ).subscribe(
      data=>{
        this.notification=data[0]
        console.log(this.notification);

        this.classId=this.notification.classId.toString();
        console.log(this.classId)

        this.classService.getClassById(this.classId).subscribe(
          data=>{
              this.class=data[0]
              this.userService.getUserById(this.class.TeacherId).subscribe(
                data=>{
                   this.teacher=data[0]
                   console.log(this.teacher)
                },error=>{
                  console.log(error)
                }
              )
          },
          error=>{console.log(error)}
       )
       
          },
          error=>{console.log(error)}
        )
   }
  ngOnInit(): void {
 
      }
  


  // addForm=this.fb.group(
  //   {
  //     message:[''],
  //     starsNumber:[''],
  //     setterId:[''],
  //     getterId:[''],
  //     feedbackedUserType:[''],
  //     classId:[''],
  //     courseId:['']
  //  });

  //  get message()
  //  {
  //    return this.addForm.get('message');
  //  }
  //  get starsNumber()
  //  {
  //    return this.addForm.get('starsNumber');
  //  }

  // submit() 
  // {
  //   var feedback:Ifeedback={ 
  //     message:this.message?.value,
  //     starsNumber:this.starsNumber?.value,
  //     setterId:localStorage.getItem('currentUserName'),
  //     getterId:this.class.TeacherId,
  //     feedbackedUserType:"Teacher",
  //     classId:this.classId,
  //     courseId:this.class.CourseId
  //   }
  //   this.feedbackService.addFeedback(feedback).subscribe(
  //     data => {
  //       console.log(data)
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   );
  // }

}
