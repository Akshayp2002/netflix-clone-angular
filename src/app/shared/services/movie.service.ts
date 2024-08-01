import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const options = {
  params: {
    include_video: 'true',
    language: 'en-US',
    page: '1',
    sort_by: 'popularity.desc'
  },
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzgxMThjNzAxOGM4NDdmMzlhOThiZWU4MDA2YzRlZCIsIm5iZiI6MTcyMjQyNTE3My45MDQzOSwic3ViIjoiNjQ0ZDM5YzI1M2Y4MzMxNTk2MTkyODQ5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.rLFAMQaMTXWPMxzSsRJ5SUoXXYOGHOMwflbIPQWa2qc'
  }
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  http = inject(HttpClient);
  url = 'https://api.themoviedb.org/3/discover/movie';

  getMovies() {
    return this.http.get<any>(this.url, options);
  }
}
