import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FoodService } from '../vehicle/FoodService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
  loggedInUser={loggedOut:true};
  validCredentials:boolean = true;
  accessToken: string; // JWT token
  redirectUrl = '/';
  loggedIn:boolean = false;
  name:string;
  baseUrl = environment.baseUrl;
  private token: string;
  error: string = "Login Failed";
  private role:string;
  isAdmin:boolean=false;
  clickedOnAdd:boolean=false;
  addedToCart:boolean=false;
  username:String;

  authenticateSpring(user:string,password:string):Observable<any> {
    console.log(user)
    let credentials = btoa(user+':'+password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic '+credentials)
    return this.http.get(this.baseUrl+"authservice/"+"authenticate", {headers})
    

  }
  public setToken(token: string) {
    this.token = token;
  }
  public getToken() {
    return this.token;
  }

  constructor(private userService:UserServiceService,public router: Router,private http:HttpClient) { }

  authenticateUser(user) {
    // for(let validUser of this.userService.userList){
    //   if(validUser.username == user.username && validUser.password == user.password){
    //     this.loggedInUser = user;
    //     this.validCredentials = true;
    //     if(user.username == 'admin')
    //       this.foodService.isAdmin = true;
    //     this.router.navigate(['search-bar']);
    //     this.loggedIn = true;
    //     this.foodService.isLoggedIn = true;
    //   }
    //   else
    //     this.validCredentials = false;
    // }


    this.authenticateSpring(user.username,user.password).subscribe(
      (data)=>{
        console.log(data.role)
        console.log(data.token)
        this.role=data.role;
        this.loggedInUser = user.username;
        this.validCredentials = true;
        if(data.role=='ADMIN'){
          console.log(data.role)
          this.isAdmin=true;
          this.loggedIn=true;
          this.username="admin";
          this.accessToken=data.token;
          this.router.navigate(['search-bar']);

        }else{
          console.log(this.role)
          this.isAdmin=false;
          this.loggedIn=true;
          this.username=data.username;
          this.accessToken=data.token;
          this.router.navigate(['search-bar']);
        }
        
      },
      (error)=>{
        this.validCredentials = false;
        console.log(error);
        console.log("ERROR");
        this.error = error.error.message;
        if (error.error.errors != null) {
          this.error = error.error.errors[0];
        }
      }
      )

  }
  logout() {
    this.loggedInUser = {loggedOut:true};
    this.isAdmin = false;
    this.loggedIn = false;
    this.clickedOnAdd = false;
    this.addedToCart = false;
    this.router.navigate(['login']);
    //this.router.navigate(['search-bar']);
  }
}
