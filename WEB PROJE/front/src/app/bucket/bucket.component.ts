import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoDataService } from '../service/data/todo-data.service';

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

export class Bucket {
  id; address; name;product;count;
  constructor(
    public id,
    public address,
    public name,
    public product,
    public count
  ) {

  }
}


@Component({
  selector: 'app-bucket',
  templateUrl: './bucket.component.html',
  styleUrls: ['./bucket.component.css']
})

export class BucketComponent implements OnInit {
  bucket:Bucket
 sales
 id
 todo:Todo
  createSales(){
    if(this.sales==null){
    this.sales= new Array();
    }
  }
  addToSales(x) {
    console.log(x)
    this.sales.push(x);
    console.log(this.sales);
  }

  constructor(private todoService: TodoDataService, private route: ActivatedRoute, private router: Router) { 
    this.createSales();
  }
  saveBucket() {
    console.log(this.id)
    console.log(this.bucket.id)
    if (this.bucket.id == -1) {
      this.bucket.product=this.todo;
      this.todoService.createBucket('Organik', this.bucket)
        .subscribe(
          data => {
            console.log(data)
            //Create yapıldıktan sonra todos componentine yönlendiriyoruz
            this.router.navigate(['todos'])
          }
        )
    }
  }

  ngOnInit() {
    this.bucket = new Bucket(-1, '', '', '',0);
    this.id = this.route.snapshot.params['id'];
    this.todo = new Todo(-1, '', '', '', '');

    if (this.id != -1) {
      this.todoService.retriveTodo('Organik', this.id)
        .subscribe(
          data => this.todo = data
        )
    }
  }

}
