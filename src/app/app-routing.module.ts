import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{NotFoundComponent} from './not-found/not-found.component';
import{HomeComponent} from './home/home.component';
import { RegisterComponent } from './users/register/register.component';
import {AddCateogryComponent} from './Category/add-cateogry/add-cateogry.component';
import { GetAllCateogriesComponent } from './Category/get-all-cateogries/get-all-cateogries.component';
import { GetCateogryByIDComponent } from './Category/get-cateogry-by-id/get-cateogry-by-id.component';
import{UpdateCategoryComponent}from './Category/update-category/update-category.component';
import {GetAllCategoriesAdminComponent} from './Category/get-all-categories-admin/get-all-categories-admin.component'
import {AddClassComponent} from './Class/add-class/add-class.component';
import { GetAllClassesComponent } from './Class/get-all-classes/get-all-classes.component';
import { GetClassByIDComponent } from './Class/get-class-by-id/get-class-by-id.component';
import{UpdateClassComponent}from './Class/update-class/update-class.component'
import{GetAllClassesAdminComponent}from './Class/get-all-classes-admin/get-all-classes-admin.component'
import { LoginComponent } from './users/login/login.component';
import{GetAllComponent} from './users/get-all/get-all.component';
import{ProfileComponent} from './users/profile/profile.component'
import { EdituserComponent } from './users/edituser/edituser.component';
import { AddComponent } from './Course/add/add.component';
import { EditCourseComponent } from './Course/edit-course/edit-course/edit-course.component';
import { GetAllCoursesComponent } from './Course/get-all-courses/get-all-courses/get-all-courses.component';
import { CourseDetailsComponent } from './Course/course-details/course-details/course-details.component';
import {GetAllCoursesAdminComponent} from './Course/get-all-courses-admin/get-all-courses-admin.component'
import { GetSessionByIdComponent } from './Session/get-session-by-id/get-session-by-id.component';
import { GetAllSessionsComponent } from './Session/get-all-sessions/get-all-sessions.component';
import { AddSessionComponent } from './Session/add-session/add-session.component';
import { UpdateSessionComponent } from './Session/update-session/update-session.component';
import { UploadComponent } from './upload/upload.component';
import {DashboardComponent} from './Admin_Dashboard/dashboard/dashboard.component'

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'updateUser/:id',component:EdituserComponent},
  {path:'getAllUsers',component:GetAllComponent},
  {path:'home',component:HomeComponent},  
  {path:'addCategory',component:AddCateogryComponent},
  {path:'getAllCategories',component:GetAllCateogriesComponent},
  {path:'getCateogryById/:id',component:GetCateogryByIDComponent},
  {path:'updateCategory/:id',component:UpdateCategoryComponent},
  {path:'getAllCategoriesAdmin',component:GetAllCategoriesAdminComponent},
  {path:'addClass',component:AddClassComponent},
  {path:'getAllClasses',component:GetAllClassesComponent},
  {path:'getClassById/:id',component:GetClassByIDComponent},
  {path:'updateClass/:id',component:UpdateClassComponent},
  {path:'GetAllClassesAdmin',component:GetAllClassesAdminComponent},
  {path:'updateSession/:id',component:UpdateSessionComponent},
  {path:'profile/:id',component:ProfileComponent},
  {path:'addCourse',component:AddComponent},
  {path:'updateCourse/:id',component:EditCourseComponent},
  {path:'getAllCourses',component:GetAllCoursesComponent},
  {path:'getCourseById/:id',component:CourseDetailsComponent},
  {path:'getAllCoursesAdmin',component:GetAllCoursesAdminComponent},
  {path:'getSessionById/:id',component:GetSessionByIdComponent},
  {path:'getAllSessions',component:GetAllSessionsComponent},
  {path:'addSession',component:AddSessionComponent},
  {path:'upload',component:UploadComponent},
  {path:'Admin',component:DashboardComponent},  
  {path:'**',component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
