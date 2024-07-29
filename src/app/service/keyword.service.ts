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
  typeahead: string[] = [];
  selectedKeywords: string[] = [];

  constructor(private http: HttpClient) { 
    this.loadAllKeywords().subscribe(value => {
      var keywords: Keyword[] = value;

      this.keywords = keywords.map(keyword => keyword.name);
    });
  }

  loadAllKeywords(): Observable<Keyword[]> {
    return this.http.get<Keyword[]>(this.URL);
  }

  addKeyword(keyword: string){
    keyword = keyword.trim();
    if(keyword.length == 0){
      return;
    }

    if(!this.selectedKeywords.includes(keyword)){
      this.selectedKeywords = [...this.selectedKeywords, keyword];
    }

    this.typeahead = [];
  }

  deleteKeyword(keywordToDelete: string){
    this.selectedKeywords = this.selectedKeywords?.filter(keyword => keyword !== keywordToDelete);
  }

  changeTypeahead(input: string){
    if(this.keywords){
      this.typeahead = this.keywords.filter(keyword => keyword.toLowerCase().startsWith(input.toLowerCase()));
    }
  }

  loadKeywords(keywords: string){
    this.selectedKeywords = keywords.split(',');
  }

  clearSelectedKeywords(){
    this.selectedKeywords = [];
  }
}
