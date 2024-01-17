import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SharedModule } from '../shared/shared/shared.module';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule,CommonModule],
  providers: [MessageService,ConfirmationService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  constructor(private cookieService:CookieService, private Router:Router ,private confirmationService:ConfirmationService, private messageService:MessageService , private userService:UserService){}
  ngOnInit(): void {
    this.email =this.cookieService.get('email');
    this.name =this.cookieService.get('username');
    if(!this.email){
      this.Router.navigate(['/Login']);
    }
  }

  email: string = '';
  name: string = '';
  Oldpassword: string = '';
  Newpassword: string = '';

  visible: boolean = false;


  logout(){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?', header: 'Confirmation', icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
          this.cookieService.delete('token');
          this.cookieService.delete('username');
          this.cookieService.delete('email');
          this.Router.navigate(['/Login']);
      },
      reject: () => {
        
      }
  }); 
  }

  delete() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Delete Account?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.performDelete();
      }
    });
  }
  

  performDelete(){
    this.userService.Delete(this.email).subscribe((response)=>{
        if(response.success === true){
          this.messageService.add({severity:'success',summary:"Confirmation",detail:response.message});
          this.cookieService.delete('token');
          this.cookieService.delete('username');
          this.cookieService.delete('email');
          setTimeout(()=>{
          this.Router.navigate(['/Login']);
          },2000)
        }else{
          this.messageService.add({ severity: 'error', summary: 'Invalid', detail: response.message });
          console.log('Delete User failed:', response);
        }
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Server failed',});
          console.error('Delete User failed:', error);
        })

      }

  update(){
   this.userService.Update(this.email,this.Oldpassword,this.Newpassword).subscribe(
    (response)=>{
      if(response.success === true){
        this.messageService.add({severity:'success',summary:"Update",detail:response.message});
        this.closeDialog();
        this.Newpassword = '';
        this.Oldpassword = '';
      }else{
        this.messageService.add({severity:'error',summary:"Invalid",detail:response.message});
        this.Newpassword = '';
        this.Oldpassword = '';
      }
   },
   (error) => {
    this.messageService.add({ severity: 'error', summary: 'Error ', detail: 'Server failed',});
    console.error('Delete User failed:', error);
  })
  }

  showDialog() {
    this.visible = true;
  }

 closeDialog() {
   this.visible = false;
 }

}
