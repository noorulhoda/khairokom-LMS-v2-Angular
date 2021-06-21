import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { SessionService } from 'src/app/services/session.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-get-class-by-id',
  templateUrl: './get-class-by-id.component.html',
  styleUrls: ['./get-class-by-id.component.scss']
})
export class GetClassByIDComponent implements OnInit {

  constructor(private sessionService:SessionService,private cs:classService,private route:ActivatedRoute,private router:Router) { }
  clas:Iclass;
  id:String='defaultID';
  errMsg='errroor';
  sessions:Isession[]=[]
  classSessions:Isession[]=[];
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) 
     this.id=params['id'] 
     console.log('id : '+(this.id));
    });
 
    this.cs.getClassById(this.id.toString()).subscribe(
     
        data => {
          this.clas= data[0]; 
          console.log(this.id);
          console.log(this.clas);
          this.sessionService.GetAllSessions().subscribe(
            data=>{
                this.sessions=data;
                console.log(this.sessions);
                this.sessions.forEach(element => {
                  console.log(element)
                  console.log("*****************")
                 if(element.classId==this.id)
                 {
                   this.classSessions.push(element);
                 }
               });
              
                console.log(this.classSessions)
            },
            error=>{
              console.log(error)
             }
            )
        },
        er =>this.errMsg=er ,
      );
      console.log(this.clas)
    

    
  }
  
   

}
