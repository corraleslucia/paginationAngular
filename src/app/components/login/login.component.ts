import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CustomValidator } from 'src/app/custom-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  user: User = new User();

  constructor(private userService: UserService, private route: Router) { }

  ngOnInit() {
    this.formLogin = new FormGroup({
      'email': new FormControl(this.user.email, [Validators.required, CustomValidator.validEmail()],
        [CustomValidator.emailExists(this.userService)]),
      'password': new FormControl(this.user.password,[Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(){
    this.user = this.formLogin.value;
    this.userService.login(this.user).subscribe(()=>{
      if(this.userService.token){
        this.route.navigateByUrl('/productsTable');
      }

      let redirect = this.userService.redirectUrl ? this.route.parseUrl(this.userService.redirectUrl) : '/productsTable';
      this.route.navigateByUrl(redirect);
    },
    err =>{
      alert("Datos incorrectos. Intente nuevamente");
      this.formLogin.reset();
    })
  }

  get email(){
    return this.formLogin.get('email');
  }

  get password(){
    return this.formLogin.get('password');
  }

}
