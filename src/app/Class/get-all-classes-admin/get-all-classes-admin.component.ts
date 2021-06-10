import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { classService } from 'src/app/services/class.service';
import { Iclass } from 'src/app/shared/Iclass';
import { Icourse } from 'src/app/shared/Icourse';

@Component({
  selector: 'app-get-all-classes-admin',
  templateUrl: './get-all-classes-admin.component.html',
  styleUrls: ['./get-all-classes-admin.component.scss']
})
export class GetAllClassesAdminComponent implements OnInit {
  clas:Iclass;
  course:Icourse;
  id:string='defaultID';
  errMsg='errroor';
  classes: Iclass[] = [];
  constructor(private classServices: classService,private router:Router,private route:ActivatedRoute) {
    this.getClasses();
  }

  ngOnInit(): void {
  }
  getClasses() {
    this.classServices.GetAllclass().subscribe(
      data => {
        this.classes = data

      }
    );
  }
  delete(id) {
    this.classServices.deleteCLass(id)
      .subscribe(
        data => {
          this.router.navigateByUrl("")
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
  }

}
