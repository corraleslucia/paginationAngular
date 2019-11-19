import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const headers = { headers: new HttpHeaders({ 'Content-Type': 'Application/json' }) }

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }

  getAllFromTo(page: number, size: number): Observable<any> {
    let options = {
      headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
      params: new HttpParams().set('page', JSON.stringify(page)).set('size', JSON.stringify(size))
    }
    
    return this.http.get("https://utn2019-avanzada2-tp9.herokuapp.com/api/products",options);
  }
}
