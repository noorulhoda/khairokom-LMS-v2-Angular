import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { categoryService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/Shared Classes and types/Iclass';

@Component({
  selector: 'app-get-all-classes',
  templateUrl: './get-all-classes.component.html',
  styleUrls: ['./get-all-classes.component.scss']
})
export class GetAllClassesComponent implements OnInit {
  classList:Iclass[]=[];
  errorMsg:any;
  selectedID:any;
  constructor(private cs:categoryService,private router:Router,private activeRouter:ActivatedRoute) { }

  ngOnInit(): void {
    this.cs.GetAllclass().subscribe(
      Data=>
      {
        this.classList=Data;
      },
      errorResponse=>
      {
       this.errorMsg=errorResponse;
      }
    )
    this.activeRouter.paramMap.subscribe((params:ParamMap)=>
    this.selectedID=params.get('id')
    );
  }

}
