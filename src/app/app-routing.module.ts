import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { UploadpostComponent } from './uploadpost/uploadpost.component';


const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'header', component:HeaderComponent},
  {path:'uploadpost', component:UploadpostComponent},
  {path:'newsfeed', component:NewsfeedComponent},
  {path:'profile',component: AccountComponent},
  {path:'auth',component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
