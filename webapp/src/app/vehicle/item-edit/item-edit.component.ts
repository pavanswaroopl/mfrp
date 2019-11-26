import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FoodService } from '../FoodService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { vehicleItem } from '../vehicle-item';
import { AuthServiceService } from 'src/app/site/auth-service.service';


@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  isAdmin:boolean;
  categories = ["Starters","Main Course","Dessert","Drinks"];
  foodForm: FormGroup;
  vehicleItem:vehicleItem;
  saved:boolean=false;
  savedItem:boolean=false;
  constructor(private foodService:FoodService,private formBuild:FormBuilder,private foodservice:FoodService,private route : ActivatedRoute,private router:Router,private authservice:AuthServiceService) { }
  
  ngOnInit() {
    this.isAdmin=this.authservice.isAdmin;
    const vehicleItemId = this.route.snapshot.paramMap.get('id');
    this.foodService.getMenuItem(+vehicleItemId).subscribe(data=>{this.vehicleItem=data;
      this.saved=true;
      this.vehicleItem.dateOfLaunch=new Date(this.vehicleItem.dateOfLaunch);
      this.vehicleItem.dateOfLaunch.setDate(this.vehicleItem.dateOfLaunch.getDate()+1);
      this.foodForm = this.formBuild.group({
        itemName: [this.vehicleItem.name,[
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20)
        ]],
        itemURL: [this.vehicleItem.image,[
          Validators.required
        ]],
        price: [this.vehicleItem.price,[
          Validators.required
        ]],
        dateOfLaunch: [this.vehicleItem.dateOfLaunch.toISOString().substring(0,10),[
          Validators.required
        ]],
        category: [this.vehicleItem.category,[
          Validators.required
        ]],
        active: [this.vehicleItem.active,[
          Validators.required
        ]],
        freeDelivery: [this.vehicleItem.freeDelivery]
      })
    })    
   // this.foodItem = this.foodservice.getFoodItem1(+foodItemId);
  
  }

  get itemName() {
    return this.foodForm.get('itemName');
  }
  get itemURL() {
    return this.foodForm.get('itemURL');
  }
  get price() {
    return this.foodForm.get('price');
  }
  get dateOfLaunch() {
    return this.foodForm.get('dateOfLaunch');
  }
  get category() {
    return this.foodForm.get('category');
  }
  get active() {
    return this.foodForm.get('active');
  }
  get freeDelivery() {
    return this.foodForm.get('freeDelivery');
  }
  onSubmit() {
    let item:vehicleItem = {id:this.vehicleItem.id,name:this.foodForm.value["itemName"],price:+this.foodForm.value["price"],active:this.foodForm.value["active"],
    dateOfLaunch:new Date(this.foodForm.value["dateOfLaunch"]),category:this.foodForm.value["category"],freeDelivery:this.foodForm.value["freeDelivery"],
    image:this.foodForm.value["itemURL"]}
    console.log(item)
    this.foodService.save(item).subscribe(data=>{
      console.log(data)
      // this.router.navigate(['search-bar'])
      this.saved=true;
      this.savedItem=true;
    })
    // this.foodservice.updateFoodItem(item);
    

  }

}
