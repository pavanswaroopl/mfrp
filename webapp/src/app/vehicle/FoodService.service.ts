import { Injectable } from '@angular/core';
import { vehicleItem } from './vehicle-item';
import { Observable, of, Subject } from 'rxjs';
import { ItemInfoComponent } from './item-info/item-info.component';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';
import { AuthServiceService } from '../site/auth-service.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MenuItemService } from '../service/menu-item.service';



@Injectable({
  providedIn: 'root'
})

export class FoodService {

 
  
  menuUrl:string=environment.baseUrl;
  isLoggedIn:boolean = false;
  clickedOnAdd:boolean = false;
  addedToCart:boolean = false;
  clickedCart:boolean=false;
  isAdmin:boolean=false;
  // public vehicleItem:vehicleItem[]=[{id:1,name:"Sandwich",price:99,active:true,dateOfLaunch: new Date('03/15/2017'),category:"Main Course",freeDelivery:true,image:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  // {id:2,name:"Burger",price:129,active:true,dateOfLaunch: new Date('12/23/2017'),category:"Main Course",freeDelivery:false,image:"https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  // {id:3,name:"Pizza",price:149,active:true,dateOfLaunch: new Date('08/21/2017'),category:"Main Course",freeDelivery:false,image:"https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  // {id:4,name:"Friench Fries",price:57,active:false,dateOfLaunch: new Date('07/02/2017'),category:"Starters",freeDelivery:true,image:"https://images.unsplash.com/photo-1526230427044-d092040d48dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  // {id:5,name:"Chocolate Brownie",price:32,active:true,dateOfLaunch: new Date('11/02/2022'),category:"Dessert",freeDelivery:true,image:"https://images.unsplash.com/photo-1564355808539-22fda35bed7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"}];
  filterlist:vehicleItem[];
  vehicleItem:vehicleItem[];
  subject = new Subject<string>();

  getAllMenuItems():Observable<any>{
    //   console.log("hola")
    //   let username='user'
    //   let password='pwd'
    //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    //   return this.httpClient.get<vehicleItem[]>(`${environment.baseUrl}`+'menu-items',{headers})
      if(this.authservice.loggedIn){
        this.isLoggedIn=true;
        const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
        return this.http.get<vehicleItem[]>(environment.baseUrl+"menuitem/"+'menu-items',{headers})
      }
      else 
      return this.http.get<vehicleItem[]>(environment.baseUrl+"menuitem/"+'menu-items')
  }
  getMenuItem(id:number){
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
        return this.http.get<vehicleItem>(environment.baseUrl+"menuitem/"+'menu-items/'+id,{headers})
  }
  save(vehicleItem:vehicleItem):Observable<any>{
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
    return this.http.put<vehicleItem>(environment.baseUrl+"menuitem/"+'menu-items',vehicleItem,{headers})

  }

 
  getMenu():Observable<vehicleItem[]>{
    return of(this.vehicleItem)
  }
  getItem(name:String):vehicleItem[]{
    if(name!=""){
    this.filterlist=this.vehicleItem.filter(vehicleItem=>{
      return vehicleItem.name.toLowerCase().includes(name.toLowerCase());
    });
  }
  else{
    this.filterlist=this.vehicleItem
  }
    return (this.filterlist)
  }
  constructor(private router:Router,private http:HttpClient,private authservice:AuthServiceService,private menuservice:MenuItemService) {
   this.getAllMenuItems().subscribe(data=>{(this.vehicleItem=data)});
   }
  getvehicleItems():Observable<vehicleItem[]>{
    // return  of( this.vehicleItem.filter(fd_item => fd_item.active && new Date(fd_item.dateOfLaunch)<= new Date()))
    return this.http.get<vehicleItem[]>(this.menuUrl);

  }
  getvehicleItem():vehicleItem[]{
    return this.vehicleItem;
  }
  getSubject():Subject<string>{
    return this.subject
  }
  addToCart(vehicleItemId:number){
  // if(this.isLoggedIn){
  //   for (let Item of this.vehicleItem){
  //     if(Item.id==vehicleItemId){
  //       this.cartService.getCart().menuItemList.push(Item);
  //       // this.cartService.calculateTotal();
  //       this.addedToCart=true;
  //     }
      

  //   }}
  //   else{
  //     this.clickedOnAdd=true
  //   }
  if(this.authservice.loggedIn){
    this.menuservice.addCartItem(vehicleItemId).subscribe(data=>{this.addedToCart=true;})
  }
  else{
    this.clickedOnAdd=true;
    this.router.navigate(['login'])
  }
  
  }
 
  // removeFromCart(vehicleItemId:number){
  //   // for(let i=0;i<this.cartService.getCart().menuItemList.length;i++){
  //   //   if(this.cartService.getCart().menuItemList[i].id==vehicleItemId){
  //   //     for(let j=i;j<this.cartService.getCart().menuItemList.length-1;j++){
  //   //       this.cartService.getCart().menuItemList[j]=this.cartService.getCart().menuItemList[j+1];
  //   //     }
  //   //     this.cartService.getCart().menuItemList.pop();
  //   //     // this.cartService.calculateTotal();
  //   //   }
  //   // }
  //   this.menuservice.deleteCartItem(vehicleItemId).subscribe(data=>{this.cartService.getAllCart()})
  // }
  getvehicleItem1(vehicleItemId:number):vehicleItem {
    for(let vehicleItems of this.vehicleItem){
      if(vehicleItems.id == vehicleItemId)
      return vehicleItems;
    }
  }

  updatevehicleItem(item:vehicleItem){
    for(let i = 0; i<this.vehicleItem.length;i++){
      
      if(this.vehicleItem[i].id == item.id){

        this.vehicleItem[i] = item;
      //  console.log(this.vehicleItem[i])
        break;
      }
    }
  }

}
