import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  LoginForm = new FormGroup({ 
   
    exampleInputEmail1:new FormControl(''),
    exampleInputPassword1:new FormControl(''),
    

  })
  onSubmit(){
    console.log(this.LoginForm.value)
   

  }

}
