import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { User } from '../list-user/list-user.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  id: number
  user: User
  image
  constructor(
    //ActivatedRoute ile bu componentin parametre alacağını söyledik
    private todoService: TodoDataService, private route: ActivatedRoute, private router: Router
  ) {
  }

  ngOnInit() {
    //Tanımladığımız id değişkenine query stringden gelecek id yi atıyoruz
    this.id = this.route.snapshot.params['id'];
    this.user = new User(-1, '', '', '', '');

    if (this.id != -1) {
      this.todoService.retriveUser('Organik', this.id)
        .subscribe(
          data => this.user = data
        )
    }
  }


  saveUser() {
    if (this.id == -1) {
      this.todoService.createUser('Organik', this.user)
        .subscribe(
          data => {
            console.log(data)
            //Create yapıldıktan sonra yönlendiriyoruz
            this.router.navigate(['listUser'])
          }
        )
    }
    else {
      this.todoService.updateUser('Organik', this.id, this.user)
        .subscribe(
          data => {
            console.log(data)
            //Güncelleme yapıldıktan sonra yönlendiriyoruz
            this.router.navigate(['listUser'])
          }
        )
    }
  }

}
