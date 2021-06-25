import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { classService } from 'src/app/services/class.service';
import { MessageService } from 'src/app/services/message.service';
import { notificationService } from 'src/app/services/notification.service';
import { RolesService } from 'src/app/services/roles.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Imessage } from 'src/app/shared/Imessage';
import { Inotification } from 'src/app/shared/Inotification';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  notifications:Inotification[];
  messages:Imessage[];

  adminNotifications:Inotification[]=[];
  adminMessages:Imessage[]=[];

  unReadNotifications=0;
  unReadMessages=0;

  classes;
  adminRoleId;
  constructor(
    private notificationService:notificationService,
    private router:Router,
    private classService:classService,
    private messageService:MessageService,
    private roleService:RolesService) { 

      this.roleService.findByRoleType("Admin").subscribe(
        data=>{this.adminRoleId=data[0]['_id'];
        console.log(data)
      }
        ,er=>console.log(er)
      )
    this.notificationService.getAllNotifications().subscribe(
      data=>{
        this.notifications=data
         this.notifications.forEach(element => {
          if(element.notifiedUserId=="Admin")
          this.adminNotifications.push(element)
        });
        this.adminNotifications.reverse();
        this.computeUnRead();//صح
        console.log(data);
        },
      er=>console.log(er)
    );

    this.messageService.getAllMessages().subscribe(
      data=>{
        this.messages=data
         this.messages.forEach(element => {
          if(element.receiverId==this.adminRoleId)
          this.adminMessages.push(element)
        });
        this.adminMessages.reverse();
        this.computeUnReadMessages();
        console.log(data);
        },
      er=>console.log(er)
    );

    
  }

  ngOnInit(): void {
    this.classService.GetAllclass().subscribe(
      data=>{this.classes=data
        this.checkFinishedClasses()}
      ,er=>console.log(er)
    )
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

  messageRead(id:String,message:Imessage){
    console.log(id)
    message.isRead=true;
    this.messageService.updateMessage(id,message).subscribe(
      data=>console.log(data),
      er=> console.log(er)
    )
    this.router.navigateByUrl('/detailedMessages/'+id)
   
  }
  computeUnRead(){
    this.adminNotifications.forEach(element => {
      if(!element.isRead)
        this.unReadNotifications++;
    });
    console.log(this.unReadNotifications);
  }

  computeUnReadMessages(){
    this.adminMessages.forEach(element => {
      if(!element.isRead)
        this.unReadMessages++;
    });
    console.log(this.unReadMessages);
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
sureDelete1:Boolean=false;
  deleteNew1:Boolean=true;
  deleteMessage(id) {
    if(this.deleteNew1){
      alert(" سوف تقوم بحذف الرسالة إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete1=true; 
      this.deleteNew1=false;
     }

else if(this.sureDelete1){
    this.messageService.deleteMessage(id)
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
checkFinishedClasses(){
 this.classes.forEach(element => {//element is class
  var d =element.EndDate
  var today = new Date();
  var endDate= new Date(d);
  var monthDiff = endDate.getMonth()-today.getMonth();
  var dayDiff = endDate.getDay()-today.getDay();
  if(monthDiff<=0&&dayDiff<=0&&element.IsFeedbacked==false){
    console.log("finishedClass")
    console.log(monthDiff+"|"+dayDiff+"|"+element.IsFeedbacked)
    
    this.notifyTeacherToFeedback(element);
     element.Students.forEach(stdnt => {
      this.notifyStudentToFeedback(stdnt,element)
    });
    element.IsFeedbacked=true;
    this.classService.updateClass(element._id,element).subscribe(
      data=>console.log(data),
      er=>console.log(er)
    )
  }
  else{
     console.log("runningClass")
     console.log(monthDiff+"|"+dayDiff+"|"+element.IsFeedbacked)
  }

 });
}
 
notifyStudentToFeedback(studentId,clas){
  var notification:Inotification={
    message:"يرجى تقييم دراستك في المجموعة التي انهيتها ",
    notifiedUserId:studentId,
    courseId:clas.CourseId,
    isRead:false,
    classId:clas._id,
    isFeedbackFrom:"Student"
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
}
notifyTeacherToFeedback(clas){
  var notification:Inotification={
    message:"يرجى تقييم طلاب المجموعة التي أنهيت تدريسها بفضل الله  ",
    notifiedUserId:clas.TeacherId,
    courseId:clas.CourseId,
    classId:clas._id,
    isRead:false,
    isFeedbackFrom:"Teacher"
  }
  this.notificationService.addNotification(notification).subscribe(
    data => {
      console.log(data)
    },
    error => {
      console.log(error)
    }
  );
}
logout(){
  localStorage.setItem('token',"0000");
  localStorage.setItem('currentUserName',"0000")
 
  localStorage.setItem('currentUserId',"0000")
  console.log('logouted successfully')
  localStorage.setItem('isAdmin',"false")


}

}