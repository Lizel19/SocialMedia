import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsfeedComponent } from './pages/newsfeed/newsfeed.component';
import { RegisterComponent } from './pages/register/register.component';
import { UploadpostComponent } from './pages/uploadpost/uploadpost.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'nav', component:NavComponent},
  {path:'header', component:HeaderComponent},
  {path:'uploadpost', component:UploadpostComponent},
  {path:'newsfeed', component:NewsfeedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
