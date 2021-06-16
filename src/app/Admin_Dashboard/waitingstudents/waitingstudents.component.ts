import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { classService } from 'src/app/services/class.service';
import { courseService } from 'src/app/services/course.service';
import { notificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';
import { Inotification } from 'src/app/shared/Inotification';
import { Iuser } from 'src/app/shared/Iuser';

@Component({
  selector: 'app-waitingstudents',
  templateUrl: './waitingstudents.component.html',
  styleUrls: ['./waitingstudents.component.scss']
})
export class WaitingstudentsComponent implements OnInit {
  notificationId:String;
  notification:Inotification;
  course:Icourse;
  student:Iuser;
  classes:Iclass[];
  courseClasses:Iclass[]=[];
  studentAge: number;
  checkedClassId:String;
  checkedClass: Iclass;
  category: any;
  constructor(private notificationService:notificationService,
    private route:ActivatedRoute,
    private courseService:courseService,
    private classService:classService,
    private userService:UsersService,
    private categoryService:categoryService
    ) { 
    //this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) 
     this.notificationId=params['id'] 
    });
    this.notificationService.getNotificationById(this.notificationId).subscribe(
      data=>{
          this.notification=data[0];
          console.log(this.notification)
          this.courseService.getCourseById(this.notification.courseId).subscribe(
            data=>{
                this.course=data[0];
                this.categoryService.getCategoryById(this.course.categoryID).subscribe(
                  data => {
                    this.category = data[0];
                    console.log(data);
                  },
                  error => {
                    console.log(error);
                  }
                );
            },
            error=>{
                console.log(error);
            }
          );
      
          this.userService.getUserById(this.notification.studentId).subscribe(
            data=>{
                this.student=data[0];
                var dob =this.student.birthDate;
            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            this.studentAge=age;
            },
            error=>{
                console.log(error);
            }
          );
      },
      error=>{
          console.log(error);
      }
    );
    

  }

  ngOnInit(): void {
   

    this.classService.GetAllclass().subscribe(
      data=>{
          this.classes=data;
          this.classes.forEach(element => {
            if(element.CourseId==this.notification.courseId)      
            this.courseClasses.push(element)
  });
      },
      error=>{
          console.log(error);
      }
    );
   
  }
  onCheckingChange(classId){
    this.checkedClassId=classId;
  }

  addStudentToClass(){
    this.classService.getClassById(this.checkedClassId.toString()).subscribe(
      data=>{
        console.log(data)
        this.checkedClass=data[0]
      },
      er=>console.log(er)
    )
    this.checkedClass.Students.push(this.student)
    this.classService.updateClass(this.checkedClassId,this.checkedClass).subscribe(
      data=>console.log(data),
      er=>console.log(er)
    )
    this.student.joinedClasses.push(this.checkedClass);
    this.userService.updateUser(this.notification.studentId,this.student).subscribe(
      data=>console.log(data),
      er=>console.log(er)
    )
    this.NotifyToTeacherWithAccept();
  }


  NotifyToTeacherWithAccept(){
    var notification:Inotification={
      message:"تم قبولك في الدورة التدريبية التي قدمت عليها ",
      notifiedUserId:this.notification.studentId,
      courseId:this.notification.courseId,
      isRead:false
    }
    this.notificationService.addNotification(notification).subscribe(
      data => {
        //this.router.navigateByUrl("/home")
        alert("تم ارسال رسالة قبول الى الطالب ")
        console.log(data)
      },
      error => {
        console.log(error)
      }
    );
  }


}
