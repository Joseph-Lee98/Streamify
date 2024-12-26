

import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { AuthService } from '../auth.service';
import { Movie } from '../model/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: false,
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  tailoredMovies: Movie[] = [...this.movies];
  genres = ['Action', 'Comedy', 'Drama', 'Horror'];
  selectedGenre: string = '';
  sortBy: string = 'title';
  sortByDirection: string = 'ascending';
  loading: boolean = true;
  errorMessage: string = '';
  isFavourites: boolean = false;

  constructor(
    private router: Router,
    private moviesService: MoviesService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isFavourites = this.router.url === '/favourites';

    this.moviesService.getMovies().subscribe({
      next: (data: Movie[]) => {
        this.movies = data;
        this.tailorMovies(); 
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = 'Failed to fetch movies. Please try again later.';
      },
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  tailorMovies(): void {
    let filteredMovies = [...this.movies];

    if (this.selectedGenre) {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.genre === this.selectedGenre
      );
    }

    if (this.isFavourites) {
      const currentUser = this.authService.currentUserSubject.value;
      if (currentUser) {
        filteredMovies = filteredMovies.filter((movie) =>
          currentUser.movies.includes(movie.id)
        );
      }
    }

    this.tailoredMovies = filteredMovies.sort((a, b) => {
      const comparison =
        this.sortBy === 'title'
          ? a.title.localeCompare(b.title)
          : a.rating - b.rating;
      return this.sortByDirection === 'ascending' ? comparison : -comparison;
    });
  }



  addToFavourites(id: number): void {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser) {
      if (!currentUser.movies.includes(id)) {
        currentUser.movies.push(id);
        this.authService.updateUserData(currentUser).subscribe({
          next: () => {
            this.authService.currentUserSubject.next(currentUser);
          },
          error: (error) => {
            console.error('Failed to update favourites:', error);
          },
        });
      }
    }
  }

  isMovieInFavourites(id: number): boolean {
    const currentUser = this.authService.currentUserSubject.value;
    return currentUser?.movies?.includes(id) ?? false;
  }

  removeFromFavourites(id: number): void {
    const currentUser = this.authService.currentUserSubject.value;
    if (currentUser) {
      const index = currentUser.movies.indexOf(id);
      if (index !== -1) {
        currentUser.movies.splice(index, 1);
        this.authService.updateUserData(currentUser).subscribe({
          next: () => {
            this.authService.currentUserSubject.next(currentUser);
          },
          error: (error) => {
            console.error('Failed to update favourites:', error);
          },
        });
        this.tailoredMovies = this.tailoredMovies.filter((movie) => movie.id !== id);
      }
    }
  }
}
