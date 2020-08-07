import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YoohooService {

  constructor() {
    console.log("In YoohooService constructor");

   }

   ngOnInit() {
    console.log("In YoohooService ngOnInit");
   }

   sayHello(){
     
   }
}
