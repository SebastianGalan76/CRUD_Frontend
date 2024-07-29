import { Component, ViewChild  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../service/campaign.service';
import { SellerService } from '../../../service/seller.service';
import { KeywordService } from '../../../service/keyword.service';
import { CityService } from '../../../service/city.service';
import { CampaignDto } from '../../../models/CampaignDto';
import { InputCityComponent } from "../../inputs/input-city/input-city.component";
import { InputKeywordComponent } from '../../inputs/input-keyword/input-keyword.component';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule, InputCityComponent, InputKeywordComponent],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss', '../../../../assets/styles/formElement.scss'],
})
export class CreateCampaignComponent {
  @ViewChild(InputCityComponent) inputCityComponent!: InputCityComponent;
  @ViewChild(InputKeywordComponent) inputKeywordComponent!: InputKeywordComponent;

  inputName: string = '';
  inputBidAmount: string = '';
  inputCampaignFund: string = '';
  inputRadius: string = '';
  checkboxStatus: boolean = false;
  
  errorMessage: string = '';

  constructor(public campaignService: CampaignService, public sellerService: SellerService, public keywordService: KeywordService, public cityService: CityService) {}

  createNewCampaign() {
    let campaignDto = new CampaignDto();
    campaignDto.name = this.inputName;
    campaignDto.bidAmount = parseFloat(this.inputBidAmount);
    campaignDto.campaignFund = parseFloat(this.inputCampaignFund);
    campaignDto.city = this.inputCityComponent.cityName;
    campaignDto.radius = parseFloat(this.inputRadius);
    campaignDto.keywords = this.inputKeywordComponent.selectedKeywords;
    campaignDto.status = this.checkboxStatus;

    const verifyResult = this.campaignService.verifyCampaignDto(campaignDto);
    if (verifyResult != '') {
      this.errorMessage = verifyResult;
      return;
    }
    this.errorMessage = '';

    this.campaignService.createCampaign(campaignDto).subscribe({
      next: (response) => {
        if (response) {
          this.errorMessage = response;
        }

        this.sellerService.refreshSeller();
        this.clearForm();
      },
      error: (e) => {
        this.errorMessage = e.error;
      }
    });
  }

  clearForm() {
    this.inputName = '';
    this.inputBidAmount = '';
    this.inputCampaignFund = '';
    this.inputCityComponent.cityName = '';
    this.inputRadius = '';
    this.checkboxStatus = false;

    this.inputKeywordComponent.clearSelectedKeywords();

    (document.getElementById('input-city-name') as HTMLInputElement).value = '';
  }
}
