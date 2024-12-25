import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { Movie } from '../model/Movie';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [...this.movies]
  genres = ['Action','Comedy','Drama','Horror']
  selectedGenre: string = ''
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data: Movie[]) => {
        console.log(data)
        this.movies = data
        this.filteredMovies = [...this.movies]
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch movies. Please try again later.';
      },
    });
  }

  filterMovies():void{
    if(this.selectedGenre){
      this.filteredMovies = this.movies.filter(movie => movie.genre===this.selectedGenre)
    }
    else{
      this.filteredMovies = [...this.movies]
    }
  }
}
