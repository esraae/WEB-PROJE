import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/list-todos/list-todos.component';
import { User } from 'src/app/list-user/list-user.component';


import { API_URL, TODO_API_URL } from 'src/app/app.constants';
import { Bucket } from 'src/app/bucket/bucket.component';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  admin = false;
  constructor(
    private http: HttpClient
  ) { }


  retrieveAllTodos(username) {
    return this.http.get<Todo[]>(`${TODO_API_URL}/users/${username}/todos`);
  }


  deleteTodo(username, id) {
    return this.http.delete<Todo>(`${TODO_API_URL}/users/${username}/todos/${id}`);
  }

  retriveTodo(username, id) {
    return this.http.get<Todo>(`${TODO_API_URL}/users/${username}/todos/${id}`);
  }

  uploadImage(file) {
    return this.http.post(`${TODO_API_URL}file/upload/`, file);
  }

  updateTodo(username, id, todo) {
    return this.http.put(`${TODO_API_URL}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo) {
    return this.http.post(`${TODO_API_URL}/users/${username}/todos`, todo);
  }

  createUser(username, user) {
    return this.http.post(`${TODO_API_URL}/users/${username}/user`, user);
  }

  createBucket(username, bucket) {
    return this.http.post(`${TODO_API_URL}/users/${username}/sale`, bucket);
  }

  updateUser(username, id, user) {
    return this.http.put(`${TODO_API_URL}/users/${username}/user/${id}`, user);
  }

  retriveUser(username, id) {
    return this.http.get<User>(`${TODO_API_URL}/users/${username}/user/${id}`);
  }

  isAdmin(userName) {

    return this.http.get<boolean>(`${TODO_API_URL}/users/userControl/${userName}`);
    // return this.admin;
  }

  retrieveAllUsers(username) {
    return this.http.get<User[]>(`${TODO_API_URL}/users/${username}/user`);
  }
  retrieveAllBuckets(username) {
    return this.http.get<Bucket[]>(`${TODO_API_URL}/users/${username}/sale`);
  }

  deleteBucket(username, id) {
    return this.http.delete<Todo>(`${TODO_API_URL}/users/${username}/sale/${id}`);
  }
}
