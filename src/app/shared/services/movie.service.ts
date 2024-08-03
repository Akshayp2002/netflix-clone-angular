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
  getbannerDetail(id: any): import("rxjs").Observable<any> {
    throw new Error('Method not implemented.');
  }
  getbannerDetails(id: any) {
    throw new Error('Method not implemented.');
  }
  http = inject(HttpClient);

  getTrending() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/movie', options);
  }

  getMovies() {
    return this.http.get<any>('https://api.themoviedb.org/3/trending/all/day', options);
  }

  getTv() {
    return this.http.get<any>('https://api.themoviedb.org/3/discover/tv', options);
  }
  getPopular() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/popular', options);
  }

  getTopRated() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/top_rated', options);
  }

  getUpcoming() {
    return this.http.get<any>('https://api.themoviedb.org/3/movie/upcoming', options);
  }
  getBannerImage(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/images`, options)
  }

  getBannerVideo(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}/videos`, options);
  }

  getBannerDetail(id: number) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${id}`, options);
  }
}
