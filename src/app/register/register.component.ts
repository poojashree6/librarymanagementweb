import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loginModel } from './login.model';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
loginData!:loginModel[];

constructor(private login:LoginService){}

  LoginForm = new FormGroup({ 

    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.minLength(5)]),
  
  })
  onSubmit(){
    console.log(this.LoginForm.value)
   
  }

 
  get email(){
    return this.LoginForm.get('email')
  }
  get password(){
    return this.LoginForm.get('password')
  }

}
