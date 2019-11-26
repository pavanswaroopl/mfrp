import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartServiceService } from './CartService.service';
import { Cart } from '../cart';
import { FoodService } from 'src/app/food/FoodService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItemService } from 'src/app/service/menu-item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart:Cart;
  constructor(private cartService:CartServiceService,private foodService:FoodService,private route : ActivatedRoute,private router:Router,private menuservice:MenuItemService) { }

  ngOnInit() {
    this.cartService.getAllCart();

  }
  removeFromCart(cartId){
    this.menuservice.deleteCartItem(cartId).subscribe(data=>{this.cartService.getAllCart()})
  }

}
