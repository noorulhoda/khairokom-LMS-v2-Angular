import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-update-session',
  templateUrl: './update-session.component.html',
  styleUrls: ['./update-session.component.scss']
})
export class UpdateSessionComponent implements OnInit {

  constructor(private fb:FormBuilder,private sessionService:SessionService,
    private route:ActivatedRoute,private router:Router) { }

    updateForm=this.fb.group({  
      sessionNumber:['',[Validators.required,Validators.minLength(5)]],
      classID:[''],
      startTime:[''],
      endTime:[''],
    });

    get sessionNumber()
    {
      return this.updateForm.get('sessionNumber');
    }
    get classID()
    {
      return this.updateForm.get('classID');
    }
 
    get startTime()
    {
      return this.updateForm.get('startTime');
    }
    get endTime()
    {
      return this.updateForm.get('endTime');
    }

    session:Isession;
    id:string='defaultID';
    errMsg='errroor';

    loadApiData()
    {
        this.updateForm.patchValue({
     
        sessionNumber:this.session.sessionNumber,
        classID:this.session.classID,
        startTime:this.session.startTime,
        endTime:this.session.endTime,        
      })
    }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
       this.route.params.subscribe(params => {
       console.log(params) //log the entire params object
       this.id=params['id'] //log the value of id
       console.log('id : '+(this.id));
       
   });
   
   
   this.sessionService.getSessionById(this.id).subscribe(
    
       data => {this.session= data[0]; console.log(this.id);console.log(this.session);this.loadApiData()},
       er =>this.errMsg=er ,
     );
     console.log(this.session)
  }

  update()
   {  
     var newSession: Isession = {
      sessionNumber:this.sessionNumber?.value,
      classID:this.classID?.value,
      startTime:this.startTime?.value,
      endTime:this.endTime?.value,         
   }
   console.log(newSession)
   
   this.sessionService.UpdateSession(this.id,newSession)
   .subscribe(
     data => {
       console.log("DATA : "+data);
       this.router.navigateByUrl("/home")
     },
     error => {
       console.log("errooorrrrr-_-"+ error)
     }
   );  
   }

}
