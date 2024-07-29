import { Component } from '@angular/core';
import { KeywordService } from '../../../service/keyword.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-keyword',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './input-keyword.component.html',
  styleUrl: '../../../../assets/styles/formElement.scss'
})
export class InputKeywordComponent {
  typeahead: string[] = [];
  public selectedKeywords: string[] = [];

  constructor(private keywordService: KeywordService) {}

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
    if(this.keywordService.keywords){
      this.typeahead = this.keywordService.keywords.filter(keyword => keyword.toLowerCase().startsWith(input.toLowerCase()));
    }
  }

  loadKeywords(keywords: string){
    this.selectedKeywords = keywords.split(',');
  }

  clearSelectedKeywords(){
    this.selectedKeywords = [];
  }
}
