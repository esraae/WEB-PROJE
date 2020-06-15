import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';


export class User {
  id; name; surname; username; password;
  constructor(
    public id,
    public name,
    public surname,
    public username,
    public password
  ) {

  }
}

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  user1: User[]
  user2: User[]
  index = 1;
  size = 0;
  message: string
  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService, private todoService: TodoDataService, private router: Router



  ) { }

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {
    this.todoService.retrieveAllUsers('Organik').subscribe(
      response => {
        console.log(response);
        this.user2 = response;
        this.size = this.user2.length / 5;
        if (this.user2.length % 5 > 0) {
          this.size += 1;
        }
        this.user1 = this.user2.slice(0, 5);
      }
    )
  }


  deleteUser(id) {
    console.log(`delete todo ${id}`)

    this.todoService.deleteTodo('Organik', id).subscribe(
      response => {
        console.log(response);

        this.message = `Ürün silindi!`
        this.refreshUsers();
      }

    )
  }

  updateUser(id) {
    console.log(`Update ${id}`)
    //router da ki todos/:id componentine gidecek
    this.router.navigate(['addUser', id])
  }
  addTodo() {
    //todos componentine yönlendiriyoruz
    this.router.navigate(['addUser', -1])
  }

  pageChange(i) {
    this.index = i;
    console.log(i);
    if (i - 5 > this.user2.length) {
      this.user1 = this.user2.slice(5 * (i - 1);:: );
    } else {
      this.user1 = this.user2.slice((5 * (i - 1)), 5 * i);
      console.log((5 * (i - 1)));
    }
    console.log(this.user1);
  }

  goPrevious(i) {
    if (i - 1 > 0) {
      this.pageChange(i - 1);
    }
  }

  goNext(i) {
    console.log(i);
    if (i + 1 <= this.size) {
      this.pageChange(i + 1);
    }
  }
}
