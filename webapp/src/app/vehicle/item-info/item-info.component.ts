import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { foodItem } from '../food-item';
import { FoodService } from '../FoodService.service';
import { AuthServiceService } from 'src/app/site/auth-service.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.css']
})
export class ItemInfoComponent implements OnInit {
  @Input() foodItem:foodItem;
  @Output() addToCartClicked = new EventEmitter();
  isAdmin:boolean;
  constructor(private foodService:FoodService,private authService:AuthServiceService,private router: Router) { }

  ngOnInit() {

    this.isAdmin=this.authService.isAdmin;
  }
  onSubmit(){
    if(this.authService.loggedIn==true){
      this.addToCartClicked.emit(this.foodItem.id);
    }
    else{
      this.router.navigateByUrl('login');
      this.foodService.clickedOnAdd=true;
    }
    
  }

}
