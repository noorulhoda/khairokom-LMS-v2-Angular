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
  notifications:Observable<Inotification[]>;
  constructor(private notificationService:notificationService) { 
    this.notifications=this.notificationService.getAllNotifications();

  }

  ngOnInit(): void {
  }

}
