import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UploadService {

  private endpoint = 'http://localhost:8888';

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const request = new HttpRequest('POST', `${this.endpoint}/upload-file`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(request);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.endpoint}/files`);
  }

}
