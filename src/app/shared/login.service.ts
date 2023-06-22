import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loginModel } from '../register/login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http:HttpClient) { }
  baseurl: string = "http://localhost:3000/login"
  postlogin(data: any) {
    return this.http.post<loginModel>("http://localhost:3000/login", data);
     
  }
  getlogin() {
    return this.http.get<loginModel[]>(this.baseurl);
      
  }

}
