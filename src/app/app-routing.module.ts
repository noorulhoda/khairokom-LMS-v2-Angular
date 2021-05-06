import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import{ProductsComponent} from './products/products.component';
import{PostsComponent} from './posts/posts.component';
import{NotFoundComponent} from './not-found/not-found.component';
import{HomeComponent} from './home/home.component';
import { ChildRootComponent } from './child-root/child-root.component';
import { ChildRoot2Component } from './child-root2/child-root2.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveregisterComponent } from './reactiveregister/reactiveregister.component';
import { NotesComponent } from './notes/notes.component';
import { AddComponent } from './Course/add/add.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'notes',component:NotesComponent},
  {path:'reactiveregister',component:ReactiveregisterComponent},
  {path:'home',component:HomeComponent},  
  {path:'addCourse',component:AddComponent},
  {path:'products',component:ProductsComponent,
  children:[
    {path:'child',component:ChildRootComponent },
    {path:'child2',component:ChildRoot2Component }
  ]
},
  {path:'posts',component:PostsComponent},
   {path:'**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
