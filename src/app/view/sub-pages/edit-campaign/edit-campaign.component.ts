import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignService } from '../../../service/campaign.service';
import { SellerService } from '../../../service/seller.service';
import { CampaignDto } from '../../../models/CampaignDto';
import { InputCityComponent } from '../../inputs/input-city/input-city.component';
import { InputKeywordComponent } from "../../inputs/input-keyword/input-keyword.component";

@Component({
  selector: 'app-edit-campaign',
  standalone: true,
  imports: [FormsModule, CommonModule, InputCityComponent, InputKeywordComponent],
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.scss', '../../../../assets/styles/formElement.scss'],
})
export class EditCampaignComponent implements OnInit {
  @ViewChild(InputCityComponent) inputCityComponent!: InputCityComponent;
  @ViewChild(InputKeywordComponent) inputKeywordComponent!: InputKeywordComponent;

  campaignId: number | null = 0;
  currentCampaingFund: number = 0;

  inputName: string = '';
  inputBidAmount: string = '';
  inputCampaignFund: string = '';
  inputRadius: string = '';
  checkboxStatus: boolean = false;
  
  errorMessage: string = '';

  constructor(private campaignService: CampaignService, private sellerService: SellerService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.campaignId = id !== null ? Number(id) : null;
    });

    if (this.campaignId) {
      this.campaignService.getCampaign(this.campaignId).subscribe(campaign => {
        this.currentCampaingFund = campaign.campaignFund;

        this.inputName = campaign.name;
        this.inputBidAmount = campaign.bidAmount.toString();
        this.inputCityComponent.cityName = campaign.city.name;
        this.inputRadius = campaign.radius.toString();
        this.checkboxStatus = campaign.status;

        this.inputKeywordComponent.loadKeywords(campaign.keywords);
      });
    }
  }

  editCampaign() {
    if(!this.campaignId){
      return;
    }

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
    }
    this.errorMessage = '';

    this.campaignService.editCampaign(this.campaignId, campaignDto).subscribe({
      next: (response) => {
        if (response) {
          this.errorMessage = response;
        }

        this.sellerService.refreshSeller();
        this.currentCampaingFund = this.currentCampaingFund + parseFloat(this.inputCampaignFund);
      },
      error: (e) => {
        this.errorMessage = e.error;
      }
    });
  }
}
