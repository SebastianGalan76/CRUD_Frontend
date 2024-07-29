import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeywordService } from '../../service/keyword.service';
import { CityService } from '../../service/city.service';
import { CampaignDto } from '../../models/CampaignDto';
import { CampaignService } from '../../service/campaign.service';
import { SellerService } from '../../service/seller.service';

@Component({
  selector: 'app-create-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.scss', '../../../assets/styles/formElement.scss'],
})
export class CreateCampaignComponent {
  inputName: string = '';
  inputBidAmount: string = '';
  inputCampaignFund: string = '';
  inputCityName: string = '';
  inputRadius: string = '';
  checkboxStatus: boolean = false;
  
  errorMessage: string = '';


  constructor(public campaignService: CampaignService, public sellerService: SellerService, public keywordService: KeywordService, public cityService: CityService) {}

  createNewCampaign() {
    let campaignDto = new CampaignDto();
    campaignDto.name = this.inputName;
    campaignDto.bidAmount = parseFloat(this.inputBidAmount);
    campaignDto.campaignFund = parseFloat(this.inputCampaignFund);

    const inputCity = document.getElementById('input-city-name') as HTMLInputElement;
    campaignDto.city = inputCity.value;

    campaignDto.radius = parseFloat(this.inputRadius);
    campaignDto.keywords = this.keywordService.selectedKeywords;
    campaignDto.status = this.checkboxStatus;

    const verifyResult = this.campaignService.verifyCampaignDto(campaignDto);
    if (verifyResult != '') {
      this.errorMessage = verifyResult;
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
    this.inputCityName = '';
    this.inputRadius = '';
    this.checkboxStatus = false;

    this.keywordService.clearSelectedKeywords();

    (document.getElementById('input-city-name') as HTMLInputElement).value = '';
  }
}
