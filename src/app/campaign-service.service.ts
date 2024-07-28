import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Campaign } from './models/Campaign';

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
}
