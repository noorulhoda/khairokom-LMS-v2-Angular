import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { classService } from 'src/app/services/class.service';
import { courseService } from 'src/app/services/course.service';
import { notificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
import { Icategory } from 'src/app/shared/Icategory';
import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';
import { Inotification } from 'src/app/shared/Inotification';
import { Iuser } from 'src/app/shared/Iuser';

@Component({
  selector: 'app-waiting-teachers',
  templateUrl: './waiting-teachers.component.html',
  styleUrls: ['./waiting-teachers.component.scss']
})
export class WaitingTeachersComponent implements OnInit {
  notificationId: String;
  notification: Inotification;
  course: Icourse;
  teacher: Iuser;

  classes: Iclass[];
  category: Icategory;
  teacherAge: number;
  courseClasses: Iclass[] = [];
  constructor(private notificationService: notificationService,
    private route: ActivatedRoute,
    private courseService: courseService,
    private classService: classService,
    private userService: UsersService,
    private categoryService: categoryService,
    private router:Router
  ) {
    //this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
      console.log(params)
      this.notificationId = params['id']
    });
    this.notificationService.getNotificationById(this.notificationId).subscribe(
      data => {
        this.notification = data[0];
        console.log(this.notification)
        this.courseService.getCourseById(this.notification.courseId).subscribe(
          data => {
            this.course = data[0];
            console.log(data);
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
          error => {
            console.log(error);
          }
        );

        this.userService.getUserById(this.notification.teacherId).subscribe(
          data => {
            this.teacher = data[0];
            console.log(this.teacher);
            var dob =this.teacher.birthDate;
            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
           
            // var today = new Date();
            // var year = today.getFullYear();
            // this.teacherAge = year - this.teacher.birthDate.getFullYear();
            this.teacherAge=age;
            console.log(this.teacherAge);
            console.log(this.teacher.birthDate);
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );


  }

  ngOnInit(): void {


    this.classService.GetAllclass().subscribe(
      data => {
        this.classes = data;
        this.classes.forEach(element => {
          if (element.CourseId == this.notification.courseId)
            this.courseClasses.push(element)
        });
      },
      error => {
        console.log(error);
      }
    );

  }

  verified()
  {
    this.teacher.verifiedTeacher=true;
    console.log(this.teacher.verifiedTeacher)
    this.userService.updateUser(this.notification.teacherId,this.teacher).subscribe(
      data => {
        console.log(data)
  },
  error => {
    console.log(error);
  }
);
this.NotifyToTeacherWithVerified();
}
  unVerified()
  {
    this.teacher.verifiedTeacher=false;
    this.userService.updateUser(this.notification.teacherId,this.teacher).subscribe(
      data => {
        console.log(data)
  },
  error => {
    console.log(error);
  }
);
 this.NotifyToTeacherWithNotVerified();
  }
  addClass()
 {
   localStorage.setItem("teacherId",this.notification.teacherId.toString())
   localStorage.setItem("courseId",this.notification.courseId.toString())
   this.router.navigateByUrl("/addClass")
 }

 NotifyToTeacherWithNotAccept(){
  var notification:Inotification={
    message:" لم يتم قبول طلبك لتدريس الدورة التدريبية.. نأسف لذلك ",
    notifiedUserId:this.notification.teacherId,
    courseId:this.notification.courseId,
    isRead:false
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      //this.router.navigateByUrl("/home")
      alert("تم ارسال رفض للمعلم للتدريس ")
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
}
NotifyToTeacherWithVerified(){
  var notification:Inotification={
    message:" مبارك لقد تم اعتمادك كمعلم/ة من قبل الموقع ",
    notifiedUserId:this.notification.teacherId,
    courseId:this.notification.courseId,
    isRead:false
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      //this.router.navigateByUrl("/home")
      alert("تم ارسال الاعنماد للمعلم  ")
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
}
NotifyToTeacherWithNotVerified(){
  var notification:Inotification={
    message:" نأسف لقد تم سحب اعتمادك كمعلم/ة من قبل الموقع ",
    notifiedUserId:this.notification.teacherId,
    courseId:this.notification.courseId,
    isRead:false
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      //this.router.navigateByUrl("/home")
      alert("تم ارسال سحب الاعتماد للمعلم  ")
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
}

  
}
