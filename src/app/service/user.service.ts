import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONFIG } from '../../environments/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  Update(email:string,Oldpassword:string,Newpassword:string):Observable<any>{
    const data = { email:email ,oldPassword: Oldpassword ,newPassword:Newpassword};
    return this.http.post(CONFIG.USER.UPDATE, data)
  }

  Delete(email:string):Observable<any>{
    const data = { email: email };
    return this.http.delete(CONFIG.USER.DELETE, { body: data });
  }

}
