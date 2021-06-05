import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/shared/Iclass';

@Component({
  selector: 'app-get-class-by-id',
  templateUrl: './get-class-by-id.component.html',
  styleUrls: ['./get-class-by-id.component.scss']
})
export class GetClassByIDComponent implements OnInit {

  constructor(private cs:classService,private route:ActivatedRoute,private router:Router) { }
  clas:Iclass;
  id:string='defaultID';
  errMsg='errroor';
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
    this.route.params.subscribe(params => {
     console.log(params) //log the entire params object
     this.id=params['id'] //log the value of id
     console.log('id : '+(this.id));
    });
 
    this.cs.getClassById(this.id).subscribe(
     
        data => {this.clas= data[0]; console.log(this.id);console.log(this.clas);},
        er =>this.errMsg=er ,
      );
      console.log(this.clas)
  }
  delete(){
    this.cs.deleteCLass(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    );  
  }
   

}
