import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from './model/Movie';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private moviesApiUrl = 'http://localhost:3000/movies';
  constructor(private http: HttpClient) { }
  getMovies(): Observable<Movie[]>{
    return this.http.get<Movie[]>(this.moviesApiUrl)
  }
}
