import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Seller } from '../models/Seller';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private readonly URL = "https://test43.alwaysdata.net/api/seller";
  seller?: Seller;

  constructor(private http: HttpClient) { 
    this.refreshSeller();
  }

  loadSeller(): Observable<Seller>{
    return this.http.get<Seller>(this.URL);
  }

  refreshSeller(){
    this.loadSeller().subscribe(value => {
      this.seller = value;
    });
  }
}