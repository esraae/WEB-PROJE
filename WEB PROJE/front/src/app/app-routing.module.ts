import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { BucketComponent } from './bucket/bucket.component';
import { ListBucketComponent } from './list-bucket/list-bucket.component';


//Componentlerimizin routingini ayarlıyoruz
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  /*
  * 
  * canActivate:[RouteGuardService] RouteGuardService de ki canActive özelliğinde
  * kullanıcı girişi yapılmış mı yapılmamışmı kontrol ediliyor ve burada da bu metoda göre gösterilip 
  * gizleniyor. Yani sayfalara yetkisiz giriş yapılmamasının pratik yolu
  *  
  *
  */
  { path:'',component:LoginComponent},
  { path:'login',component:LoginComponent},
  //name parametresi alacağını söylüyoruz
  { path: 'welcome/:name', component: WelcomeComponent ,canActivate:[RouteGuardService]},
  { path: 'todos', component: ListTodosComponent,canActivate:[RouteGuardService]},
  { path: 'info', component: InfoPageComponent,canActivate:[RouteGuardService]},
  { path: 'addUser/:id', component: AddUserComponent,canActivate:[RouteGuardService]},
  { path: 'listUser', component: ListUserComponent,canActivate:[RouteGuardService]},
  { path: 'bucket/:id', component: BucketComponent,canActivate:[RouteGuardService]},
  { path: 'logout', component: LogoutComponent ,canActivate:[RouteGuardService]},
  { path: 'listBucket', component: ListBucketComponent,canActivate:[RouteGuardService]},
  { path: 'todos/:id', component: TodoComponent,canActivate:[RouteGuardService]},
  { path: "**", component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
