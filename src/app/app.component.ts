import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";
import { CampaignListComponent } from "./sub-pages/campaign-list/campaign-list.component";
import { CreateCampaignComponent } from "./sub-pages/create-campaign/create-campaign.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent, CampaignListComponent, CreateCampaignComponent ],
  template: `
  <div id="main-container">
    <app-aside-menu />
    <router-outlet></router-outlet>
  </div>
  `,
  styleUrls: ['../assets/styles/global.scss'],
})
export class AppComponent {

}
