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
    DicountpercentPipe,
    NotFoundComponent,
    HomeComponent,
    ChildRootComponent,
    ChildRoot2Component,
    LoginComponent,
    RegisterComponent,
    GetAllComponent,
    ProfileComponent,
    AddCateogryComponent,
    UpdateCategoryComponent,
    AddComponent,
    DeleteCategoryComponent,
    GetCateogryByIDComponent,
    GetAllCateogriesComponent,
    AddClassComponent,
    DeleteClassComponent,
    UpdateClassComponent,
    GetAllClassesComponent,
    AddClassComponent,
    GetClassByIDComponent,
    AddCateogryComponent
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
import { DicountpercentPipe } from './pipes/dicountpercent.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ChildRootComponent } from './child-root/child-root.component';
import { ChildRoot2Component } from './child-root2/child-root2.component';
import { LoginComponent } from './users/login/login.component';
import { GetAllComponent } from './users/get-all/get-all.component';
import { ProfileComponent } from './users/profile/profile.component';
import { UpdateCategoryComponent } from './Category/update-category/update-category.component';
import { AddComponent } from './Course/add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './users/register/register.component';
import { DeleteCategoryComponent } from './Category/delete-category/delete-category.component';
import { GetCateogryByIDComponent } from './Category/get-cateogry-by-id/get-cateogry-by-id.component';
import { GetAllCateogriesComponent } from './Category/get-all-cateogries/get-all-cateogries.component';
import { DeleteClassComponent } from './Class/delete-class/delete-class.component';
import { UpdateClassComponent } from './Class/update-class/update-class.component';
import { GetAllClassesComponent } from './Class/get-all-classes/get-all-classes.component';
import { AddClassComponent } from './Class/add-class/add-class.component';
import { GetClassByIDComponent } from './Class/get-class-by-id/get-class-by-id.component';
import { AddCateogryComponent } from './Category/add-cateogry/add-cateogry.component';

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