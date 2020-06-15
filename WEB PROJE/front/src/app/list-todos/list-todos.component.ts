import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import {BucketComponent} from'../bucket/bucket.component';

export class Todo {
  id; description; name; image; price;
  constructor(
    public id,
    public description,
    public name,
    public price,
    public image
  ) {

  }
}


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {
  //Todo Listesi oluşturduk bunu html tarafında for ile döneceğiz
  todos: Todo[]
  products: Todo[]
  index = 1;
  size = 0;
  message: string;
  search
  bucket;
  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private todoService: TodoDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.refreshTodos();
    this.bucket = new BucketComponent();
  }


  addToSales(id) {
    this.router.navigate(['bucket', id])
  }

  refreshTodos() {
    this.todoService.retrieveAllTodos('Organik').subscribe(
      response => {
        console.log(response);
        this.products = response;
        this.size = this.products.length / 5;
        if (this.products.length % 5 > 0) {
          this.size += 1;
        }
        this.todos = this.products.slice(0, 5);
      }
    )
  }


  deleteTodo(id) {
    console.log(`delete todo ${id}`)

    this.todoService.deleteTodo('Organik', id).subscribe(
      response => {
        console.log(response);

        this.message = `Ürün silindi!`
        this.refreshTodos();
      }

    )
  }

  updateTodo(id) {
    console.log(`Update ${id}`)
    //router da ki todos/:id componentine gidecek
    this.router.navigate(['todos', id])
  }
  addTodo() {
    //todos componentine yönlendiriyoruz
    this.router.navigate(['todos', -1])
  }

  pageChange(i) {
    this.index = i;
    console.log(i);
    if (i - 5 > this.products.length) {
      this.todos = this.products.slice(5 * (i - 1),:: );
    } else {
      this.todos = this.products.slice((5 * (i - 1)), 5 * i);
      console.log((5 * (i - 1)));
    }
    console.log(this.todos);
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

  onSearchChange(searchValue: string): void {
    var search=document.getElementById("search").value;
    if(search==null||search==""){
      this.refreshTodos();
    }
    this.products= this.products.filter(function(item) {
      var search=document.getElementById("search").value;
           console.log(search+"XXXXXXXXXXXXXXXXXXXXX");
      console.log(item.name);
      console.log(item.name.indexOf(search));
      if(item.name.indexOf(search)>-1){
      return true;
      }else{
      return false;
    }
    });
  this.pageChange(1);
  }


}
