import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    DicountpercentPipe,
    PostsComponent,
    usersComponent,
    NotFoundComponent,
    HomeComponent,
    ChildRootComponent,
    ChildRoot2Component,
    RegisterComponent,
    ReactiveregisterComponent,
    NotesComponent,
    LoginComponent,
    GetAllComponent,
    ProfileComponent,
    EditComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddCourseComponent,
    AddComponent
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
import { ProductsComponent } from './products/products.component';
import { DicountpercentPipe } from './pipes/dicountpercent.pipe';
import { PostsComponent } from './posts/posts.component';
import { usersComponent} from './users/users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ChildRootComponent } from './child-root/child-root.component';
import { ChildRoot2Component } from './child-root2/child-root2.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveregisterComponent } from './reactiveregister/reactiveregister.component';
import { NotesComponent } from './notes/notes.component';
import { LoginComponent } from './users/login/login.component';
import { GetAllComponent } from './users/get-all/get-all.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EditComponent } from './users/edit/edit.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { UpdateCategoryComponent } from './Category/update-category/update-category.component';
import { AddCourseComponent } from './Course/add-course/add-course.component';
import { AddComponent } from './Course/add/add.component';


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