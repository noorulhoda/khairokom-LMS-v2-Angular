import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Irole } from 'src/app/shared/Irole';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-get-all-roles',
  templateUrl: './get-all-roles.component.html',
  styleUrls: ['./get-all-roles.component.scss']
})
export class GetAllRolesComponent implements OnInit {

  role: Irole;
  id: string = 'defaultID';
  errMsg = 'errroor';
  roles: Irole[] = [];
  constructor(private roleServices: RolesService, private router: Router, private route: ActivatedRoute) {
    this.getRoles();
  }

  ngOnInit(): void {
  }
  getRoles() {
    this.roleServices.GetAllroles().subscribe(
      data => {
        this.roles = data

      }
    );
  }

  sureDelete:Boolean=false;
  deleteNew:Boolean=true;
  delete(id) {
    if(this.deleteNew){
      alert(" سوف تقوم بحذف الصلاحية إذا كنت متأكدا أغلق هذه النافذة واضغط مرة أخرى  على زر الحذف ")
      this.sureDelete=true; 
      this.deleteNew=false;
     }
     else if(this.sureDelete){

      this.roleServices.deleteRole(id).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("Error-_-" + error)
        }
      );
      window.location.reload();
  }
  }
}

