import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{NotFoundComponent} from './not-found/not-found.component';
import{HomeComponent} from './home/home.component';
import { RegisterComponent } from './users/register/register.component';
import { AddComponent } from './Course/add/add.component';
import {AddCateogryComponent} from './Category/add-cateogry/add-cateogry.component';
import { GetAllCateogriesComponent } from './Category/get-all-cateogries/get-all-cateogries.component';
import { GetCateogryByIDComponent } from './Category/get-cateogry-by-id/get-cateogry-by-id.component';
import{UpdateCategoryComponent}from './Category/update-category/update-category.component'
import { LoginComponent } from './users/login/login.component';
import{GetAllComponent} from './users/get-all/get-all.component';
import{ProfileComponent} from './users/profile/profile.component'
import { EdituserComponent } from './users/edituser/edituser.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent},  
  {path:'addCourse',component:AddComponent},
  {path:'AddCategory',component:AddCateogryComponent},
  {path:'GetAllCateogries',component:GetAllCateogriesComponent},
  {path:'GetCateogryByIDComponent/:id',component:GetCateogryByIDComponent},
  {path:'UpdateCategoryComponent/:id',component:UpdateCategoryComponent},
  {path:'**',component:NotFoundComponent}
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
