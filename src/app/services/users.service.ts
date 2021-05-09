import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Iuser} from '../Shared Classes and types/Iuser';
import{catchError} from 'rxjs/operators'
import{usersController} from'../APIs/usersController';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
url=usersController.GetAllUsers;//api/user
  constructor(private http:HttpClient) { 
  
  }
  GetAllusers():Observable<Iuser[]>
  {
    return this.http.get<Iuser[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }


///errror heere
  getUserById(id:string):Observable<Iuser>
  {
    return this.http.get<Iuser>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }

  updateUser(id:number, user:Iuser): Observable<any>{
    return this.http.put(this.url+"/"+id, user, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  deleteUser(id:number): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }


}
/*
addProduct(product:IProduct): Observable<any>{
  return this.http.post(Url,product, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}


searchProduct(keyword:string): Observable<any>{
  return this.http.get<IProduct[]>(Url+"/api/Products/Search/"+keyword, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}


uploadProductImage(formData:FormData): Observable<any>{
  return this.http.post(Url+"/uploadImage", formData).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}

getProductByCategoryId(id:number): Observable<IProduct[]>{
  return this.http.get<IProduct[]>(Url+"/Category/"+id, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}
}*/