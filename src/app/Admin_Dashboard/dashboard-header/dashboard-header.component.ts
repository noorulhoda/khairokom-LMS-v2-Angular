import { Component, OnInit } from '@angular/core';
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
  adminNotifications:Inotification[];
  unReadNotifications=0;
  constructor(private notificationService:notificationService) { 
    this.notificationService.getAllNotifications().subscribe(
      data=>{this.notifications=data
         this.notifications.forEach(element => {
          if(element.notifiedUserId=="Admin")
          this.adminNotifications.push(element)
        });
        this.computeUnRead()},
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
  }
  computeUnRead(){
    this.adminNotifications.forEach(element => {
      if(!element.isRead)this.unReadNotifications++;
    });
  }
}
