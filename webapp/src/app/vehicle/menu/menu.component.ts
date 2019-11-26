import { Component, OnInit, Input, Output } from '@angular/core';
import { vehicleItem } from '../vehicle-item';
import { FoodService } from '../FoodService.service';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() vehicleItem:vehicleItem[];
 addToCartClicked = new EventEmitter();
 isAdmin:boolean;

  constructor(private foodService:FoodService,) { }

  ngOnInit() {
   
  this.foodService.getAllMenuItems().subscribe(data=>this.vehicleItem=data)
    // this.isAdmin=this.foodService.isAdmin;
  //   if(this.isAdmin){}
  //   this.foodService.getMenu().subscribe(vehicleItem => this.vehicleItem=vehicleItem)
  //   this.foodService.getSubject().subscribe(data=>{this.vehicleItem=this.foodService.getItem(data)})
  //   console.log(this.vehicleItem)
    
  //   this.isAdmin = this.foodService.isAdmin;
  // if(this.isAdmin){
  //  this.vehicleItem = this.foodService.getvehicleItem();
  //  //this.menuService.getAllMenuItems().subscribe(data=>{(this.vehicleItem=data)});
  //   this.foodService.getSubject().subscribe((data) => {
  //     this.vehicleItem=this.foodService.getItem(data)
  //   });

    this.foodService.getSubject().subscribe((data) => {
      this.vehicleItem=this.foodService.getItem(data)
    });

  // }});
  // this.foodService.getSubject().subscribe((data) => (
  //        this.vehicleItem=this.foodService.getItem(data)
  // ));
  }
  }
