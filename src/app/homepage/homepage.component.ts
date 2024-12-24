import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/Movie';

@Component({
  selector: 'app-homepage',
  standalone: false,
  
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {
  movies: Movie[] = []
  loading: boolean = true;
  constructor(private moviesService: MoviesService){}
  ngOnInit(): void {
    this.moviesService.getMovies().subscribe((data:Movie[])=>{
      this.movies=data
      this.loading = false
    })
  }
}
