import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { categoryService } from '../../services/category.service';
import { Icategory } from 'src/app/Shared Classes and types/Icategory';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-cateogry',
  templateUrl: './add-cateogry.component.html',
  styleUrls: ['./add-cateogry.component.scss']
})
export class AddCateogryComponent implements OnInit {

  constructor(private cs:categoryService,private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
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

