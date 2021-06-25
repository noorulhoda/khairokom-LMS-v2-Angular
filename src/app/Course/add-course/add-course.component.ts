import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { courseService } from '../../services/course.service';
import { Icourse } from 'src/app/shared/Icourse';
import { Router } from '@angular/router';
import { Icategory } from 'src/app/shared/Icategory';
import { categoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  chosenFiles: FileList;
  existingFile: File;
  
  progress = 0;
  msg = '';

  FileDetail: Observable<any>;
  fileName:string;
  constructor(private uploadService:UploadService, private cs:courseService,private fb:FormBuilder,private router:Router,private categoryService: categoryService) 
  {
    this.categoryService.GetAllcateories().subscribe(
      data => {
        this.categories = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit(): void {

    this.FileDetail = this.uploadService.getFiles();
  
    
  }
  
  addForm=this.fb.group(
    {
    tittle:[''],
    description:[''],
    image:[''],
    categoryID:[''],
    teachers:[]
   });

   categories: Icategory[] = [];

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
       image:this.fileName,
       categoryID:this.categoryID?.value,
       teachers:[]
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




  

chooseFile(event): void {
  this.chosenFiles = event.target.files;
}

upload(): void {
  this.progress = 0;

  this.existingFile = this.chosenFiles.item(0);

  this.uploadService.uploadFile(this.existingFile).subscribe( (event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.msg = event.body.message;
        this.FileDetail = this.uploadService.getFiles();
        this.fileName=this.existingFile.name;
      }
    }, (error) => {
      this.progress = 0;
      this.msg = 'Error occured while uploading file';
      this.existingFile = undefined;
    });

  this.chosenFiles = undefined;
}  


}







  
  
