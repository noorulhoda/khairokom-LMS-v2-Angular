import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/category.service';
import { Icategory } from 'src/app/Shared Classes and types/Icategory';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private fb:FormBuilder,private categoryservice:categoryService,private route:ActivatedRoute,private router:Router) { }

  updateForm=this.fb.group({
    Title:['',[Validators.required,Validators.minLength(5)]],
    Description:['',[Validators.required,Validators.minLength(10)]],
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
}

ngOnInit(): void 
{
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    this.id=params['id'] //log the value of id
    console.log('id : '+(this.id));
    
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
  Image:this.Image?.value
  
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


}



