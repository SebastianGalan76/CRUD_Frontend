import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Keyword } from '../models/Keyword';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeywordService {
  private readonly URL = "http://localhost:8080/api/keyword";
  
  keywords: string[] = [];

  constructor(private http: HttpClient) { 
    this.loadAllKeywords().subscribe(value => {
      var keywords: Keyword[] = value;

      this.keywords = keywords.map(keyword => keyword.name);
    });
  }

  loadAllKeywords(): Observable<Keyword[]> {
    return this.http.get<Keyword[]>(this.URL);
  }
}
