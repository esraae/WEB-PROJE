import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomeDataService } from '../service/data/welcome-data.service';
import { TodoDataService } from '../service/data/todo-data.service';

// import {AppComponent} from '../app.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message: string = 'Some Welcome Message'
  name = ''
  welcomeMessage: string
  welcomeMessageFromService: string

  constructor(private route: ActivatedRoute, private todoService: TodoDataService,
    private service: WelcomeDataService) {

  }//bu sınıf çağırıldığında route özelliğini aktifleştiriyoruz

  ngOnInit() {

    console.log(this.message)
    console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
    if (sessionStorage.getItem('firstLoad') == null) {
      this.todoService.isAdmin(this.name)
        .subscribe(res => {
          sessionStorage.setItem('isAdmin', res + "");

        }, err => {

        });
      sessionStorage.setItem('firstLoad', true + "");
    }
    //Url den gelen parametreyi welcomeMessage değişkenine aktarıyoruz ve bunu welcome.html tarafında yazdırıyoruz
    //  this.welcomeMessage =this.route.snapshot.params['name']

  }

  getWelcomeMessage() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanService().subscribe(
      //Servisten gelen response u handleSuccessfulResponse  metoda gönderiyoruz ve o metod bize mesajı ön tarafa iletmemizi sağlıyor
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log('last message');
  }


  getWelcomeMessageWithParameter() {
    console.log(this.service.executeHelloWorldBeanService());
    this.service.executeHelloWorldBeanServicePathVariable(this.name).subscribe(
      //Servisten gelen response u handleSuccessfulResponse  metoda gönderiyoruz ve o metod bize mesajı ön tarafa iletmemizi sağlıyor
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log('last message');
  }



  //Bu metod servisten aldığı değeri html tarafına gönderiyor
  handleSuccessfulResponse(response) {
    this.welcomeMessageFromService = response.message
  }

  handleErrorResponse(error) {
    // console.log(error)
    // console.log(error.error)
    // console.log(error.error.message)
    this.welcomeMessageFromService = error.error.message
  }

}

