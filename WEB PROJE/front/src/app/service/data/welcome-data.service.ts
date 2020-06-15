import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


// HelloworldBean classı oluşturuyoruz ve constructor ına bir message veriyoruz.
export class HelloWorldBean{
 
  constructor(public message:string) {
    
  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http:HttpClient
  ) { }

  executeHelloWorldBeanService(){
    //Servisimizin yukarıda belirttiğimiz bir helloWorldBean classı olacağını söylüyoruz
   return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    //console.log("Execute Hello World Bean Service");
  }

  executeHelloWorldBeanServicePathVariable(name){

  

    
    //Servisimizin yukarıda belirttiğimiz bir helloWorldBean classı olacağını söylüyoruz
   return this.http.get<HelloWorldBean>(
   
     `http://localhost:8080/hello-world/path-variable/${name}`,//{headers}
     );
    //console.log("Execute Hello World Bean Service");
  }
  


}
