import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/services/roles.service';
import { UsersService } from 'src/app/services/users.service';
import { Irole } from 'src/app/shared/Irole';
import { Iuser } from 'src/app/shared/Iuser';

@Component({
  selector: 'app-permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.scss']
})
export class PermissionManagementComponent implements OnInit {
  user: Iuser;
  role: Irole;
  arrayRole = [];
  arrayUser = [];
  idUser: string = 'defaultID';
  idRole: string = 'defaultID';
  errMsg = 'errroor';
  users: Iuser[] = [];
  roles: Irole[] = [];
  constructor(private roleService: RolesService, private userServices: UsersService, private router: Router, private route: ActivatedRoute) {
    this.getUsers();
    this.getRoles();
  }
  ngOnInit(): void {
  }
  getUsers() {
    this.userServices.GetAllusers().subscribe(
      data => {
        this.users = data
      }
    );
  }
  getRoles() {
    this.roleService.GetAllroles().subscribe(
      data => {
        this.roles = data
      }
    );
  }

  onChange(userId, roleId, isChecked) {
    this.idRole = roleId;
    this.idUser = userId;

    this.userServices.getUserById(userId).subscribe(
      data => {
        this.user = data[0]
        this.arrayRole = data[0]['roles']

        this.roleService.getRoleById(roleId).subscribe(
          data1 => {

            this.role = data1[0]
            this.arrayUser = data1[0]['users']
            if (isChecked == true) {

              console.log(this.arrayRole)
              console.log(this.arrayUser)
              console.log("-------------")

              this.arrayUser.push(userId);
              this.role.users = this.arrayUser;

              this.role.users = this.role.users.filter((element, i) => i === this.role.users.indexOf(element));
              console.log("updateUsers*********************")
              console.log(this.role.users)

              this.arrayRole.push(roleId);
              this.user.roles = this.arrayRole
              this.user.roles = this.user.roles.filter((element, i) => i === this.user.roles.indexOf(element));

              console.log("updateRoles************************")
              console.log(this.user.roles)
              this.filterRoles();
              this.filterUsers();
            }

            else {
              this.arrayRole.forEach((element, index) => {
                if (element == roleId) this.arrayRole.splice(index, 1);
              });

              this.arrayUser.forEach((element, index) => {
                if (element == userId) this.arrayUser.splice(index, 1);
              });
              this.deleteOldRoles(roleId);
              this.deleteOldUsers(userId);

              console.log("afpoR")
              console.log(this.arrayRole);

              console.log("afpoU")
              console.log(this.arrayUser);
              this.filterRoles();
              this.filterUsers();
            }
          },
          er => this.errMsg = er ,
        );
      },
      er => this.errMsg = er ,
    );



  }
  deleteOldRoles(roleId) {
    this.user.roles.forEach((element, index) => {
      if (element == roleId) this.user.roles.splice(index, 1);
    });
  }
  deleteOldUsers(userId) {
    this.role.users.forEach((element, index) => {
      if (element == userId) this.role.users.splice(index, 1);
    });
  }

  filterRoles() {

    this.userServices.updateUser(this.idUser, this.user)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("Error" + error)
        }
      );

  }
  filterUsers() {

    this.roleService.updateRole(this.idRole, this.role)
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log("Error" + error)
        }
      );
  }

}

