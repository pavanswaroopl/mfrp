import { Component, OnInit } from '@angular/core';
import { FoodService } from '../food/FoodService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../site/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAdmin:boolean;
  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['search-bar']);
    this.isAdmin=this.foodService.isAdmin;
  }

  constructor(private authService:AuthServiceService,public router: Router,private foodService:FoodService) {  
  }
  title = 'truYum';
  isLoggedIn:boolean = false;
  

  loggedIn():boolean {
    if(!this.authService.loggedInUser.loggedOut){
      this.isLoggedIn = true;
      return true
    }
    else{
      this.isLoggedIn = false;
      return false;
    }
  }
  clickOnAddCart(){
    this.foodService.clickedOnAdd = false;
    this.foodService.addedToCart = false;
  }

}
