import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONFIG } from '../../environments/config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  Login(email:string,password:string):Observable<any>{
    const data = { email: email ,password:password};
    return this.http.post(CONFIG.AUTH.LOGIN, data)
  }

  Register(username:string,email:string,password:string):Observable<any>{
    const data = { username:username , email: email , password:password};
    return this.http.post(CONFIG.AUTH.REGISTER, data)
  }


}
