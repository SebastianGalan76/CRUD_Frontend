import { Component, OnInit } from '@angular/core';
import { SellerService, Seller } from './seller-service.service';

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
