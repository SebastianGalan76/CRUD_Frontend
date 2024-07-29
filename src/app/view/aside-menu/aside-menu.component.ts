import { Component } from '@angular/core';
import { SellerService } from '../../service/seller.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss'
})

export class AsideMenuComponent {
  constructor(public sellerService : SellerService) {
    
  }
}
