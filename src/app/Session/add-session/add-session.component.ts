import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { SessionService } from 'src/app/services/session.service';
import { Isession } from 'src/app/shared/Isession';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
classes;
  constructor(private sessionService:SessionService,private classService:classService,private fb:FormBuilder,private router:Router) 
  {
    classService.GetAllclass().subscribe(
      data => {
        this.classes = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
    
    } 
  ngOnInit(): void {
  }
  addForm=this.fb.group(
    {
      sessionNumber:['',[Validators.required]],
      classId:['',[Validators.required]],
      startTime:['',[Validators.required]],
      endTime:['',[Validators.required]]   
    });

    get sessionNumber()
   {
     return this.addForm.get('sessionNumber');
   }
   get classId()
   {
     return this.addForm.get('classId');
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
      classId:this.classId?.value,
      startTime:this.startTime?.value,
      endTime:this.endTime?.value,             
    }
    console.log(session)
    this.sessionService.AddSession(session).subscribe(
      data => {
       alert("تم إضافة الحلقة بنجاح")
        // this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }
}
