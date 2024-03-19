import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { SharedModule } from '../shared/shared/shared.module';
import { MessageService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SharedModule,LoaderComponent],
  providers: [MessageService,CookieService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService,private messageService:MessageService,private cookieService:CookieService,private Router:Router){}

  ngOnInit(): void {
    let a =this.cookieService.get('email');
    if(a){
      this.Router.navigate(['/Home']);
    }

  }

  username: string = '';
  email: string = '';
  password: string = '';
  Lemail: string = '';
  Lpassword: string = '';
  showRegister: boolean = false;

  loader:boolean = false;

  EnableRegisterForm(a:any){
    if(a==true){
      this.showRegister = true;
    }else{
      this.showRegister = false;
    }
  }

  Login() {
    this.loader = true;
    if (this.Lemail && this.Lpassword) {
      this.authService.Login(this.Lemail, this.Lpassword).subscribe(
        (response) => {
          this.loader = false;
          // console.log('Server Response:', response);
  
          if (response.success === true) {
            // console.log(JSON.stringify(response));
  
            // Clear previous session data
            this.cookieService.delete('token');
            this.cookieService.delete('username');
            this.cookieService.delete('email');
  
            // Set new session data
            this.cookieService.set('token', response.token);
            this.cookieService.set('username', response.username);
            this.cookieService.set('email', response.email);
  
            this.Router.navigate(['/Home']);
            this.messageService.add({severity:'success', summary:"Confirmation", detail: response.message});
          }else{
            this.messageService.add({severity:'error', summary:"Error", detail: response.message});
          }
        },
        (error) => {
          console.error('Login failed:', error);
          this.loader = false;
        }
      );
    } else {
      this.messageService.add({severity:'warn',summary:"Warning",detail:"Please Enter Email & Password"});
      this.loader = false;
    }
  }
  
  

  Register(){
    if(this.email && this.password && this.username){

      this.authService.Register(this.username,this.email,this.password).subscribe((response)=>{
        if(response.success==true){
          // console.log('Login Success:', response);
          this.messageService.add({severity:'success',summary:"Confirmation",detail:response.message});
          window.location.reload();
        }else{
          this.messageService.add({ severity: 'error', summary: 'Invalid', detail: response.message,});
          console.log('Login failed:', response);
        }
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Server failed',});
        console.error('Registration failed:', error);
      })
    }
    else{
      this.messageService.add({severity:'warn',summary:"Warning",detail:"Please fill all fields"});
    }
  }


}

