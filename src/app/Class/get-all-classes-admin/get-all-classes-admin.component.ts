import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { SessionService } from 'src/app/services/session.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-get-all-classes-admin',
  templateUrl: './get-all-classes-admin.component.html',
  styleUrls: ['./get-all-classes-admin.component.scss']
})
export class GetAllClassesAdminComponent implements OnInit {
  clas:Iclass;
  course:Icourse;
  id:string='defaultID';
  errMsg='errroor';
  sessions:Isession[]=[];
  classes: Iclass[] = [];
  classSessions=[];
  constructor(private classServices: classService,private sessionService:SessionService,private router:Router,private route:ActivatedRoute) {
    this.getClasses();
  }

  ngOnInit(): void {
  }
  getClasses() {
    this.classServices.GetAllclass().subscribe(
      data => {
        this.classes = data

      }
    );
  }
 
  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  delete(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف المجموعة و كذلك الحلقات التى تحتوى عليها هذه المجموعة إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }
     else if(this.sureDelete){

    this.classServices.deleteCLass(id).subscribe(
        data => {
          this.sessionService.GetAllSessions().subscribe (
            data=>{
              this.sessions=data
              console.log(this.sessions);
            
              this.sessions.forEach(element => {
                if(element.classId==id)
                {
                  this.classSessions.push(element);
                }
              });
              console.log(this.classSessions)
              
               this.classSessions.forEach(element=>{
                  this.sessionService.DeleteSession(element._id).subscribe(
                    data=>{console.log(data)},
                    error=>{console.log(error)}

                  )
            })},
            er=>{
              console.log(er);
            }
          )
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      window.location.reload();
  }
  }

}
