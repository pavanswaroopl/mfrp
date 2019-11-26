import { Injectable, Output, EventEmitter } from '@angular/core';
import { Cart } from '../cart';
import { FoodService } from 'src/app/food/FoodService.service';
import { MenuItemService } from 'src/app/service/menu-item.service';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  @Output() cartUpdated = new EventEmitter();
  cart:Cart={menuItemList:[],total:0}
  cartEmpty:boolean=false;


  getAllCart(){
    this.menuservice.getAllCartItems().subscribe(data=>{this.cart=data;
    if(this.cart.total==0){
      this.cartEmpty=true;
    }
    else{
      this.cartEmpty=false;
    }
  })
  }
  // calculateTotal(){
  //   this.cart.total =0;
  //   for (let i = 0; i < this.cart.menuItemList.length; i++) {
  //     this.cart.total += this.cart.menuItemList[i].price;
     
  //   }
  //   this.cartUpdated.emit();
  // }

  


  constructor(private foodservice:FoodService,private menuservice:MenuItemService) { }
}
