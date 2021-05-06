import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPassword } from '../../misMatch.validator';
import { ForbiddenNameValidator } from '../../username.validatior';
import { courseService } from '../../services/course.service';
import { Icourse } from 'src/app/Shared Classes and types/Icourse';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  constructor(private cs:courseService,private fb:FormBuilder,private router:Router) { }
  ngOnInit(): void {}
  
  addForm=this.fb.group(
    {
    tittle:[''],
    description:[''],
    image:[''],
    categoryID:[''],
   });

   get tittle()
   {
     return this.addForm.get('tittle');
   }
   get description()
   {
     return this.addForm.get('description');
   }

   get image()
   {
     return this.addForm.get('image');
   }
   get categoryID()
   {
     return this.addForm.get('categoryID');
   }
  submit() 
  {
    var course:Icourse={ 
       tittle:this.tittle?.value,
       description:this.description?.value,
       image:this.image?.value,
       categoryID:this.categoryID?.value
    }
    this.cs.AddCourse(course).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }


}







  
  
