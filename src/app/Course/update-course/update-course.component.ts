import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { courseService } from 'src/app/services/course.service';
import { Icourse } from 'src/app/shared/Icourse';
import { Icategory } from 'src/app/shared/Icategory';
import { categoryService } from 'src/app/services/category.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.scss']
})
export class UpdateCourseComponent implements OnInit {

  chosenFiles: FileList;
  existingFile: File;
  
  progress = 0;
  msg = '';

  FileDetail: Observable<any>;
  fileName:string;
  constructor(private uploadService:UploadService, private cs:courseService,private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private categoryService: categoryService) 
  {
    this.route.params.subscribe(params => {
      console.log(params) 
      this.id=params['id'] 
      console.log('id : '+(this.id));
     });

     this.cs.getCourseById(this.id).subscribe(
      data => {
        this.course = data[0];
        console.log( data);
        console.log(this.course);
        //console.log('course '+this.course.tittle);
        this.LoadCourseData();
      },
      error => console.log(error)
    );
    
    this.categoryService.GetAllcateories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );

  }
  LoadCourseData() {
    this.editForm.get("tittle")?.setValue(this.course.tittle);
    this.editForm.get("description")?.setValue(this.course.description);
    this.editForm.get("image")?.setValue(this.course.image);
    this.editForm.get("categoryID")?.setValue(this.course.categoryID);
    this.editForm.get("taechers")?.setValue(this.course.teachers);
  }

  ngOnInit(): void {
    this.FileDetail = this.uploadService.getFiles();
  
  }
    course:Icourse={
    tittle:'',
    description:'',
    image:'',
    categoryID:'',
    teachers:[]
  }

  editForm=this.fb.group(
    {
    tittle:[''],
    description:[''],
    image:[''],
    categoryID:[''],
    teachers:[]
   });

  id:String;
  categories: Icategory[] = [];

   get tittle()
   {
     return this.editForm.get('tittle');
   }
   get description()
   {
     return this.editForm.get('description');
   }


   get categoryID()
   {
     return this.editForm.get('categoryID');
   }
   get teachers()
   {
     return this.editForm.get('teachers');
   }
  
  
  submit() 
  {
    var course:Icourse={ 
       tittle:this.tittle?.value,
       description:this.description?.value,
       image:this.fileName,
       categoryID:this.categoryID?.value,
       teachers:this.teachers?.value,
    }
    this.cs.UpdateCourse(this.id,course).subscribe(
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
