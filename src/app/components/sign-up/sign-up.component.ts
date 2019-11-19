import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { CustomValidator } from 'src/app/custom-validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  formSignUp : FormGroup;
  user : User = new User();
  
  constructor(private userService : UserService, private route : Router) { }

  ngOnInit() {
    this.formSignUp = new FormGroup({
      'email' : new FormControl(this.user.email,[Validators.required, CustomValidator.validEmail()],[CustomValidator.emailNotUsed(this.userService)]),
      'password' : new FormControl(this.user.password,[Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    this.user = <User> this.formSignUp.value;
    this.userService.signup(this.user).subscribe(response=>{
      alert("Registro exitoso");
      this.route.navigateByUrl('/login');
    },
    err=>{
      alert("Problemas con el registro");
    });
    this.formSignUp.reset();
  }

  get email(){
    return this.formSignUp.get('email');
  }

  get password(){
    return this.formSignUp.get('password');
  }

}
