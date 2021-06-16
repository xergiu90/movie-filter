import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { IGenre } from '@core/interfaces/genre.interface';
import { IMovie } from '@core/interfaces/movie.interface';
import { IUser } from '@core/interfaces/user.interface';
import { MovieService, StateService, UserService } from '@core/services';
import { MovieDetailsComponent } from '@shared/components/movie-details/movie-details.component';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss'],
})
export class FavouritesComponent implements OnDestroy {
  currentUser: IUser;
  userSubscription: Subscription;
  favourites: IMovie[] = [];
  genreName: any = [];

  constructor(
    private dialog: MatDialog,
    private usersService: UserService,
    private cdr: ChangeDetectorRef,
    private stateService: StateService,
    private movieService: MovieService,
  ) {
    this.userSubscription = this.stateService.getCurrentUser().subscribe(user => {
      if (user && user.id) {
        this.currentUser = user;
      }
    });
    this.readFavourites();
    this.fetchGenres();


  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  readFavourites() {
    const storedMoviesString = JSON.parse(localStorage.getItem('favourites'));
    if (storedMoviesString) {
      const storedMoviesObject = storedMoviesString[this.currentUser.id];
      if (storedMoviesObject) {
        this.favourites = storedMoviesObject;
        this.cdr.markForCheck();
      }
    }
  }

  toggleFavourites(movie: IMovie) {
    movie.isFavourite =  !movie.isFavourite;
    this.favourites = this.favourites.filter(mov => {
      return mov.isFavourite;
    })

    const favMoviesPerUser = JSON.parse(localStorage.getItem('favourites'));
    favMoviesPerUser[this.currentUser.id] = this.favourites;

    localStorage.setItem('favourites', JSON.stringify(favMoviesPerUser));
  }

  fetchGenres() {
    this.movieService.getGenres().subscribe(res => {
        if (res) {
          this.genreName = res.genres.reduce((map: any, genre: IGenre) => {
            map[genre.id as any] = genre.name;
            return map;
          }, {});
        }
      },
      err => {
      });
  }


  showMovieDetails(movie: IMovie) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(MovieDetailsComponent, dialogConfig);
    dialogRef.componentInstance.movie = movie;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cdr.markForCheck();
      }
    });
  }
}
