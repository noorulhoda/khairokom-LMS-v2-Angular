import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryService } from 'src/app/services/class.service';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.scss']
})
export class UpdateClassComponent implements OnInit {

  constructor(private fb:FormBuilder,private cs:categoryService,private route:ActivatedRoute,private router:Router) { }
  updateForm=this.fb.group({  
    Number:['',[Validators.required,Validators.minLength(5)]],
    StudentsMinAge:['',[Validators.required,Validators.minLength(5)]],
    StudentsMaxAge:['',[Validators.required,Validators.minLength(5)]],
    StudentGender:['',[Validators.required,Validators.minLength(5)]],
    ClassLink:['',[Validators.required,Validators.minLength(5)]],
    ClassLinkPassword:['',[Validators.required,Validators.minLength(5)]],
    StartTime:[''],
    EndTime:['']
  });
  ngOnInit(): void {
  }

}
