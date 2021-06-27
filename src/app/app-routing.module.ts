import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{NotFoundComponent} from './not-found/not-found.component';

import{HomeComponent} from './home/home.component';

import {AddCateogryComponent} from './Category/add-cateogry/add-cateogry.component';
import {GetAllCateogriesComponent} from './Category/get-all-cateogries/get-all-cateogries.component';
import {getCategoryByIdComponent} from './Category/get-cateogry-by-id/get-cateogry-by-id.component';
import {UpdateCategoryComponent} from './Category/update-category/update-category.component';
import {GetAllCategoriesAdminComponent} from './Category/get-all-categories-admin/get-all-categories-admin.component'

import {AddClassComponent} from './Class/add-class/add-class.component';
import {GetAllClassesComponent} from './Class/get-all-classes/get-all-classes.component';
import {GetClassByIDComponent} from './Class/get-class-by-id/get-class-by-id.component';
import {UpdateClassComponent} from './Class/update-class/update-class.component'
import {GetAllClassesAdminComponent} from './Class/get-all-classes-admin/get-all-classes-admin.component'

import {AddCourseComponent} from './Course/add-course/add-course.component';
import {UpdateCourseComponent} from './Course/update-course/update-course.component';
import { GetAllCoursesComponent } from './Course/get-all-courses/get-all-courses.component';

import {GetCourseByIDComponent} from './Course/get-course-by-id/get-course-by-id.component';
import {GetAllCoursesAdminComponent} from './Course/get-all-courses-admin/get-all-courses-admin.component'

import { GetSessionByIdComponent } from './Session/get-session-by-id/get-session-by-id.component';
import { GetAllSessionsComponent } from './Session/get-all-sessions/get-all-sessions.component';
import { AddSessionComponent } from './Session/add-session/add-session.component';
import { UpdateSessionComponent } from './Session/update-session/update-session.component';
import { GetAllSessionsAdminComponent } from './Session/get-all-sessions-admin/get-all-sessions-admin.component';

import {AddRoleComponent} from './Role/add-role/add-role.component'
import {GetAllRolesComponent} from './Role/get-all-roles/get-all-roles.component'
import {GetRoleByIDComponent} from './Role/get-role-by-id/get-role-by-id.component'
import {UpdateRoleComponent} from './Role/update-role/update-role.component'

import {ProfileComponent} from './users/profile/profile.component'
import {EdituserComponent} from './users/edituser/edituser.component';
import {RegisterComponent} from './users/register/register.component';
import {LoginComponent} from './users/login/login.component';
import {GetAllComponent} from './users/get-all/get-all.component';
import { MyCoursesComponent } from './users/my-courses/my-courses.component';

import {DashboardComponent} from './Admin_Dashboard/dashboard/dashboard.component';
import {PermissionManagementComponent} from './Admin_Dashboard/permission-management/permission-management.component'
import {WaitingstudentsComponent} from './Admin_Dashboard/waitingstudents/waitingstudents.component';
import {WaitingTeachersComponent} from './Admin_Dashboard/waiting-teachers/waiting-teachers.component';
import { StudentFeedbackComponent } from './FeedBacks/student-feedback/student-feedback.component';
import { TeacherFeedbackComponent } from './FeedBacks/teacher-feedback/teacher-feedback.component';
import { DetailedFeedbackComponent } from './FeedBacks/detailed-feedback/detailed-feedback.component';
import {DetailedMessagesComponent} from './Admin_Dashboard/detailed-messages/detailed-messages.component'
import { AdminGaurdService } from './guards/admin-gaurd.service';
import { SuperAdminGaurdService } from './guards/super-admin-gaurd.service';



const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},

  {path:'home',component:HomeComponent}, 

  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'updateUser/:id',component:EdituserComponent},
  {path:'getAllUsers',component:GetAllComponent,canActivate: [ AdminGaurdService ]},
  {path:'profile/:id',component:ProfileComponent},
  {path:'myCourses/:id',component:MyCoursesComponent},
  
  {path:'addCategory',component:AddCateogryComponent,canActivate: [ AdminGaurdService ]},
  {path:'getAllCategories',component:GetAllCateogriesComponent},
  {path:'getCategoryById/:id',component:getCategoryByIdComponent},
  {path:'updateCategory/:id',component:UpdateCategoryComponent,canActivate: [ AdminGaurdService ]},
  {path:'getAllCategoriesAdmin',component:GetAllCategoriesAdminComponent,canActivate: [ AdminGaurdService ]},

  {path:'addClass',component:AddClassComponent,canActivate: [ AdminGaurdService ]},  
  {path:'getAllClasses',component:GetAllClassesComponent}, // back
  {path:'getClassById/:id',component:GetClassByIDComponent},
  {path:'updateClass/:id',component:UpdateClassComponent,canActivate: [ AdminGaurdService ]},
  {path:'getAllClassesAdmin',component:GetAllClassesAdminComponent,canActivate: [ AdminGaurdService ]},

  {path:'addCourse',component:AddCourseComponent,canActivate: [ AdminGaurdService ]},
  {path:'updateCourse/:id',component:UpdateCourseComponent,canActivate: [ AdminGaurdService ]},
  {path:'getAllCourses',component:GetAllCoursesComponent},
  {path:'getCourseById/:id',component:GetCourseByIDComponent}, // back
  {path:'getAllCoursesAdmin',component:GetAllCoursesAdminComponent,canActivate: [ AdminGaurdService ]},

  {path:'getSessionById/:id',component:GetSessionByIdComponent},
  {path:'updateSession/:id',component:UpdateSessionComponent},
  {path:'getAllSessions',component:GetAllSessionsComponent},
  {path:'addSession',component:AddSessionComponent},
  {path:'getAllSessionsAdmin',component:GetAllSessionsAdminComponent},

  {path:'addRole',component:AddRoleComponent,canActivate: [ AdminGaurdService ]},
  {path:'getAllRoles',component:GetAllRolesComponent,canActivate: [ AdminGaurdService ]},
  {path:'getRoleByID/:id',component:GetRoleByIDComponent,canActivate: [ AdminGaurdService ]}, // back
  {path:'updateRole/:id',component:UpdateRoleComponent,canActivate: [ AdminGaurdService ]},

  {path:'admin',component:DashboardComponent,canActivate: [ AdminGaurdService ]},
  {path:'permissionManagement',component:PermissionManagementComponent,canActivate: [ SuperAdminGaurdService ]},
  {path:'waitingStudents/:id',component:WaitingstudentsComponent,canActivate: [ AdminGaurdService ]},//notificationId
  {path:'waitingTeachers/:id',component:WaitingTeachersComponent,canActivate: [ AdminGaurdService ]},
  {path:'detailedMessages/:id',component:DetailedMessagesComponent,canActivate: [ AdminGaurdService ]},

  {path:'studentFeedback/:notificationId',component:StudentFeedbackComponent},
  {path:'teacherFeedback/:notificationId',component:TeacherFeedbackComponent},
  {path:'detailedFeedback/:courseId',component:DetailedFeedbackComponent},
  
  
  {path:'**',component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
exports: [RouterModule]
})
export class AppRoutingModule { }
