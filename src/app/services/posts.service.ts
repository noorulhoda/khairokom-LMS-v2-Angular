import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import{Ipost} from '../shared/Ipost';
import{catchError} from 'rxjs/operators'
import{postsController} from'../APIs/postsController';
@Injectable({
  providedIn: 'root'
})
export class postsService {
url=postsController.GetAllPosts;
  constructor(private http:HttpClient) { 
  }
  GetAllposts():Observable<Ipost[]>
  {
    return this.http.get<Ipost[]>(this.url).pipe(catchError(err=>{
      return throwError(err.message||"customError happened")
    }));
  }
}
