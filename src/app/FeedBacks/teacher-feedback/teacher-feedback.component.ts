import { AfterViewInit, Component, OnInit } from '@angular/core';
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
  selector: 'app-teacher-feedback',
  templateUrl: './teacher-feedback.component.html',
  styleUrls: ['./teacher-feedback.component.scss']
})
export class TeacherFeedbackComponent implements OnInit ,AfterViewInit {
  currentStudentId;
  currentStudentName;
  indx = 0;
  studentsEnded: Boolean;
  notificationId: string;
  classId: string;
  notification: Inotification;
  class: Iclass;
  studentsIds = [];
  studentsNames = [];
  students = [];
  user: Iuser;
  studentName: String
  constructor(private userService: UsersService, private feedbackService: feedbackService, private fb: FormBuilder, private classService: classService, private route: ActivatedRoute, private notificationService: notificationService) {

    this.route.params.subscribe(params => {
      console.log(params)
      this.notificationId = params['notificationId']
      console.log('id : ' + (this.notificationId));
    });


  }

  getStudentName(studentId): any {

    this.userService.getUserById(studentId).subscribe(
      data => {
        this.user = data[0]
        this.studentName = this.user.userName
        this.currentStudentName=this.user.userName
        console.log(this.currentStudentName)
        return this.studentName
      },
      error => { console.log(error) 
        return error}
    )
   
  }


  ngOnInit(): void {
    this.notificationService.getNotificationById(this.notificationId).subscribe(
      data => {
        this.notification = data[0]
        this.classId = this.notification.classId.toString();
        this.classService.getClassById(this.classId).subscribe(
          data => {
            this.class = data[0]
            this.studentsIds = this.class.Students;
           
          },
          error => { console.log(error) }
        )
      },
      error => { console.log(error); }
    )
  }

ngAfterViewInit():void{
  this.currentStudentId = this.studentsIds[this.indx]
  console.log(this.currentStudentId)
  this.getStudentName("60cc9a22e9c3450ac4f9004c")
  console.log(this.currentStudentName)
  console.log("-*-*---***********-**-***--**-*-*-*-*--*-*-*-*-*-*-*-*-**-*--*-*-*-**-")
}

addForm = this.fb.group(
    {
      message: [''],
      starsNumber: [''],

    });

  get message() {
    return this.addForm.get('message');
  }
  get starsNumber() {
    return this.addForm.get('starsNumber');
  }

  submit() {
    var feedback: Ifeedback = {
      message:this.currentStudentName,//this.message?.value,
      starsNumber: this.starsNumber?.value,
      setterId: this.class.TeacherId,
      getterId: this.currentStudentId,
      feedbackedUserType: "Student",
      classId: this.classId,
      courseId: this.class.CourseId,
      
    }
    this.feedbackService.addFeedback(feedback).subscribe(
      data => {
        console.log(data)
        if(this.indx < this.studentsIds.length-1) {
          this.indx++;
          this.currentStudentId = this.studentsIds[this.indx]
         // console.log("*************************************************"+this.studentsIds[this.indx])
          this.currentStudentName = this.getStudentName(this.currentStudentId)
        }
        else {
          this.studentsEnded = true
        }
      },
      error => {
        console.log(error)
      }
    );

 


  }

}
