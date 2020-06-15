import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // isUserLoggedInMenu:boolean=false;
  //Menüyü servis ile haberleştirdik
  constructor(private hardcodedAuthenticationService:HardcodedAuthenticationService) { }

  ngOnInit() {

  }

}
