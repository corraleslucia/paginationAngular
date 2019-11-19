import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: any;
  redirectUrl: string;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    let body = JSON.stringify(user);
    const observable = this.http.post('https://utn2019-avanzada2-tp9.herokuapp.com/login', body, headers);

    observable.subscribe(response => {
      this.token = response['jwt'];
      localStorage.setItem('token', this.token);
    });
    return observable;
  }

  signup(user: User): Observable<any> {
    let body = JSON.stringify(user);
    return this.http.post('https://utn2019-avanzada2-tp9.herokuapp.com/sign-up', body, headers);
  }

  checkEmail(email: string): Observable<any> {
    return this.http.get(`https://utn2019-avanzada2-tp9.herokuapp.com/users/identities?email=${email}`)
  }
}
