import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryService } from '../../services/category.service';
import { Icategory } from 'src/app/shared/Icategory';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-cateogry',
  templateUrl: './add-cateogry.component.html',
  styleUrls: ['./add-cateogry.component.scss']
})
export class AddCateogryComponent implements OnInit {

  // chosenFiles: FileList;
  // existingFile: File;
  
  // progress = 0;
  // msg = '';

  // FileDetail: Observable<any>;
  // fileName:string;
  constructor(private uploadService: UploadService,private cs:categoryService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    // this.FileDetail = this.uploadService.getFiles();
  }



  // chooseFile(event): void {
  //   this.chosenFiles = event.target.files;
  // }

  // upload(): void {
  //   this.progress = 0;
  
  //   this.existingFile = this.chosenFiles.item(0);

  //   this.uploadService.uploadFile(this.existingFile).subscribe( (event) => {
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round(100 * event.loaded / event.total);
  //       } else if (event instanceof HttpResponse) {
  //         this.msg = event.body.message;
  //         this.FileDetail = this.uploadService.getFiles();
  //         this.fileName=this.existingFile.name;
  //       }
  //     }, (error) => {
  //       this.progress = 0;
  //       this.msg = 'Error occured while uploading file';
  //       this.existingFile = undefined;
  //     });

  //   this.chosenFiles = undefined;
  // }  



  addForm=this.fb.group(
    {
    Title:['',[Validators.required,Validators.minLength(5)]],
    Description:['',[Validators.required,Validators.minLength(5)]],
    Image:[''],
   });

   get Title()
   {
     return this.addForm.get('Title');
   }
   get Description()
   {
     return this.addForm.get('Description');
   }

   get Image()
   {
     return this.addForm.get('Image');
   }
   
 
  submit() 
  {
    var category:Icategory={ 
       Title:this.Title?.value,
       Description:this.Description?.value,
       Image:this.Image?.value
    }
    this.cs.AddCategory(category).subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log(error)
      }
    );
  }


}

