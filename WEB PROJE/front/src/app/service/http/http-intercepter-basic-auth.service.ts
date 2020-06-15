import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BasicAuthenticationService } from '../basic-authentication.service';

@Injectable({
  providedIn: 'root'
})
//  Bu servis BasicAuthenticationService işleminden sonra login olunmuşsa ilgili user  ve token bilgilerini
//  Servise header olarak göndermekte ve veri alışverişi için izin almakta

/*Intercepter kullanmamızın nedeni
Başvurunuzda, uygulamanıza sunucuya yapılan tüm istekleri kontrol edip 
sunucudan gelen tüm yanıtları kontrol edebileceğiniz ortak bir yer istiyorsanız, 
en iyi yöntem INTERCEPTOR kullanmaktır.
*/
export class HttpIntercepterBasicAuthService implements HttpInterceptor{

  constructor(private basicAuthService:BasicAuthenticationService) { 
   
  }

  intercept(request: HttpRequest<any>, next: HttpHandler){
 
    let basicAuthHeaderString= this.basicAuthService.getAuthenticatedToken();
    let username=this.basicAuthService.getAuthenticatedUser()
      

if(basicAuthHeaderString && username){

    request=request.clone({
      setHeaders : {
        Authorization : basicAuthHeaderString
      }
      })
    }
  return next.handle(request);
  
}
}
