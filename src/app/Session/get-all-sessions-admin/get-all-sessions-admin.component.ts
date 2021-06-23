import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-get-all-sessions-admin',
  templateUrl: './get-all-sessions-admin.component.html',
  styleUrls: ['./get-all-sessions-admin.component.scss']
})
export class GetAllSessionsAdminComponent implements OnInit {
  sessionList = [];
  errorMsg:any;
  selectedID:any;

  constructor(private sessionService:SessionService,private router:Router,
    private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.sessionService.GetAllSessions().subscribe(
      Data=>
      {
        this.sessionList=Data;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }
    )
    this.activeRouter.paramMap.subscribe((params:ParamMap)=>
    this.selectedID=params.get('id')
    );
  }

  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  delete(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف الحلقة إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }
     else if(this.sureDelete){

      this.sessionService.DeleteSession(id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      window.location.reload();
  }
  }
  
}
