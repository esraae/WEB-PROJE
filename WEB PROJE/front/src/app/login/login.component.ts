import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username =''
  password =''
  errorMessage="Invalid Credentials"
  invalidLogin=false
  ax
  //Servisi dependency ınjection yapıyoruz 
  constructor(private router:Router,private hardcodedAuthenticationService :HardcodedAuthenticationService,
    private basicAuthenticationService:BasicAuthenticationService) { }
  //Login Sayfası oluştuğunda bir router da oluşturuyoruz 
  ngOnInit() {
  }
  handleJWTAuthLogin(){
    /*
    Servis aracılığıyla giriş doğruluyoruz
    */
    this.basicAuthenticationService.executeJWTAuthenticationService(this.username,this.password) 
      .subscribe(
        data => {
          console.log(data)
          this.router.navigate(['welcome',this.username])///Gelen değerler doğruysa Welcome sayfasına yönlendireceğiz/gelen name parametresini gönderiyoruz
          this.invalidLogin=false
        },
        error => {
          console.log(error)
          this.invalidLogin=true
        }
      )
}
  handleLogin(){
  
    
      /*
      Servis aracılığıyla giriş doğruluyoruz
      */
      if (this.hardcodedAuthenticationService.authenticate(this.username,this.password)) {

      this.invalidLogin=false
      //Gelen değerler doğruysa Welcome sayfasına yönlendireceğiz
      this.router.navigate(['welcome',this.username])//gelen name parametresini gönderiyoruz
    }
    else{
      this.invalidLogin=true
    }
      
  }

}
