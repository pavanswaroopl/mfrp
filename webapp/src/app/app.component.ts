import { Component } from '@angular/core';
import { AuthServiceService } from './site/auth-service.service';
import { FoodService } from './vehicle/FoodService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['search-bar']);
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
