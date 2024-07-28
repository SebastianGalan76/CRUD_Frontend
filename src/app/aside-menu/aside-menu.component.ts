import { Component } from '@angular/core';
import { SellerService } from './seller.service';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})

export class AsideMenuComponent {
  constructor(public sellerService : SellerService) {
    
  }
}
