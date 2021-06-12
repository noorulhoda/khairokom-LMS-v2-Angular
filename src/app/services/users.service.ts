import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Iuser} from '../shared/Iuser';
import{catchError} from 'rxjs/operators'
import{usersController} from'../APIs/usersController';
import { baseUrl } from '../config';
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

Register( user:Iuser): Observable<any>{
  return this.http.post(baseUrl+"/api/signup", user, httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}

Login(user:any): Observable<any>{
  return this.http.post(baseUrl+"/api/signin", user,httpOptions).pipe(catchError((err)=>
  {
    return throwError(err.message ||"Internal Server error contact site adminstarator");
  }));
}

  GetAllusers():Observable<Iuser[]>
  {
    return this.http.get<Iuser[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }
  getUserById(id:string):Observable<Iuser>
  {
    return this.http.get<Iuser>(this.url+"/"+id).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  updateUser(id, user): Observable<any> {
    return this.http.put(`${this.url}/${id}`, user,httpOptions);
  }

  deleteUser(id:string): Observable<any>{
    return this.http.delete(this.url+"/"+id, httpOptions).pipe(catchError((err)=>
    {
      return throwError(err.message ||"Internal Server error contact site adminstarator");
    }));
  }
  findByUserName(userName:string): Observable<Iuser>{
    return this.http.get<Iuser>(this.url+"/name/"+userName).pipe(catchError((err)=>
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