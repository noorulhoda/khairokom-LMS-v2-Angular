import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    GetAllComponent,
    ProfileComponent,
    AddCateogryComponent,
    UpdateCategoryComponent,
    GetCateogryByIDComponent,
    GetAllCateogriesComponent,
    AddClassComponent,
    UpdateClassComponent,
    GetAllClassesComponent,
    AddClassComponent,
    GetClassByIDComponent,
    AddCateogryComponent,
    EdituserComponent,
    IndexCourseComponent,
    IndexCategoryComponent,
    AddSessionComponent,
    GetAllSessionsComponent,
    GetSessionByIdComponent,
    UpdateSessionComponent,

    DashboardComponent,
    GetAllCategoriesAdminComponent,
    GetAllClassesAdminComponent,
    GetAllCoursesAdminComponent,
    AddRoleComponent,
    UpdateRoleComponent,
    GetAllRolesComponent,
    GetRoleByIDComponent,
    PermissionManagementComponent,
    DashboardHeaderComponent,
    DashboardFooterComponent,
    WaitingstudentsComponent,
    WaitingTeachersComponent,
    AddCourseComponent,
    GetCourseByIDComponent,
    UpdateCourseComponent,
    MyCoursesComponent,
    GetAllSessionsAdminComponent,
    TeacherFeedbackComponent,
    StudentFeedbackComponent,
    DetailedFeedbackComponent,
    GetAllCoursesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

////////
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './users/login/login.component';
import { GetAllComponent } from './users/get-all/get-all.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UpdateCategoryComponent } from './Category/update-category/update-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import { GetCateogryByIDComponent } from './Category/get-cateogry-by-id/get-cateogry-by-id.component';
import { GetAllCateogriesComponent } from './Category/get-all-cateogries/get-all-cateogries.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { GetAllClassesComponent } from './Class/get-all-classes/get-all-classes.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { GetClassByIDComponent } from './Class/get-class-by-id/get-class-by-id.component';
import { AddCateogryComponent } from './Category/add-cateogry/add-cateogry.component';
import { EdituserComponent } from './users/edituser/edituser.component';
import { IndexCourseComponent } from './index-course/index-course.component';
import { IndexCategoryComponent } from './index-category/index-category.component';
import { AddSessionComponent } from './Session/add-session/add-session.component';
import { GetAllSessionsComponent } from './Session/get-all-sessions/get-all-sessions.component';
import { GetSessionByIdComponent } from './Session/get-session-by-id/get-session-by-id.component';
import { UpdateSessionComponent } from './Session/update-session/update-session.component';

import { DashboardComponent } from './Admin_Dashboard/dashboard/dashboard.component';
import { GetAllCategoriesAdminComponent } from './Category/get-all-categories-admin/get-all-categories-admin.component';
import { GetAllClassesAdminComponent } from './Class/get-all-classes-admin/get-all-classes-admin.component';
import { GetAllCoursesAdminComponent } from './Course/get-all-courses-admin/get-all-courses-admin.component';
import { AddRoleComponent } from './Role/add-role/add-role.component';
import { UpdateRoleComponent } from './Role/update-role/update-role.component';
import { GetAllRolesComponent } from './Role/get-all-roles/get-all-roles.component';
import { GetRoleByIDComponent } from './Role/get-role-by-id/get-role-by-id.component';
import { PermissionManagementComponent } from './Admin_Dashboard/permission-management/permission-management.component';
import{DashboardHeaderComponent} from './Admin_Dashboard/dashboard-header/dashboard-header.component'
import { DashboardFooterComponent } from './Admin_Dashboard/dashboard-footer/dashboard-footer.component';
import { WaitingstudentsComponent } from './Admin_Dashboard/waitingstudents/waitingstudents.component';
import { WaitingTeachersComponent } from './Admin_Dashboard/waiting-teachers/waiting-teachers.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { GetCourseByIDComponent } from './Course/get-course-by-id/get-course-by-id.component';
import { UpdateCourseComponent } from './Course/update-course/update-course.component';
import { MyCoursesComponent } from './users/my-courses/my-courses.component';
import { GetAllSessionsAdminComponent } from './Session/get-all-sessions-admin/get-all-sessions-admin.component';
import { TeacherFeedbackComponent } from './FeedBacks/teacher-feedback/teacher-feedback.component';
import { StudentFeedbackComponent } from './FeedBacks/student-feedback/student-feedback.component';
import { DetailedFeedbackComponent } from './FeedBacks/detailed-feedback/detailed-feedback.component';
import { GetAllCoursesComponent } from './Course/get-all-courses/get-all-courses.component';
@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    
  ],
  // ...
})
export class AppBootstrapModule {}