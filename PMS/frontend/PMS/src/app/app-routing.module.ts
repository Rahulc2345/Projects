import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from "src/app/user/user.component";
import { ProjectComponent } from "src/app/project/project.component";
import { PagenotfoundComponent } from "src/app/pagenotfound/pagenotfound.component";
import { LoginComponent } from "src/app/login/login.component";
import { AuthGaurdService } from "src/app/authentication/auth-gaurd.service";
import { HomeComponent } from "src/app/home/home.component";
import { UserListComponent } from "src/app/user/user-list/user-list.component";
import { ProjectDetailsComponent } from "src/app/project/project-details/project-details.component";
import { TaskComponent } from "src/app/task/task.component";
import { BacklogComponent } from "src/app/backlog/backlog.component";
import { BacklogDetailComponent } from "src/app/backlog/backlog-detail/backlog-detail.component";



const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'register', component:UserComponent},
  {path:'user-list', component:UserListComponent, canActivate:[AuthGaurdService]},
  {path:'home', component:HomeComponent},
  {path:'project', component:ProjectComponent, canActivate:[AuthGaurdService]},
  {path:'project/:projectId', component:ProjectDetailsComponent, canActivate:[AuthGaurdService]},
  {path:'task', component:TaskComponent, canActivate:[AuthGaurdService]},
  {path:'backlog', component:BacklogComponent, canActivate:[AuthGaurdService]},
  {path:'backlog/:backlogId', component:BacklogDetailComponent, canActivate:[AuthGaurdService]},
  {path: '**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
