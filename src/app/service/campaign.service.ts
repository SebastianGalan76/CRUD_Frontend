import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campaign } from '../models/Campaign';
import { CampaignDto } from '../models/CampaignDto';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private readonly URL = "https://test43.alwaysdata.net/api/campaign";

  constructor(private http: HttpClient) { 
  }

  loadAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.URL);
  }

  getCampaign(campaignId: number): Observable<Campaign>{
    return this.http.get<Campaign>(this.URL+"/"+campaignId);
  }

  deleteCampaign(campaignId: number){
    this.http.delete(this.URL + '/'+campaignId).subscribe();
  }

  createCampaign(campaign: CampaignDto): Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL, campaign, { headers, responseType: 'text' });
  }

  editCampaign(campaignId: number, campaign: CampaignDto): Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(this.URL +"/"+campaignId, campaign, {headers, responseType: 'text'});
  }

  verifyCampaignDto(campaignDto: CampaignDto) : string{
    if (!campaignDto.name || campaignDto.name.length <= 3) {
      return "The campaign name is too short";
    }

    if (!campaignDto.bidAmount || isNaN(campaignDto.bidAmount) || campaignDto.bidAmount < 0.02) {
      return "The campaign bid amount is too small";
    }
    if (campaignDto.radius && campaignDto.radius < 0) {
      return "The radius cannot be less than 0 xd";
    }
    if (!campaignDto.city || campaignDto.city.length == 0) {
      return "City name cannot be empty";
    }
    if (!campaignDto.keywords || campaignDto.keywords.length == 0) {
      return "You need to enter some keywords. After typing press Enter to add keyword to the list";
    }

    return '';
  }
}
