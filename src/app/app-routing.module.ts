import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AuthenticationformComponent } from './authenticationform/authenticationform.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { loggedOutGuard } from './logged-out.guard';
import { loggedInGuard } from './logged-in.guard';

const routes: Routes = [
  {path:'', component:MoviesComponent},
  {path:'login', component:AuthenticationformComponent, canActivate: [loggedOutGuard]},
  {path:'register', component:AuthenticationformComponent, canActivate:[loggedOutGuard]},
  {path:'favourites', component:MoviesComponent, canActivate:[loggedInGuard]},
  {path:'**', component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
