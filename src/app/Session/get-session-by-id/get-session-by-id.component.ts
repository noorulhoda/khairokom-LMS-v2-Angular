import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-get-session-by-id',
  templateUrl: './get-session-by-id.component.html',
  styleUrls: ['./get-session-by-id.component.scss']
})
export class GetSessionByIdComponent implements OnInit {

  constructor( private sessionService:SessionService,private route:ActivatedRoute,
    private router:Router) { }

  session:Isession;
  id:string='defaultID';
  errMsg='errroor';

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) //log the entire params object
     this.id=params['id'] //log the value of id
     console.log('id : '+(this.id));
    });
 
    this.sessionService.getSessionById(this.id).subscribe(
     
        data => {this.session= data[0]; console.log(this.id);console.log(this.session);},
        er =>this.errMsg=er ,
      );
      console.log(this.session)
  }

  delete(){
    this.sessionService.DeleteSession(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    );  
  }
}
