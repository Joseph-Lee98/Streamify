import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { AuthenticationformComponent } from './authenticationform/authenticationform.component';

const routes: Routes = [
  {path:'', component:MoviesComponent},
  {path:'login', component:AuthenticationformComponent},
  {path:'register', component:AuthenticationformComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
