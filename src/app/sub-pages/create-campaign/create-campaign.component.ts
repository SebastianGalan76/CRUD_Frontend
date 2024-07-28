import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeywordService } from '../../service/keyword.service';
import { CityService } from '../../service/city.service';
import { CampaignDto } from '../../models/CampaignDto';
import { CampaignService } from '../../service/campaign.service';
import { SellerService } from '../../aside-menu/seller.service';

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
    if (!this.verifyInputs()) {
      return;
    }
    this.errorMessage = '';

    let campaignDto = new CampaignDto();
    campaignDto.name = this.inputName;
    campaignDto.bidAmount = parseFloat(this.inputBidAmount);
    campaignDto.campaignFund = parseFloat(this.inputCampaignFund);
    campaignDto.city = this.inputCityName;
    campaignDto.radius = parseFloat(this.inputRadius);
    campaignDto.keywords = this.keywordService.selectedKeywords;
    campaignDto.status = this.checkboxStatus;

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

  verifyInputs() : boolean{
    if (this.inputName.trim().length <= 3) {
      this.errorMessage = "The campaign name is too short";
      return false;
    }
    var bidAmount = parseFloat(this.inputBidAmount);
    var fundAmount = parseFloat(this.inputCampaignFund);

    if (isNaN(bidAmount) || bidAmount < 0.02) {
      this.errorMessage = "The campaign bid amount is too small";
      return false;
    }
    if (isNaN(fundAmount) || fundAmount < bidAmount) {
      this.errorMessage = "The campaign fund cannot be less than the bid amount";
      return false;
    }
    if (parseFloat(this.inputRadius) < 0) {
      this.errorMessage = "The radius cannot be less than 0";
      return false;
    }

    const inputElement = document.getElementById('input-city-name') as HTMLInputElement;
    this.inputCityName = inputElement.value;

    if (this.inputCityName.trim().length == 0) {
      this.errorMessage = "City name cannot be empty";
      return false;
    }
    if (this.keywordService.selectedKeywords.length == 0) {
      this.errorMessage = "You need to enter some keywords. After typing press Enter to add keyword to the list";
      return false;
    }

    return true;
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
