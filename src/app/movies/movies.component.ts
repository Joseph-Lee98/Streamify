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
  tailoredMovies: Movie[] = [...this.movies]
  genres = ['Action','Comedy','Drama','Horror']
  selectedGenre: string = ''
  sortBy: string = 'title'
  sortByDirection: string = 'ascending'
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe({
      next: (data: Movie[]) => {
        this.movies = data
        this.tailoredMovies = [...this.movies].sort((a,b)=>a.title.localeCompare(b.title))
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch movies. Please try again later.';
      },
    });
  }

  tailorMovies():void{
    if(this.selectedGenre){
      this.tailoredMovies = this.movies.filter((movie) => movie.genre === this.selectedGenre);
    }
    else{
      this.tailoredMovies=this.movies
    }
    this.tailoredMovies = [...this.tailoredMovies].sort((a,b)=>{
      const comparison = this.sortBy==='title'?a.title.localeCompare(b.title):a.rating-b.rating;
      return this.sortByDirection==='ascending'?comparison:-comparison
    })
  }
}
