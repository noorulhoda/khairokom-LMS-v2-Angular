import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {

  constructor(private sessionService:SessionService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  addForm=this.fb.group(
    {
      sessionNumber:['',[Validators.required]],
      classID:['',[Validators.required]],
      startTime:['',[Validators.required]],
      endTime:['',[Validators.required]]   
    });

    get sessionNumber()
   {
     return this.addForm.get('sessionNumber');
   }
   get classID()
   {
     return this.addForm.get('classID');
   }

   get startTime()
   {
     return this.addForm.get('startTime');
   }
   get endTime()
   {
     return this.addForm.get('endTime');
   }

   submit() 
  {
    var session:Isession={ 
      sessionNumber:this.sessionNumber?.value,
      classID:this.classID?.value,
      startTime:this.startTime?.value,
      endTime:this.endTime?.value,             
    }
    this.sessionService.AddSession(session).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }
}
