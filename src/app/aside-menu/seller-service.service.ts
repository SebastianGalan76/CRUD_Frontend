import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

export interface Seller{
  id: number;
  firstName: string;
  lastName: string;
  balance: number;
}