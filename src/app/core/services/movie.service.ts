import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { StateService } from '@core/services/state.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiKey;

  constructor(
    private stateService: StateService,
    private httpService: HttpService,
    private toastr: ToastrService
  ) {
    this.stateService.getApiKey().subscribe(apiKey => {
      this.apiKey = apiKey;
    });
  }

  search(term: string): Observable<any> {
    if (this.apiKey) {
      let searchQuery = `/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${term}`;
      return this.httpService.get(searchQuery);
    } else {
      this.toastr.error('Please add API key!');
      return of(null);
    }
  }

  getGenres(): Observable<{ genres: { id: number, name: string }[] }> {
    if (this.apiKey) {
      let searchQuery = `/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`;
      return this.httpService.get(searchQuery) as Observable<{ genres: { id: number, name: string }[] }>;
    } else {
      this.toastr.error('Please add API key!');
      return of(null);
    }
  }

}
