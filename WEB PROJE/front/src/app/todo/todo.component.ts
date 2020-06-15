import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {


  id: number
  todo: Todo
  image
  constructor(
    //ActivatedRoute ile bu componentin parametre alacağını söyledik
    private todoService: TodoDataService, private route: ActivatedRoute, private router: Router
  ) {
  }

  onFileChanged(event) {
    const file = event.target.files[0];
    if (file != null) {

      var FR = new FileReader();

      FR.addEventListener("load", e => {
        //document.getElementById("img").src       = e.target.result;
        //document.getElementById("b64").innerHTML = e.target.result;
        console.log(e.target.result);
        this.todo.image = e.target.result;
      });

      FR.readAsDataURL(event.target.files[0]);

    }
  }

  ngOnInit() {
    //Tanımladığımız id değişkenine query stringden gelecek id yi atıyoruz
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(-1, '', '', '', '');

    if (this.id != -1) {
      this.todoService.retriveTodo('Organik', this.id)
        .subscribe(
          data => this.todo = data
        )
    }
  }


  saveTodo() {
    if (this.id == -1) {
      this.todoService.createTodo('Organik', this.todo)
        .subscribe(
          data => {
            console.log(data)
            //Create yapıldıktan sonra todos componentine yönlendiriyoruz
            this.router.navigate(['todos'])
          }
        )
    }
    else {
      this.todoService.updateTodo('Organik', this.id, this.todo)
        .subscribe(
          data => {
            console.log(data)
            //Güncelleme yapıldıktan sonra todos componentine yönlendiriyoruz
            this.router.navigate(['todos'])
          }
        )
    }
  }

}
