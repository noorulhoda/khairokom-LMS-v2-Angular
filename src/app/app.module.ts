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
    AddComponent,
    GetCateogryByIDComponent,
    GetAllCateogriesComponent,
    AddClassComponent,
    UpdateClassComponent,
    GetAllClassesComponent,
    AddClassComponent,
    GetClassByIDComponent,
    AddCateogryComponent,
    EdituserComponent,
    GetAllCoursesComponent,
    CourseDetailsComponent,
    EditCourseComponent,
    IndexCourseComponent,
    IndexCategoryComponent,
    AddSessionComponent,
    GetAllSessionsComponent,
    GetSessionByIdComponent,
    UpdateSessionComponent,
    UploadComponent
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
import { AddComponent } from './Course/add/add.component';
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
import { GetAllCoursesComponent } from './Course/get-all-courses/get-all-courses/get-all-courses.component';
import { CourseDetailsComponent } from './Course/course-details/course-details/course-details.component';
import { EditCourseComponent } from './Course/edit-course/edit-course/edit-course.component';
import { IndexCourseComponent } from './index-course/index-course.component';
import { IndexCategoryComponent } from './index-category/index-category.component';
import { AddSessionComponent } from './Session/add-session/add-session.component';
import { GetAllSessionsComponent } from './Session/get-all-sessions/get-all-sessions.component';
import { GetSessionByIdComponent } from './Session/get-session-by-id/get-session-by-id.component';
import { UpdateSessionComponent } from './Session/update-session/update-session.component';
import {UploadComponent} from './upload/upload.component';
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