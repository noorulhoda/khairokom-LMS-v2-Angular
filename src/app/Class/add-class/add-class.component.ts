import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { categoryService } from 'src/app/services/class.service';
import { Router } from '@angular/router';
import { Iclass } from 'src/app/Shared Classes and types/Iclass';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  constructor(private cs:categoryService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  addForm=this.fb.group(
    {
    Number:['',[Validators.required]],
    StudentsMinAge:['',[Validators.required]],
    StudentsMaxAge:['',[Validators.required]],
    StudentGender:['',[Validators.required]],
    ClassLink:['',[Validators.required]],
    ClassLinkPassword:['',[Validators.required]],
    StartTime:['',[Validators.required]],
    EndTime:['',[Validators.required]]
   });

   get Number()
   {
     return this.addForm.get('Number');
   }
   get StudentsMinAge()
   {
     return this.addForm.get('StudentsMinAge');
   }

   get StudentsMaxAge()
   {
     return this.addForm.get('StudentsMaxAge');
   }
   get StudentGender()
   {
     return this.addForm.get('StudentGender');
   }
   get ClassLink()
   {
     return this.addForm.get('ClassLink');
   }
   get ClassLinkPassword()
   {
     return this.addForm.get('ClassLinkPassword');
   }
   get StartTime()
   {
     return this.addForm.get('StartTime');
   }
   get EndTime()
   {
     return this.addForm.get('EndTime');
   }
  submit() 
  {
    var clas:Iclass={ 
       Number:this.Number?.value,
       StudentsMinAge:this.StudentsMinAge?.value,
       StudentsMaxAge:this.StudentsMaxAge?.value,
       StudentGender:this.StudentGender?.value,
       ClassLink:this.ClassLink?.value,
       ClassLinkPassword:this.ClassLinkPassword?.value,
       StartTime:this.StartTime?.value,
       EndTime:this.EndTime?.value
      
    }
    this.cs.AddClass(clas).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }


}


