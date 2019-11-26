import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { foodItem } from '../food/food-item';
import { AuthServiceService } from '../site/auth-service.service';
import { FoodService } from '../food/FoodService.service';

@Injectable({
  providedIn: 'root'
})

export class MenuItemService {

  constructor(private http: HttpClient,private authservice:AuthServiceService,) { }
//   getAllMenuItems():Observable<any>{
//   //   console.log("hola")
//   //   let username='user'
//   //   let password='pwd'
//   //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
//   //   return this.httpClient.get<foodItem[]>(`${environment.baseUrl}`+'menu-items',{headers})
//     if(this.authservice.loggedIn){
//       this.foodservice.isLoggedIn=true;
//       const headers = new HttpHeaders({ Authorization: 'Bearer ' + btoa(this.authservice.accessToken) });
//       return this.httpClient.get<foodItem[]>(`${environment.baseUrl}`+'menu-items',{headers})
//     }
//     else return this.httpClient.get<foodItem[]>(`${environment.baseUrl}`+'menu-items')
// }

addCartItem(menuItemId:number):Observable<any>{
  const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
  return this.http.post<foodItem>(environment.baseUrl+"menuitem/"+'carts/'+this.authservice.username+'/'+menuItemId,null,{headers})
}
getAllCartItems():Observable<any>{
  const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
  return this.http.get<foodItem>(environment.baseUrl+"menuitem/"+'carts/'+this.authservice.username,{headers})

}
deleteCartItem(menuItemId:number):Observable<any>{
  const headers = new HttpHeaders({ Authorization: 'Bearer ' + this.authservice.accessToken });
  return this.http.delete<foodItem>(environment.baseUrl+"menuitem/"+'carts/'+this.authservice.username+'/'+menuItemId,{headers})
}
}


