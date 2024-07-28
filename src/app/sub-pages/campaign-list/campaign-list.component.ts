import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../campaign-service.service';
import { CommonModule } from '@angular/common';
import { Campaign } from '../../models/Campaign';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-list.component.html',
  styleUrl: './campaign-list.component.scss'
})
export class CampaignListComponent implements OnInit {
  campaigns?: Campaign[];

  constructor(public campaignService:CampaignService) {
  }

  ngOnInit(): void {
    this.campaignService.loadAllCampaigns().subscribe(value => {
      this.campaigns = value;
    });
  }

  deleteCampaign(campaignId: number){
    this.campaignService.deleteCampaign(campaignId);
    this.campaigns = this.campaigns?.filter(campaign => campaign.id !== campaignId);
  }
}
