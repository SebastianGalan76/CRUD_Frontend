import { Routes } from '@angular/router';
import { CreateCampaignComponent } from './sub-pages/create-campaign/create-campaign.component';
import { CampaignListComponent } from './sub-pages/campaign-list/campaign-list.component';
import { EditCampaignComponent } from './sub-pages/edit-campaign/edit-campaign.component';

export const routes: Routes = [
    { path: 'create', component: CreateCampaignComponent },
    { path: 'list', component: CampaignListComponent },
    { path: 'edit/:id', component: EditCampaignComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: '**', redirectTo: '/list' }
];