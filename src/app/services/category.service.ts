import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Icategory} from '../Shared Classes and types/Icategory';
import{catchError} from 'rxjs/operators'
import{categoryController} from'../APIs/categoryController';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class categoryService {
url=categoryController.GetAllCategories;//api/user
  constructor(private http:HttpClient) { 
  
  }
  GetAllcateories():Observable<Icategory[]>
  {
    return this.http.get<Icategory[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }

  getCategoryById(id:string):Observable<Icategory>
  {
    return this.http.get<Icategory>(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  updateCategory(id:number, category:Icategory): Observable<any>{
    return this.http.put(this.url+"/"+id, category, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  
  deleteCategory(id:number): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }


}
