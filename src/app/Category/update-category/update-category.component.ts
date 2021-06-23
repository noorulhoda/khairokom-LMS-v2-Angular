import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { categoryService } from 'src/app/services/category.service';
import { UploadService } from 'src/app/services/upload.service';
import { Icategory } from 'src/app/shared/Icategory';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  chosenFiles: FileList;
  existingFile: File;
  
  progress = 0;
  msg = '';

  FileDetail: Observable<any>;
  fileName:string;
  constructor(private uploadService: UploadService,private fb:FormBuilder,private categoryservice:categoryService,private route:ActivatedRoute,private router:Router) { }

  updateForm=this.fb.group({
    Title:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
    Description:['',[Validators.required,Validators.minLength(50)]],
    Image:[''],
  });

get Title()
{
  return this.updateForm.get('Title');
}
get Description()
{
  return this.updateForm.get('Description');
}
get Image()
{
  return this.updateForm.get('Image');
}

category:Icategory;
id:string='defaultID';
errMsg='errroor';


loadApiData()
{
    
    this.updateForm.patchValue({
    Title:this.category.Title,
    Description:this.category.Description,
    Image:this.category.Image,
 
  })
  this.fileName=this.category.Image;
  
}

ngOnInit(): void 
{
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    this.id=params['id'] //log the value of id
    console.log('id : '+(this.id));


    this.FileDetail = this.uploadService.getFiles();
  
    
});


this.categoryservice.getCategoryById(this.id).subscribe(
 
    data => {this.category= data[0]; console.log(this.id);console.log(this.category);this.loadApiData()},
    er =>this.errMsg=er ,
  );
  console.log(this.category)
}

update()
{  
  var newcategory: Icategory = {
  Title: this.Title?.value,
  Description:this.Description?.value,
  Image:this.fileName
  
}
console.log(newcategory)

this.categoryservice.updateCategory(this.id,newcategory)
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
      this.msg = 'حدث خطأ اثناء رفع الصورة يرجى المحاولة مرة أخرى';
      this.existingFile = undefined;
    });

  this.chosenFiles = undefined;
}  









}



