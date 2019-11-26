import { Component, OnInit, Input } from '@angular/core';
import { FoodService } from '../FoodService.service';
import { vehicleItem } from '../vehicle-item';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private menuservice:FoodService,private foodService:FoodService,private route : ActivatedRoute,private router:Router) { }
  @Input() filterlist:vehicleItem[];
  isAdmin:boolean;
  ngOnInit() {
    this.router.navigate(['search-bar'])
    this.isAdmin=this.foodService.isAdmin;
  }
  search(event:any){
    console.log("search value: "+event.target.value)
    this.menuservice.getSubject().next(event.target.value)
  }
}
