import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HardcodedAuthenticationService } from './hardcoded-authentication.service';

@Injectable({
  providedIn: 'root'
})
/*CanActivate Interfaceini kullanarak bütün componentlerde giriş kontrolü yapabildik
* Burada özetle; HardcodedAuthenticationService de ki isUserLoggedIn kullanıcı giriş
* yapmış mı sorgusu üzerine ilgili sayfayı göster veya gizle demek istedik.

*/
export class RouteGuardService implements CanActivate{

  constructor( private hardCodedAuthenticationService:HardcodedAuthenticationService,
    private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardCodedAuthenticationService.isUserLoggedIn())
    
      return true;
    //Sayfalara yetkisiz giriş yapılmak istenirse login e yönlendirilecek
    this.router.navigate(['login']);
  
    return false;
    
  }

}
