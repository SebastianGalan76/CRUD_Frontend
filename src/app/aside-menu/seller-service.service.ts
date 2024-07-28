import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Seller } from '../models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private readonly URL = "http://localhost:8080/api/seller";
  seller?: Seller;

  constructor(private http: HttpClient) { 
    this.loadSeller().subscribe(value => {
      this.seller = value;
    });
  }

  loadSeller(): Observable<Seller>{
    return this.http.get<Seller>(this.URL);
  }
}