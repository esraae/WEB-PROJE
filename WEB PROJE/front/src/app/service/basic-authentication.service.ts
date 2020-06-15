import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { API_URL } from '../app.constants';


export const TOKEN = 'token'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
//Bu servis authenticated işlemini yapmaktadır.
export class BasicAuthenticationService {

  constructor(private http: HttpClient ) { }

  //aldığımız username ve password bilgilerini JWT kullanarak servis tarafına aktarıyoruz
  executeJWTAuthenticationService(username, password) {
    //Security Bilgilerini alıyoruz


    return this.http.post<any>(

      `${API_URL}/api/auth/signin`, {
      username,
      password
    }).pipe(
      map(
        data => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${data.accessToken}`);
          console.log(data);
          return data;
        }
      )
    );
    console.log("Execute Hello World Bean Service");
  }
  //aldığımız username ve password bilgilerini servis tarafına aktarıyoruz
  executeAuthenticationService(username, password) {
    //Security Bilgilerini alıyoruz

    let basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);

    //Servisin header alanına security bilgilerimizi gönderiyoruz
    let headers = new HttpHeaders({

      Authorization: basicAuthHeaderString

    })
    return this.http.get<AuthenticationBean>(

      `${API_URL}/api/auth/signin`,
      { headers }).pipe(
        map(
          data => {
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, basicAuthHeaderString);
            return data;
          }
        )
      );



    //console.log("Execute Hello World Bean Service");
  }

  //
  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken() {
    //user boş değilse
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)

  }

  //session storage da mevcut authenticatedUser varsa getir.
  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)

    return !(user === null)

  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }



}

export class AuthenticationBean {

  constructor(public message: string) {

  }
}