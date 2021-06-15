import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { Inotification } from 'src/app/shared/Inotification';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  notifications:Inotification[];
  adminNotifications:Inotification[]=[];
  unReadNotifications=0;
  constructor(private notificationService:notificationService,private router:Router) { 
    this.notificationService.getAllNotifications().subscribe(
      data=>{
        this.notifications=data
        //  this.notifications.forEach(element => {
        //   // if(element.notifiedUserId=="Admin")
        //   this.adminNotifications.push(element)
        // });
        this.computeUnRead();//صح
        console.log(data);
        },
      er=>console.log(er)
    );

    
  }

  ngOnInit(): void {
    
  }
  notificationRead(id:String,notification:Inotification){
    notification.isRead=true;
    this.notificationService.updateNotification(id,notification).subscribe(
      data=>console.log(data),
      er=> console.log(er)
    )
    if(notification.hasOwnProperty('studentId'))
     {this.router.navigateByUrl('/waitingStudents/'+id)}
    else if(notification.hasOwnProperty('teacherId'))
    this.router.navigateByUrl('/waitingTeachers/'+id)
  }

  computeUnRead(){
    this.notifications.forEach(element => {
      if(!element.isRead&&element.notifiedUserId=="Admin")
        this.unReadNotifications++;
    });
    console.log(this.unReadNotifications);
  }
}
