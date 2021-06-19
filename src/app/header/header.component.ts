import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Irole } from '../shared/Irole';
import { Iuser } from '../shared/Iuser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { Inotification } from 'src/app/shared/Inotification';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: any = localStorage.getItem('currentUserName');
  user: any;
  userId: any;
  notifications:Inotification[];
  userNotifications:Inotification[]=[];
  unReadNotifications=0;
  constructor(private notificationService:notificationService,private router:Router,private userService:UsersService, private _vps: ViewportScroller) { 
    this.userService.findByUserName(this.userName).subscribe(
   
      data => {this.user= data[0]; this.userId=data[0]['_id']
               
    this.notificationService.getAllNotifications().subscribe(
      data=>{
        this.notifications=data
         this.notifications.forEach(element => {
          if(element.notifiedUserId==this.userId)
          this.userNotifications.push(element)
        });
        this.computeUnRead();//صح
        console.log(data);
        },
      er=>console.log(er)
    );
    },
      er =>console.log(er) ,
    );
    this.findCurrentUser();
    


  
  
  }
  pannerSrc="https://i.imgur.com/bkCeTu7.png";

  ngOnInit(): void {
       

  }
  logout(){
    //console.log(localStorage.getItem('token'))
    localStorage.setItem('token','');
    localStorage.setItem('currentUserName','guest')
    this.currentUserName='guest'
    localStorage.setItem('currentUserId','')

    console.log('logouted successfully')
  //console.log(localStorage.getItem('token'))
  }
  currentUserName:string;
  currentUser:Iuser;
  currentUserRoles:string[];
  findCurrentUser(){
    this.currentUserName=localStorage.getItem('currentUserName');
    this.userService.findByUserName(this.currentUserName).subscribe(
      data => {
        console.log(data)
        this.currentUser= data;this.currentUserRoles=this.currentUser.roles;
        localStorage.setItem('currentUserId',this.userId)},
      er => console.log('error happened in determine user') ,
    )
  }






  notificationRead(id:String,notification:Inotification){
    notification.isRead=true;
    this.notificationService.updateNotification(id,notification).subscribe(
      data=>console.log(data),
      er=> console.log(er)
    )
    this.router.navigateByUrl('/getCourseById/'+ notification.courseId);
  }

  computeUnRead(){
    this.userNotifications.forEach(element => {
      if(!element.isRead)
        this.unReadNotifications++;
    });
    console.log(this.unReadNotifications);
  }


  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  deleteNotification(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف الاشعار إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }

else if(this.sureDelete){
    this.notificationService.deleteNotification(id)
      .subscribe(
        data => {
          console.log(data)
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      window.location.reload();
  }
}

scrollFn(anchor: string): void{
  this.router.navigateByUrl('/home').then(() => this._vps.scrollToAnchor(anchor));
  // this._vps.scrollToAnchor(anchor);
}
}