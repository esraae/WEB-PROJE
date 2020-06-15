import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { Router } from '@angular/router';


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
  selector: 'app-list-bucket',
  templateUrl: './list-bucket.component.html',
  styleUrls: ['./list-bucket.component.css']
})
export class ListBucketComponent implements OnInit {
  bucket1: Bucket[]
  bucket2: Bucket[]
  index = 1;
  size = 0;
  message: string
  constructor(private hardcodedAuthenticationService: HardcodedAuthenticationService, private todoService: TodoDataService, private router: Router
    
  ) { }

  ngOnInit() {
    this.refreshBuckets();
  }
  refreshBuckets() {
    this.todoService.retrieveAllBuckets('Organik').subscribe(
      response => {
        console.log(response);
        this.bucket2 = response;
        this.size = this.bucket2.length / 5;
        if (this.bucket2.length % 5 > 0) {
          this.size += 1;
        }
        this.bucket1 = this.bucket2.slice(0, 5);
      }
    )
  }

  pageChange(i) {
    this.index = i;
    console.log(i);
    if (i - 5 > this.bucket2.length) {
      this.bucket1 = this.bucket2.slice(5 * (i - 1),:: );
    } else {
      this.bucket1 = this.bucket2.slice((5 * (i - 1)), 5 * i);
      console.log((5 * (i - 1)));
    }
    console.log(this.bucket1);
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


  deleteBucket (id) {
    this.todoService.deleteBucket('Organik', id).subscribe(
      response => {
        console.log(response);

        this.message = `Ürün silindi!`
        this.refreshBuckets();
      }

    )
  }

}
