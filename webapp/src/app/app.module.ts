import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemInfoComponent } from './vehicle/item-info/item-info.component';
 import { MenuComponent } from './vehicle/menu/menu.component';
import { SearchComponent } from './vehicle/search/search.component';
import { CartComponent } from './booking/cart/cart.component';
import { ItemEditComponent } from './vehicle/item-edit/item-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './site/signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './site/login/login.component';
import { AuthGaurdService } from './auth-gaurd.service';
import { HttpClientModule } from '@angular/common/http';
import { ItemDetailsComponent } from './vehicle/item-details/item-details.component';

const appRoutes: Routes = [ 
  { path: '', redirectTo: 'search-bar', pathMatch:'full' },
  { path: 'edit-food-item/:id', component: ItemEditComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'cart', component: CartComponent,canActivate: [AuthGaurdService]},
  { path: 'login',component: LoginComponent},
  { path: 'search-bar',component: SearchComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    ItemInfoComponent,
     MenuComponent,
     SearchComponent,
     CartComponent,
     ItemEditComponent,
     SignupComponent,
     HeaderComponent,
     LoginComponent,
     ItemDetailsComponent,
     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes
      
    )

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
