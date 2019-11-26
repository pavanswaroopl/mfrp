import { foodItem } from "../food/food-item";

export interface Cart{
    menuItemList:foodItem[]
    total:number
}