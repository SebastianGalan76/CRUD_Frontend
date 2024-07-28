import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";
import { CampaignListComponent } from "./sub-pages/campaign-list/campaign-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent, CampaignListComponent],
  template: `
  <div id="main-container">
    <app-aside-menu />
    <app-campaign-list />
  </div>
  
  <router-outlet />
  `,
  styleUrls: ['../assets/styles/global.scss'],
})
export class AppComponent {

}
