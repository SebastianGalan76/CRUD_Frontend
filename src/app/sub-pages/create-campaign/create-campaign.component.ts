import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeywordService } from '../../service/keyword.service';
import { CityService } from '../../service/city.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss', '../../../assets/styles/formElement.scss'] , 
})
export class CreateCampaignComponent {
  inputName?: string;
  inputKeywords?: string;

  constructor(public keywordService: KeywordService, public cityService: CityService){

  }
}
