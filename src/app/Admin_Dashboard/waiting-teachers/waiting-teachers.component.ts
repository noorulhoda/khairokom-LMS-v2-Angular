import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { courseService } from 'src/app/services/course.service';
import { notificationService } from 'src/app/services/notification.service';
import { UsersService } from 'src/app/services/users.service';
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
  notificationId:String;
  notification:Inotification;
  course:Icourse;
  teacher:Iuser;
  classes:Iclass[];
  courseClasses:Iclass[]=[];
  constructor(private notificationService:notificationService,
    private route:ActivatedRoute,
    private courseService:courseService,
    private classService:classService,
    private userService:UsersService
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
            },
            error=>{
                console.log(error);
            }
          );
      
          this.userService.getUserById(this.notification.studentId).subscribe(
            data=>{
                this.teacher=data[0];
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
}
