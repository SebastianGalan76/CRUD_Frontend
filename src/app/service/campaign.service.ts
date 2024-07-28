import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Campaign } from '../models/Campaign';
import { CampaignDto } from '../models/CampaignDto';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private readonly URL = "http://localhost:8080/api/campaign";

  constructor(private http: HttpClient) { 
  }

  loadAllCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.URL);
  }

  deleteCampaign(campaignId: number){
    this.http.delete(this.URL + '/'+campaignId).subscribe();
  }

  createCampaign(campaign: CampaignDto): Observable<string>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.URL, campaign, { headers, responseType: 'text' });
  }
}
