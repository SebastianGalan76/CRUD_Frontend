import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from "./aside-menu/aside-menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsideMenuComponent],
  template: `
    <app-aside-menu />

    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'CampaignFront';
}
