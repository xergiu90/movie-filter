import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IGenre } from '@core/interfaces/genre.interface';
import { IMovie } from '@core/interfaces/movie.interface';
import { User } from '@core/models/user.model';
import { AuthenticationService, MovieService, StateService } from '@core/services';
import { MovieDetailsComponent } from '@shared/components/movie-details/movie-details.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'favorites',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentUser: User;
  movies: IMovie[] = [];
  favourites: IMovie[] = [];
  firstLoad = true;
  apiKeySubscription: Subscription;
  sortBy = 'name';
  searchTerm: string;
  searchField: FormControl;
  loading: boolean = false;
  filterByYear: number;
  filterByGenre: number;
  genreName: any;
  faHeart = faHeart;

  get movieYears() {
    const uniqueYears = [...new Set(this.movies.map(mov => mov.year))].sort((a, b) => {
      return b - a;
    });
    return uniqueYears;
  }

  get movieGenres(): number[] {
    const allGenres = this.flatten(this.movies.map(movie => movie.genre));
    const uniqueGenres = [...new Set(allGenres)] as number[];
    return uniqueGenres;
  }

  get sortedAndFilteredMovies(): IMovie[] {
    let sortedAndFilteredMovies = [...this.movies];
    if (this.filterByYear) {
      sortedAndFilteredMovies = [...sortedAndFilteredMovies.filter(mov => mov.year === this.filterByYear)];
    }
    if (this.filterByGenre) {
      sortedAndFilteredMovies = [...sortedAndFilteredMovies.filter(mov => mov.genre.includes(this.filterByGenre))];
    }

    return sortedAndFilteredMovies;
  }

  get favouriteMoviesIDs(): string[] {
    if (this.favourites && this.favourites.length) {
      return this.favourites.map(movie => movie.id);
    } else {
      return [];
    }

  }


  constructor(
    private authService: AuthenticationService,
    private stateService: StateService,
    private movieService: MovieService,
    private dialog: MatDialog,
    private toastr: ToastrService,
  ) {
    this.searchField = new FormControl();
    this.stateService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
      }
    );
  }

  ngOnInit(): void {

    this.apiKeySubscription = this.stateService.getApiKey().subscribe(apiKey => {
      this.searchMovies(this.searchField.value);
    });

    this.fetchGenres();
    this.searchField.valueChanges.pipe(
      debounceTime(600),
      distinctUntilChanged(),
      tap(_ => {
        this.loading = true;
      }),
      tap(_ => (this.loading = false))
    ).subscribe(term => {
      this.searchMovies(term);
    });
    this.readFavourites();

  }


  searchMovies(term: string) {
    if (!term) {
      return;
    }

    if (!this.genreName) {
      this.fetchGenres();
    } else {
      this.movieSearch(term);
    }
  }

  ngOnDestroy() {
    if (this.apiKeySubscription) {
      this.apiKeySubscription.unsubscribe();
    }
  }

  movieSearch(term: string) {
    this.movieService.search(term).subscribe(res => {
        let newMovie: IMovie;
        this.movies = [];
        res.results.forEach(movie => {
          newMovie = {
            name: movie.original_title,
            year: movie.release_date ? movie.release_date.split('-')[0] : '-',
            genre: movie.genre_ids,
            rating: movie.vote_average,
            posterURL: movie.poster_path ? 'https://image.tmdb.org/t/p/w440_and_h660_face' + movie.poster_path : 'https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png',
            description: movie.overview,
            id: movie.id,
            isFavourite: this.favouriteMoviesIDs.includes(movie.id)
          };
          this.movies.push(newMovie);

        });
        this.doSort();
      },
      err => {
        if (!this.firstLoad) {
          this.toastr.error('API Key invalid');
        }

        console.log(err);
      });
  }

  fetchGenres() {
    this.movieService.getGenres().subscribe(res => {
        if (res) {
          this.genreName = res.genres.reduce((map: any, genre: IGenre) => {
            map[genre.id as any] = genre.name;
            return map;
          }, {});

          if (this.searchField.value) {
            this.movieSearch(this.searchField.value);
          }
          this.firstLoad = false;
        }

      },
      err => {
        if (!this.firstLoad) {
          this.toastr.error('API Key invalid');
        }
        console.log(err);
        this.firstLoad = false;
      });
  }

  readFavourites() {
    const storedMoviesString = JSON.parse(localStorage.getItem('favourites'));
    if (storedMoviesString) {
      const storedMoviesObject = storedMoviesString[this.currentUser.id];
      if (storedMoviesObject) {
        this.favourites = storedMoviesObject;
      }
    }
  }

  showMovieDetails(movie: IMovie) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(MovieDetailsComponent, dialogConfig);
    dialogRef.componentInstance.movie = movie;

  }

  updateSort() {
    this.doSort();
  }

  doSort() {
    if (this.sortBy === 'year') {
      this.movies.sort((a, b) => {
        return b.year - a.year;
      });
    } else if (this.sortBy === 'name') {
      this.movies.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
  }

  toggleFavourites(movie: IMovie) {
    movie.isFavourite =  !movie.isFavourite;
    const favMovies = this.movies.filter(mov => {
      return mov.isFavourite;
    });

    let favMoviesPerUser = JSON.parse(localStorage.getItem('favourites'));

    if(!favMoviesPerUser) {
      favMoviesPerUser = { [this.currentUser.id]: favMovies};
    } else {
      favMoviesPerUser[this.currentUser.id] = favMovies;
    }

    localStorage.setItem('favourites', JSON.stringify(favMoviesPerUser));
  }

  doYearFilter() {
    if (this.filterByYear === 0) {
      this.filterByYear = null;
    }
  }

  doGenreFilter() {
    if (this.filterByGenre === 0) {
      this.filterByGenre = null;
    }
  }

  flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten);
    }, []);
  }

}
